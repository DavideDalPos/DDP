<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-amber-400">Collaborators</h2>

    <!-- Interactive Legend / Filters -->
    <div class="legend mb-4 flex items-center gap-6">
      <div
        class="legend-item flex items-center gap-1 cursor-pointer"
        :class="{ selected: showActive }"
        @click="toggleFilter('active')"
      >
        <span class="legend-pill" style="background-color:#2a9d8f"></span> Active
      </div>
      <div
        class="legend-item flex items-center gap-1 cursor-pointer"
        :class="{ selected: showPast }"
        @click="toggleFilter('past')"
      >
        <span class="legend-pill" style="background-color:#457b9d"></span> Past
      </div>
      <div
        class="legend-item flex items-center gap-1 cursor-pointer"
        :class="{ selected: showBoth }"
        @click="toggleFilter('both')"
      >
        <span class="legend-pill" style="background-color:#9b5de5"></span> Both
      </div>
    </div>

    <!-- Map -->
    <div id="collaborators-map" class="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collaborators } from './collaborators'

let map
let cluster

// Filters controlled via legend clicks
const showActive = ref(true)
const showPast = ref(true)
const showBoth = ref(true)

function toggleFilter(type) {
  if (type === 'active') showActive.value = !showActive.value
  if (type === 'past') showPast.value = !showPast.value
  if (type === 'both') showBoth.value = !showBoth.value
  renderMarkers()
}

// ------------------ Functions ------------------
function getIcon(collaborator) {
  let color = '#999999' // fallback
  if (collaborator.active && collaborator.past) color = '#9b5de5'
  else if (collaborator.active) color = '#2a9d8f'
  else if (collaborator.past) color = '#457b9d'

  return L.divIcon({
    className: '',
    html: `<div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%; border: 1px solid #333"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })
}

const PUBLICATION_PAGE_URL = '/publications'

function getPopupHtml(collaborator) {
  let html = `<div style="font-family: Arial, sans-serif; font-size: 14px;">`

  // Name + pill inline
  html += `<div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">`
  html += `<strong style="font-size: 16px;">${collaborator.name}</strong>`

  if (collaborator.active) {
    html += `<span style="display:inline-block; padding:2px 6px; background-color:#2a9d8f; color:white; border-radius:12px; font-size:12px;">Active</span>`
  } else if (collaborator.past) {
    html += `<span style="display:inline-block; padding:2px 6px; background-color:#457b9d; color:white; border-radius:12px; font-size:12px;">Past</span>`
  }

  html += `</div>`

  // Projects (Active)
  if (collaborator.active && collaborator.projects?.length) {
    html += `<div style="margin-bottom: 8px;">`
    html += `<strong>Projects:</strong>`
    html += `<ul style="padding-left: 18px; margin: 4px 0;">`
    collaborator.projects.forEach(p => {
      if (p.url) {
        html += `<li><a href="${p.url}" target="_blank" style="color: #2a9d8f; text-decoration: underline;">${p.name}</a></li>`
      } else {
        html += `<li>${p.name}</li>`
      }
    })
    html += `</ul></div>`
  }

  // Publication (Past only)
  if (collaborator.past && !collaborator.active) {
    html += `<div style="margin-bottom: 4px;"><em>Past Collaborator</em></div>`
    html += `<div><a href="${PUBLICATION_PAGE_URL}?name=${encodeURIComponent(collaborator.name)}" target="_blank" style="color: #9b5de5; text-decoration: underline;">View Publication</a></div>`
  }

  // Both active & past with no projects
  if (collaborator.active && collaborator.past && !collaborator.projects?.length) {
    html += `<div><a href="${PUBLICATION_PAGE_URL}?name=${encodeURIComponent(collaborator.name)}" target="_blank" style="color: #9b5de5; text-decoration: underline;">View Publication</a></div>`
  }

  html += `</div>`
  return html
}

// ------------------ Filtering ------------------
function filterCollaborators() {
  return collaborators.filter(c => {
    if (showBoth.value && c.active && c.past) return true
    if (showActive.value && c.active && !c.past) return true
    if (showPast.value && c.past && !c.active) return true
    return false
  })
}

function renderMarkers() {
  cluster.clearLayers()
  const filtered = filterCollaborators()
  filtered.forEach(c => {
    const marker = L.marker([c.lat, c.lng], { icon: getIcon(c) }).bindPopup(getPopupHtml(c))
    cluster.addLayer(marker)
  })

  const coords = filtered.map(c => [c.lat, c.lng])
  if (coords.length) map.fitBounds(coords)
}

// ------------------ Initialize Map ------------------
onMounted(async () => {
  const L = (await import('leaflet')).default
  await import('leaflet.markercluster')
  await import('leaflet/dist/leaflet.css')
  await import('leaflet.markercluster/dist/MarkerCluster.css')
  await import('leaflet.markercluster/dist/MarkerCluster.Default.css')

  map = L.map('collaborators-map').setView([28.6023, -81.2003], 3)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  cluster = L.markerClusterGroup()
  map.addLayer(cluster)

  renderMarkers()
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
  margin-bottom: 50px;
}

.legend-pill {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
}

.legend-item.selected {
  opacity: 1;
  font-weight: 600;
}

.legend-item {
  opacity: 0.5;
  transition: opacity 0.2s;
  user-select: none;
}
</style>

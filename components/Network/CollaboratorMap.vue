<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-amber-400">Collaborators</h2>
    <div id="collaborators-map" class="map rounded-xl shadow-md"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { collaborators } from './Collaborators'

let map
let cluster

// Filters: only Current and Past
const showCurrent = ref(true)
const showPast = ref(true)

function toggleFilter(type) {
  if (type === 'current') showCurrent.value = !showCurrent.value
  if (type === 'past') showPast.value = !showPast.value
  renderMarkers()
}

// ------------------ Marker & Popup ------------------
function getIcon(collaborator) {
  return L.divIcon({
    className: '',
    html: `<div style="width:12px; height:12px; background-color:#2a9d8f; border-radius:50%; border:1px solid #000"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })
}

const PUBLICATION_PAGE_URL = '/publications'

function getPopupHtml(collaborator) {
  let html = `<div style="font-family:'Segoe UI',sans-serif; font-size:13px; background:#f9fafb; padding:0.5rem 1rem; border-radius:0.5rem;">`
  html += `<strong>${collaborator.name}</strong><br/>`
  if (collaborator.institution) html += `<em>${collaborator.institution}</em><br/>`
  if (collaborator.active && collaborator.projects?.length) {
    html += `<strong>Projects:</strong><ul>`
    collaborator.projects.forEach(p => {
      if (p.url) html += `<li><a href="${p.url}" target="_blank">${p.name}</a></li>`
      else html += `<li>${p.name}</li>`
    })
    html += `</ul>`
  }
  if ((collaborator.past && !collaborator.active) || (collaborator.active && collaborator.past && !collaborator.projects?.length)) {
    html += `<a href="${PUBLICATION_PAGE_URL}?name=${encodeURIComponent(collaborator.name)}" target="_blank">View Publication</a>`
  }
  html += `</div>`
  return html
}

// ------------------ Filtering ------------------
function filterCollaborators() {
  return collaborators.filter(c => {
    if (showCurrent.value && c.active) return true
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
  if (coords.length) map.fitBounds(coords, { padding: [50, 50], maxZoom: 5 })
}

// ------------------ Initialize Map ------------------
let legendDiv

onMounted(async () => {
  const L = (await import('leaflet')).default
  await import('leaflet.markercluster')
  await import('leaflet/dist/leaflet.css')
  await import('leaflet.markercluster/dist/MarkerCluster.css')
  await import('leaflet.markercluster/dist/MarkerCluster.Default.css')

  map = L.map('collaborators-map').setView([28.6023, -81.2003], 3)

  // Softer tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  cluster = L.markerClusterGroup()
  map.addLayer(cluster)

  renderMarkers()

  // ------------------ Legend with checkboxes ------------------
  const legend = L.control({ position: 'bottomright' })
  legend.onAdd = () => {
    legendDiv = L.DomUtil.create('div', 'info legend')
    legendDiv.style.background = '#ffffffcc'
    legendDiv.style.padding = '0.75rem 1rem'
    legendDiv.style.borderRadius = '0.5rem'
    legendDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
    legendDiv.style.fontSize = '0.85rem'

    legendDiv.innerHTML = `<b>Filter Collaborators</b><br/>`

    const filters = [
      { label: 'Current Collaborators', ref: showCurrent, key: 'current' },
      { label: 'Past Collaborators', ref: showPast, key: 'past' }
    ]

    filters.forEach(f => {
      const container = document.createElement('div')
      container.style.display = 'flex'
      container.style.alignItems = 'center'
      container.style.marginTop = '0.25rem'

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.checked = f.ref.value
      checkbox.onchange = () => toggleFilter(f.key)
      container.appendChild(checkbox)

      const label = document.createElement('span')
      label.textContent = f.label
      label.style.marginLeft = '0.5rem'
      container.appendChild(label)

      legendDiv.appendChild(container)
    })

    return legendDiv
  }

  legend.addTo(map)
})
</script>

<style scoped>
.map {
  width: 100%;
  min-height: 50vh;
  margin-bottom: 3rem;
}
</style>

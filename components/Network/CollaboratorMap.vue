<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-amber-400">Collaborators</h2>
    <div id="collaborators-map" class="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collaborators } from './Collaborators'

let map
let cluster

// Filters controlled via legend clicks
const showActive = ref(true)
const showPast = ref(true)
const showBoth = ref(true)

// Toggle filter function
function toggleFilter(type) {
  if (type === 'active') showActive.value = !showActive.value
  if (type === 'past') showPast.value = !showPast.value
  if (type === 'both') showBoth.value = !showBoth.value
  renderMarkers()
  updateLegend()
}

// ------------------ Marker Functions ------------------
function getIcon(collaborator) {
  let color = '#999999' // fallback
  if (collaborator.active && collaborator.past) color = '#9b5de5'
  else if (collaborator.active) color = '#2a9d8f'
  else if (collaborator.past) color = '#457b9d'

  return L.divIcon({
    className: '',
    html: `<div style="width:12px; height:12px; background-color:${color}; border-radius:6px; border:1px solid #000"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })
}

const PUBLICATION_PAGE_URL = '/publications'

function getPopupHtml(collaborator) {
  let html = `<div style="font-family:'Segoe UI',sans-serif; font-size:13px;">`

  html += `<div style="display:flex; align-items:center; gap:6px; margin-bottom:8px;">`
  html += `<strong style="font-size:14px;">${collaborator.name}</strong>`

  if (collaborator.active) {
    html += `<span style="display:inline-block; padding:2px 6px; background-color:#2a9d8f; color:white; border-radius:12px; font-size:12px;">Active</span>`
  } 
  if (collaborator.past) {
    html += `<span style="display:inline-block; padding:2px 6px; background-color:#457b9d; color:white; border-radius:12px; font-size:12px;">Past</span>`
  }

  html += `</div>`

  if (collaborator.active && collaborator.projects?.length) {
    html += `<div style="margin-bottom:8px;"><strong>Projects:</strong><ul style="padding-left:18px; margin:4px 0;">`
    collaborator.projects.forEach(p => {
      if (p.url) html += `<li><a href="${p.url}" target="_blank" style="color:#2a9d8f; text-decoration:underline;">${p.name}</a></li>`
      else html += `<li>${p.name}</li>`
    })
    html += `</ul></div>`
  }

  if (collaborator.past && !collaborator.active) {
    html += `<div><a href="${PUBLICATION_PAGE_URL}?name=${encodeURIComponent(collaborator.name)}" target="_blank" style="color:#9b5de5; text-decoration:underline;">View Publication</a></div>`
  }

  if (collaborator.active && collaborator.past && !collaborator.projects?.length) {
    html += `<div><a href="${PUBLICATION_PAGE_URL}?name=${encodeURIComponent(collaborator.name)}" target="_blank" style="color:#9b5de5; text-decoration:underline;">View Publication</a></div>`
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
let legendDiv

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

  // ------------------ Leaflet Legend ------------------
  const legend = L.control({ position: 'bottomright' })
  legend.onAdd = () => {
    legendDiv = L.DomUtil.create('div', 'info legend')
    legendDiv.style.background = 'rgba(255,255,255,0.9)'
    legendDiv.style.padding = '6px 8px'
    legendDiv.style.borderRadius = '5px'
    legendDiv.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)'
    legendDiv.style.fontSize = '12px'
    legendDiv.innerHTML = `<b style="color:#000;">Collaborators</b><br/>`

    const items = [
      { label: 'Active', filter: 'active', color: '#2a9d8f' },
      { label: 'Past', filter: 'past', color: '#457b9d' },
      { label: 'Both', filter: 'both', color: '#9b5de5' }
    ]

    items.forEach(item => {
      const line = document.createElement('div')
      line.style.display = 'flex'
      line.style.alignItems = 'center'
      line.style.marginTop = '3px'
      line.style.cursor = 'pointer'

      const colorBox = document.createElement('span')
      colorBox.style.display = 'inline-block'
      colorBox.style.width = '12px'
      colorBox.style.height = '12px'
      colorBox.style.backgroundColor = item.color
      colorBox.style.border = '1px solid #000'
      colorBox.style.marginRight = '6px'
      colorBox.style.borderRadius = '6px'
      line.appendChild(colorBox)

      const label = document.createElement('span')
      label.textContent = item.label
      label.style.color = '#000'
      label.style.fontWeight = '500'
      line.appendChild(label)

      line.onclick = () => toggleFilter(item.filter)

      // Save for updating visibility later
      line.updateCheck = () => {
        if ((item.filter === 'active' && showActive.value) ||
            (item.filter === 'past' && showPast.value) ||
            (item.filter === 'both' && showBoth.value)) {
          colorBox.style.opacity = 1
        } else {
          colorBox.style.opacity = 0.3
        }
      }
      line.updateCheck()

      legendDiv.appendChild(line)
    })

    return legendDiv
  }

  legend.addTo(map)
})

// Update legend colors on toggle
function updateLegend() {
  if (!legendDiv) return
  Array.from(legendDiv.children).forEach(line => {
    if (line.updateCheck) line.updateCheck()
  })
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
  margin-bottom: 50px;
}
</style>

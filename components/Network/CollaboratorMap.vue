<template>
  <div>
    <div id="collaborators-map" class="map" style="border-radius:12px; overflow:hidden;"></div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { collaborators } from './Collaborators'

let map
let cluster
let L

// Filters
const showActive = ref(true)
const showPublished = ref(true)

onMounted(async () => {
  L = (await import('leaflet')).default
  await import('leaflet.markercluster')
  await import('leaflet/dist/leaflet.css')
  await import('leaflet.markercluster/dist/MarkerCluster.css')
  await import('leaflet.markercluster/dist/MarkerCluster.Default.css')

  // Initialize map
  map = L.map('collaborators-map').setView([28.6023, -81.2003], 3)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  cluster = L.markerClusterGroup()
  map.addLayer(cluster)

  renderMarkers()

  // ------------------ Legend as Leaflet Control with inline styles ------------------
  const legend = L.control({ position: 'bottomright' })
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', '')
    div.innerHTML = `
      <div style="background: rgba(255,255,255,0.8); padding: 8px 12px; border-radius: 8px; font-size: 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <b>Filter Collaborators</b>
        <div style="margin-top: 4px;"><label><input type="checkbox" ${showActive.value ? 'checked' : ''} id="activeFilter"/> Active Collaborations</label></div>
        <div style="margin-top: 4px;"><label><input type="checkbox" ${showPublished.value ? 'checked' : ''} id="publishedFilter"/> Published Collaborations</label></div>
      </div>
    `
    return div
  }
  legend.addTo(map)

  // Make checkboxes reactive
  const activeCheckbox = document.getElementById('activeFilter')
  const publishedCheckbox = document.getElementById('publishedFilter')

  activeCheckbox.addEventListener('change', () => {
    showActive.value = activeCheckbox.checked
    renderMarkers()
  })
  publishedCheckbox.addEventListener('change', () => {
    showPublished.value = publishedCheckbox.checked
    renderMarkers()
  })
})

// ------------------ Marker & Filtering ------------------
function getIcon(collaborator) {
  let color = '#2a9d8f' // default greenish
  if (collaborator.active && collaborator.published) {
    color = '#8cd3a3' // pastel green for both
  } else if (collaborator.active) {
    color = '#ffb86c' // pastel orange
  } else if (collaborator.published) {
    color = '#c7a0f7' // pastel purple
  }

  return L.divIcon({
    className: '',
    html: `<div style="width:14px; height:14px; background-color:${color}; border-radius:50%; border:1px solid #666"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  })
}


const PUBLICATION_PAGE_URL = '/publications'

// ------------------ Popups with inline pills ------------------
// ------------------ Popups with inline pills ------------------
function getPopupHtml(collaborator) {
  // Pills inline with the name
  let pills = ''
  if (collaborator.active) {
    pills += `<span style="display:inline-block; background-color:#ffb86c; color:white; padding:2px 6px; border-radius:12px; font-size:9px; margin-left:6px;">Active</span>`
  }
  if (collaborator.published) {
    pills += `<span style="display:inline-block; background-color:#c7a0f7; color:white; padding:2px 6px; border-radius:12px; font-size:9px; margin-left:4px;">Published</span>`
  }

  // Estimate width based on longer of name+pills or institution
  const baseFontWidth = 7.5
  const nameLength = collaborator.name.length + (collaborator.active ? 6 : 0) + (collaborator.published ? 9 : 0)
  const institutionLength = collaborator.institution?.length || 0
  const width = Math.max(nameLength, institutionLength) * baseFontWidth

  let html = `<div style="font-family:'Segoe UI',sans-serif; font-size:13px; background:#f9fafb; padding:8px 12px; border-radius:8px; min-width:${width}px; max-width:300px; line-height:1.4;">`

  // Name + Pills
  html += `<div style="display:flex; align-items:center; flex-wrap:wrap; font-weight:bold;">${collaborator.name}${pills}</div>`

  // Institution
  if (collaborator.institution) {
    html += `<div style="font-style:italic; font-size:12px; color:#555; margin-top:2px;">${collaborator.institution}</div>`
  }

  // Projects
  if (collaborator.active && collaborator.projects?.length) {
    html += `<div style="margin-top:6px;"><strong>Projects:</strong><ul style="margin:4px 0 0 18px; padding:0;">`
    collaborator.projects.forEach(p => {
      if (p.url) {
        // clickable and clear link style
        html += `<li><a href="${p.url}" target="_blank" style="color:#1d3557; text-decoration:underline; cursor:pointer;">${p.name}</a></li>`
      } else {
        html += `<li>${p.name}</li>`
      }
    })
    html += `</ul></div>`
  }

  // View Publication link
  if ((collaborator.published && !collaborator.active) || (collaborator.active && collaborator.published && !collaborator.projects?.length)) {
    html += `<div style="margin-top:6px;"><a href="${PUBLICATION_PAGE_URL}?name=${encodeURIComponent(collaborator.name)}" target="_blank" style="font-size:12px; color:#e76f51; text-decoration:underline; cursor:pointer;">View Publication</a></div>`
  }

  html += `</div>`
  return html
}




// ------------------ Filtering ------------------
function filterCollaborators() {
  return collaborators.filter(c => {
    if (showActive.value && c.active) return true
    if (showPublished.value && c.published) return true
    return false
  })
}

// ------------------ Render ------------------
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
</script>

<style scoped>
.map {
  width: 100%;
  height: 60vh;
}
</style>

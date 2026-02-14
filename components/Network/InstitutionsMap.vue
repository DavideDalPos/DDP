<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-amber-400">Institutions</h2>
    <div id="institutions-map" class="map rounded-xl shadow-md"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { institutions } from './Institutions'

// Popup HTML
function getInstitutionPopup(i) {
  let html = `<div style="font-family:'Segoe UI',sans-serif; font-size:13px;">`

  html += `<div style="margin-bottom:4px;"><strong>${i.name}</strong>`
  if (i.acronym) html += ` <span style="color:#666; font-size:12px;">(${i.acronym})</span>`
  if (i.city || i.country) html += ` – <span style="color:#555; font-size:12px;">${i.city ?? ''}${i.city && i.country ? ', ' : ''}${i.country ?? ''}</span>`
  html += `</div>`

  if (i.roles && i.roles.length) {
    html += `<div style="margin-bottom:4px;"><strong>Roles:</strong><ul style="padding-left:18px; margin:4px 0;">`
    i.roles.forEach(r => html += `<li>${r}</li>`)
    html += `</ul></div>`
  }

  if (i.collectionUrl) {
    html += `<div><a href="${i.collectionUrl}" target="_blank" style="color:#9b5de5; text-decoration:underline;">Visit Collection</a></div>`
  }

  html += `</div>`
  return html
}

onMounted(async () => {
  const L = (await import('leaflet')).default
  await import('leaflet.markercluster')
  await import('leaflet/dist/leaflet.css')
  await import('leaflet.markercluster/dist/MarkerCluster.css')
  await import('leaflet.markercluster/dist/MarkerCluster.Default.css')

  const map = L.map('institutions-map').setView([28.6023, -81.2003], 3)

  // Clean tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  const cluster = L.markerClusterGroup()

  const icon = L.divIcon({
    className: '',
    html: `<div style="width:12px; height:12px; background-color:#9b5de5; border-radius:50%; border:1px solid #000;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })

  institutions.forEach(i => {
    const marker = L.marker([i.lat, i.lng], { icon }).bindPopup(getInstitutionPopup(i))
    cluster.addLayer(marker)
  })

  map.addLayer(cluster)

  // Fit bounds to all markers
  const coords = institutions.map(i => [i.lat, i.lng])
  if (coords.length) map.fitBounds(coords, { padding: [50, 50], maxZoom: 5 })
})
</script>

<style scoped>
.map {
  width: 100%;
  min-height: 50vh;
  margin-bottom: 3rem;
}
</style>

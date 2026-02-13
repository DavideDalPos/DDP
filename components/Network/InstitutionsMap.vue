<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-amber-400">Institutions</h2>
    <div id="institutions-map" class="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { institutions } from './Institutions'

onMounted(async () => {
  const L = (await import('leaflet')).default
  await import('leaflet.markercluster')
  await import('leaflet/dist/leaflet.css')
  await import('leaflet.markercluster/dist/MarkerCluster.css')
  await import('leaflet.markercluster/dist/MarkerCluster.Default.css')

  const map = L.map('institutions-map').setView([28.6023, -81.2003], 3)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  const icon = L.divIcon({
    className: '',
    html: '<div style="width: 10px; height: 10px; background-color: #2a9d8f; border-radius: 50%;"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5]
  })

  const cluster = L.markerClusterGroup()

  institutions.forEach(i => {
    const marker = L.marker([i.lat, i.lng], { icon }).bindPopup(i.name)
    cluster.addLayer(marker)
  })

  map.addLayer(cluster)

  const coords = institutions.map(i => [i.lat, i.lng])
  if (coords.length) map.fitBounds(coords)
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>

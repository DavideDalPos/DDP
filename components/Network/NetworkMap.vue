<template>
  <div class="container mx-auto px-6 my-16 max-w-10xl">
    <client-only>
      <div id="network-map" style="height: 600px; width: 100%;"></div>
    </client-only>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { collaborators, myLocation } from '~/components/Network/NetworkData.js'

let map = null

onMounted(async () => {
  const L = (await import('leaflet')).default
  await import('leaflet.markercluster')
  await import('leaflet/dist/leaflet.css')
  await import('leaflet.markercluster/dist/MarkerCluster.css')
  await import('leaflet.markercluster/dist/MarkerCluster.Default.css')

  map = L.map('network-map').setView([myLocation.lat, myLocation.lng], 3)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Small dot icon
  const dotIcon = L.divIcon({
    className: '',
    html: '<div style="width: 8px; height: 8px; background-color: #003049; border-radius: 50%;"></div>',
    iconSize: [8, 8],
    iconAnchor: [4, 4]
  })

  // Cluster group
  const markersCluster = L.markerClusterGroup()

  collaborators.forEach(c => {
    const marker = L.marker([c.lat, c.lng], { icon: dotIcon }).bindPopup(c.name)
    markersCluster.addLayer(marker)
  })

  map.addLayer(markersCluster)
})
</script>

<style>
#network-map {
  width: 100%;
  height: 500px;
}
</style>

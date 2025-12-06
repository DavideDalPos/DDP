<template>
  <div class="container mx-auto px-6 my-16 max-w-10xl">
    <client-only>
      <!-- Collaborators map -->
      <h2 class="text-xl font-bold mb-4 text-amber-400">Collaborators</h2>
      <div id="collaborators-map" style="height: 500px; width: 100%; margin-bottom: 50px;"></div>

      <!-- Institutions map -->
      <h2 class="text-xl font-bold mb-4 text-amber-400">Institutions</h2>
      <div id="institutions-map" style="height: 500px; width: 100%;"></div>
    </client-only>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  const data = await import('~/components/Network/NetworkData.js')
  const collaborators = data.collaborators
  const institutions = data.institutions

  const L = (await import('leaflet')).default
  await import('leaflet.markercluster')
  await import('leaflet/dist/leaflet.css')
  await import('leaflet.markercluster/dist/MarkerCluster.css')
  await import('leaflet.markercluster/dist/MarkerCluster.Default.css')

  // ------------------- Collaborators Map -------------------
  const collaboratorsMap = L.map('collaborators-map').setView([28.6023, -81.2003], 3)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(collaboratorsMap)

  const collaboratorIcon = L.divIcon({
    className: '',
    html: '<div style="width: 10px; height: 10px; background-color: #2a9d8f; border-radius: 50%;"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5]
  })

  const collaboratorsCluster = L.markerClusterGroup()
  collaborators.forEach(c => {
    const marker = L.marker([c.lat, c.lng], { icon: collaboratorIcon }).bindPopup(c.name)
    collaboratorsCluster.addLayer(marker)
  })
  collaboratorsMap.addLayer(collaboratorsCluster)

  // Fit bounds
  const collaboratorCoords = collaborators.map(c => [c.lat, c.lng])
  if (collaboratorCoords.length) collaboratorsMap.fitBounds(collaboratorCoords)

  // ------------------- Institutions Map -------------------
  const institutionsMap = L.map('institutions-map').setView([28.6023, -81.2003], 3)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(institutionsMap)

  const institutionIcon = L.divIcon({
    className: '',
    html: '<div style="width: 10px; height: 10px; background-color: #2a9d8f; border-radius: 50%;"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5]
  })

  const institutionsCluster = L.markerClusterGroup()
  institutions.forEach(i => {
    const marker = L.marker([i.lat, i.lng], { icon: institutionIcon }).bindPopup(i.name)
    institutionsCluster.addLayer(marker)
  })
  institutionsMap.addLayer(institutionsCluster)

  // Fit bounds
  const institutionCoords = institutions.map(i => [i.lat, i.lng])
  if (institutionCoords.length) institutionsMap.fitBounds(institutionCoords)
})
</script>

<style>
#collaborators-map,
#institutions-map {
  width: 100%;
  height: 500px;
}
</style>

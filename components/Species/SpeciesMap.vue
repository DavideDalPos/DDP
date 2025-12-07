<script setup>
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet/dist/leaflet.css'
import { onMounted } from 'vue'
import { speciesPoints } from './SpeciesData.js'

let map

// Colors for families
const familyColors = {}
const defaultColors = [
  'rgba(255, 99, 71, 0.85)',    // tomato
  'rgba(30, 144, 255, 0.85)',   // dodgerblue
  'rgba(50, 205, 50, 0.85)',    // limegreen
  'rgba(238, 130, 238, 0.85)',  // violet
  'rgba(255, 165, 0, 0.85)'     // orange
]

const getFamilyColor = (family) => {
  if (!familyColors[family]) {
    familyColors[family] = defaultColors[
      Object.keys(familyColors).length % defaultColors.length
    ]
  }
  return familyColors[family]
}

// Small jitter to avoid exact overlap
const jitter = (value) => value + (Math.random() - 0.5) * 0.01

onMounted(async () => {
  const L = await import('leaflet')
  await import('leaflet.markercluster') // Make sure plugin is loaded

  map = L.map('map').setView([20, 0], 2)

  // Base layers
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Marker Cluster Group
  const markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false
  })

  // Create markers
  speciesPoints.forEach(point => {
    const color = getFamilyColor(point.family)

    const marker = L.marker([jitter(point.lat), jitter(point.lng)], {
      icon: L.divIcon({
        className: '',
        html: `<div style="
          width: 12px;
          height: 12px;
          background-color: ${color};
          border-radius: 6px;
          border: 1.5px solid #000;
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      })
    })

    const popupContent = `
      <div style="font-family:'Segoe UI',sans-serif;font-size:13px;text-align:center;">
        <i style='color:#b22222'>${point.name}</i>
        <div style="color:#555;font-size:12px;margin:4px 0;">
          ${point.authors}, ${point.year}
        </div>
        <a href="${point.url || '#'}" target="_blank" style="
          display:inline-block;margin-top:4px;padding:4px 8px;
          background-color:#0d3b66;color:#fff;text-decoration:none;border-radius:4px;font-size:12px;
        ">View Publication</a>
      </div>
    `
    marker.bindPopup(popupContent)
    markers.addLayer(marker)
  })

  map.addLayer(markers)

  // Legend
  const legend = L.control({ position: 'bottomright' })
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend')
    div.style.background = 'rgba(255,255,255,0.9)'
    div.style.padding = '6px 8px'
    div.style.borderRadius = '5px'
    div.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)'
    div.style.fontSize = '12px'
    div.innerHTML = `<b style="color:#000;">Families</b><br/>`

    Object.entries(familyColors).forEach(([family, color]) => {
      const line = document.createElement('div')
      line.style.display = 'flex'
      line.style.alignItems = 'center'
      line.style.marginTop = '3px'

      const colorBox = document.createElement('span')
      colorBox.style.display = 'inline-block'
      colorBox.style.width = '12px'
      colorBox.style.height = '12px'
      colorBox.style.backgroundColor = color
      colorBox.style.border = '1px solid #000'
      colorBox.style.marginRight = '6px'
      colorBox.style.borderRadius = '6px'

      const label = document.createElement('span')
      label.textContent = family
      label.style.color = '#000'
      label.style.fontWeight = '500'

      line.appendChild(colorBox)
      line.appendChild(label)
      div.appendChild(line)
    })

    return div
  }
  legend.addTo(map)
})
</script>

<template>
  <div class="container mx-auto px-6 my-16 max-w-10xl">
    <client-only>
      <div id="map" style="height:600px;width:100%;"></div>
    </client-only>
  </div>
</template>

<style scoped>
@import 'leaflet/dist/leaflet.css';
@import 'leaflet.markercluster/dist/MarkerCluster.css';
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

#map {
  height: 600px;
  width: 100%;
}
</style>

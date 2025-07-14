<script setup>
import { onMounted } from 'vue'
import { speciesPoints } from './speciesData'

let map

onMounted(async () => {
  const L = await import('leaflet')

  map = L.map('map').setView([20, 0], 2)

  // Tile layers
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  })

  const cartoPositron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
  })

  const esriWorldStreet = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, HERE, Garmin, USGS, EPA, NPS'
    }
  )

  // Default layer
  osm.addTo(map)

  const createRedSquareIcon = () =>
    L.divIcon({
      className: '',
      html: `<div style="
        width: 10px;
        height: 10px;
        background-color: rgba(255, 0, 0, 0.85);
        border-radius: 4px;
        border: 1.5px solid #b30000;
        box-shadow: 0 0 5px rgba(255,0,0,0.7);
        opacity: 0;
        transition: opacity 0.7s ease-in-out;
      "></div>`,
      iconSize: [10, 10],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    })

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const fadeInMarker = (marker) => {
    const el = marker.getElement()
    if (!el) return
    const div = el.firstChild
    if (!div) return
    div.style.opacity = '1'
  }

  const baseMaps = {
    'OpenStreetMap': osm,
    'CartoDB Positron': cartoPositron,
    'Esri WorldStreetMap': esriWorldStreet
  }

  L.control.layers(baseMaps).addTo(map)

  for (const [i, point] of speciesPoints.entries()) {
    const marker = L.marker([point.lat, point.lng], { icon: createRedSquareIcon() }).addTo(map)

    const popupContent = `
      <div style="
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        color: #333;
        padding: 2px 4px;
      ">
        <a href="${point.url || '#'}" target="_blank" style="
          color: #b22222;
          text-decoration: none;
          font-weight: 600;
        ">
          ${point.name}
        </a>
      </div>
    `

    marker.bindPopup(popupContent, { closeButton: false, autoClose: false })

    let popupHovered = false

    marker.on('mouseover', () => {
      marker.openPopup()
    })

    marker.on('mouseout', () => {
      setTimeout(() => {
        if (!popupHovered) {
          marker.closePopup()
        }
      }, 100)
    })

    marker.on('popupopen', () => {
      const popupEl = marker.getPopup().getElement()
      if (!popupEl) return

      popupEl.addEventListener('mouseenter', () => {
        popupHovered = true
      })

      popupEl.addEventListener('mouseleave', () => {
        popupHovered = false
        marker.closePopup()
      })
    })

    await wait(i * 250)
    fadeInMarker(marker)
  }
})
</script>


<template>
  <div class="container mx-auto px-6 my-16 max-w-10xl">
    <client-only>
      <div id="map" style="height: 600px; width: 100%;"></div>
    </client-only>
  </div>
</template>

<style scoped>
@import 'leaflet/dist/leaflet.css';

#map {
  height: 600px;
  width: 100%;
}
</style>

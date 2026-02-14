<template>
  <div>
    <h2 class="text-xl font-bold mb-4 text-amber-400">Institutions</h2>
    <div id="institutions-map" class="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { institutions } from './Institutions'

function getInstitutionPopup(i) {
  let html = `<div style="font-family:'Segoe UI',sans-serif; font-size:13px;">`

// --- Title Line (Name + Acronym + Location same row) ---
html += `<div style="margin-bottom:6px; font-size:13px; color:#000;">`

// Name + Acronym
html += `<strong style="font-size:14px;">${i.name}</strong>`
if (i.acronym) {
  html += ` <span style="color:#666; font-size:13px;">(${i.acronym})</span>`
}

// Location after a dash
if (i.city || i.country) {
  html += ` – <span style="color:#555; font-size:12px;">`
  html += `${i.city ? i.city : ''}${i.city && i.country ? ', ' : ''}${i.country ? i.country : ''}`
  html += `</span>`
}

html += `</div>`

  
// --- Status Pills (Research Associate + Active) ---
let pills = ''

// Research Associate pill
if (i.researchAssociate) {
  pills += `
    <span style="
      display:inline-block;
      padding:2px 8px;
      background-color:#e57373; /* red */
      color:white;
      border-radius:12px;
      font-size:11px;
      font-weight:500;">
      Research Associate
    </span>
  `
}

// Active pill
if (i.yearsActive) {
  pills += `
    <span style="
      display:inline-block;
      padding:2px 8px;
background-color:#6fcf97; /* muted green */
color: white;


      border-radius:12px;
      font-size:11px;
      font-weight:500;
      margin-left:3px;">
      ${i.yearsActive}
    </span>
  `
}

// Add the pills line if there is at least one
if (pills) {
  html += `<div style="margin-bottom:6px; display:flex; gap:1px; flex-wrap:wrap;">${pills}</div>`
}




  // --- Roles ---
  if (i.roles && i.roles.length) {
    html += `<div style="margin-bottom:6px;"><strong>Roles:</strong>`
    html += `<ul style="padding-left:18px; margin:4px 0;">`
    i.roles.forEach(r => {
      html += `<li>${r}</li>`
    })
    html += `</ul></div>`
  }



  // --- Collection Link ---
  if (i.collectionUrl) {
    html += `
      <div style="margin-top:6px;">
        <a href="${i.collectionUrl}" target="_blank" style="color:#9b5de5; text-decoration:underline;">
          Visit Collection
        </a>
      </div>
    `
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

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // Marker icon
  const icon = L.divIcon({
    className: '',
    html: `
      <div style="
        width:12px;
        height:12px;
        background-color:#9b5de5;
        border-radius:6px;
        border:1px solid #000;">
      </div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  })

  const cluster = L.markerClusterGroup()

  institutions.forEach(i => {
    const marker = L.marker([i.lat, i.lng], { icon })
      .bindPopup(getInstitutionPopup(i))
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
  margin-bottom: 50px;
}
</style>

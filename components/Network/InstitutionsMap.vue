<template>
  <div>
    <div id="institutions-map" style="width:100%; height:60vh;border-radius:12px; overflow:hidden;" ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { institutions } from './Institutions'

let map
let cluster
let L

// ------------------ Filter state ------------------
const showResearchAssociate = ref(false) // unchecked by default

// ------------------ Popup HTML ------------------
function getInstitutionPopup(i) {
  // Research Associate pill
  let pills = ''
  if (i.researchAssociate) {
    pills += `<span style="
      display:inline-block;
      background-color:#C598F6; /* pastel violet */
      color:white;
      padding:2px 6px;
      border-radius:12px;
      font-size:10px;
      margin-left:6px;
      white-space:nowrap;
    ">Research Associate</span>`
  }

  let html = `<div style="
    font-family:'Segoe UI',sans-serif;
    font-size:13px;
    background:#ffffff;
    padding:10px 14px;
    border-radius:10px;
    line-height:1.4;
    min-width:220px;
    max-width:300px;
    box-shadow:0 3px 10px rgba(0,0,0,0.1);
  ">`

  // Name + acronym + pill on same line
  html += `<div style="display:flex; align-items:center; flex-wrap:wrap; font-weight:bold; margin-bottom:4px;">
    ${i.name} ${i.acronym ? `<span style="color:#555; font-size:12px; margin-left:4px;">(${i.acronym})</span>` : ''} ${pills}
  </div>`

  // Location
  if (i.city || i.country) {
    html += `<div style="font-size:12px; color:#555; margin-bottom:4px;">
      ${i.city ?? ''}${i.city && i.country ? ', ' : ''}${i.country ?? ''}
    </div>`
  }

  // Roles
  if (i.roles && i.roles.length) {
    html += `<div style="margin-bottom:4px;"><strong>Roles:</strong><ul style="padding-left:18px; margin:4px 0;">`
    i.roles.forEach(r => html += `<li>${r}</li>`)
    html += `</ul></div>`
  }

  // Years Active
  if (i.yearsActive) {
    html += `<div style="font-size:12px; color:#666; margin-bottom:4px;"><strong>Years Active:</strong> ${i.yearsActive}</div>`
  }

  // Collection link
  if (i.collectionUrl) {
    html += `<div><a href="${i.collectionUrl}" target="_blank" style="
      display:inline-block;
      color:#5a31f4;
      text-decoration:underline;
      font-weight:500;
      padding:2px 6px;
      border-radius:6px;
      cursor:pointer;
    ">Visit Collection</a></div>`
  }

  html += `</div>`
  return html
}

// ------------------ Marker with pastel color ------------------
function getInstitutionIcon(i) {
  const color = i.researchAssociate ? '#C598F6' : '#FFB85C' // violet if Research Associate, amber otherwise
  return L.divIcon({
    className: '',
    html: `<div style="width:12px; height:12px; background-color:${color}; border-radius:50%; border:1px solid #666;"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  })
}

// ------------------ Render markers ------------------
function renderMarkers() {
  cluster.clearLayers()

  const filtered = institutions.filter(i => {
    if (showResearchAssociate.value) {
      return i.researchAssociate // only show Research Associates if checked
    }
    return true // show all if unchecked
  })

  filtered.forEach(i => {
    const marker = L.marker([i.lat, i.lng], { icon: getInstitutionIcon(i) })
      .bindPopup(getInstitutionPopup(i))
    cluster.addLayer(marker)
  })

  // Fit map to markers
  const coords = filtered.map(i => [i.lat, i.lng])
  if (coords.length) map.fitBounds(coords, { padding: [50, 50], maxZoom: 5 })
}

// ------------------ Mounted ------------------
onMounted(async () => {
  L = (await import('leaflet')).default
  await import('leaflet.markercluster')
  await import('leaflet/dist/leaflet.css')
  await import('leaflet.markercluster/dist/MarkerCluster.css')
  await import('leaflet.markercluster/dist/MarkerCluster.Default.css')

  map = L.map('institutions-map').setView([45.4414, 12.3282], 4)

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  cluster = L.markerClusterGroup()
  map.addLayer(cluster)

  renderMarkers()

  // ------------------ Legend ------------------
  const legend = L.control({ position: 'bottomright' })
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', '')
    div.innerHTML = `
      <div style="
        background: rgba(255,255,255,0.85);
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 13px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      ">
        <b>Filter Institutions</b>
        <div style="margin-top:4px;">
          <label>
            <input type="checkbox" id="researchFilter"/>
            Show only Research Associates
          </label>
        </div>
      </div>
    `
    return div
  }
  legend.addTo(map)

  // ------------------ Make checkbox reactive ------------------
  const researchCheckbox = document.getElementById('researchFilter')
  researchCheckbox.addEventListener('change', () => {
    showResearchAssociate.value = researchCheckbox.checked
    renderMarkers()
  })
})
</script>

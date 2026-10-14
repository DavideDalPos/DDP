<template>
  <section class="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
    <!-- Summary -->
    <dl class="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-line py-12 sm:grid-cols-4">
      <div v-for="s in summary" :key="s.label" class="border-l border-ink/20 pl-4">
        <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{{ s.label }}</dt>
        <dd class="mt-1 font-display text-4xl font-semibold">{{ s.value }}</dd>
      </div>
    </dl>

    <!-- Map -->
    <div class="mt-10 flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Layers">
        <button
          v-for="l in layerButtons"
          :key="l.key"
          type="button"
          class="flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors"
          :class="layers[l.key] ? 'border-ink bg-white' : 'border-line bg-paper-2 text-muted'"
          :aria-pressed="layers[l.key]"
          @click="toggle(l.key)"
        >
          <span class="inline-block h-3 w-3 border-2" :class="l.swatch" />
          {{ l.label }} <span class="text-muted">({{ l.count }})</span>
        </button>
      </div>
      <p class="text-sm text-muted">Click a marker for details.</p>
    </div>
    <div class="relative z-0 mt-4 overflow-hidden rounded-md border border-line">
      <div ref="mapEl" class="h-[58vh] min-h-[420px] w-full bg-paper-2" />
    </div>

    <!-- Lists -->
    <div class="mt-16 grid gap-14 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <div class="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
          <h2 class="text-3xl font-semibold">Collaborators</h2>
          <label class="relative w-full sm:w-64">
            <span class="sr-only">Search collaborators</span>
            <input v-model="query" type="search" placeholder="Search name or institution" class="w-full rounded border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink" />
          </label>
        </div>
        <ul class="mt-2 grid gap-x-8 sm:grid-cols-2">
          <li v-for="c in shownCollaborators" :key="c.name" class="border-b border-line/70 py-3">
            <button type="button" class="group w-full text-left" @click="focus(c)">
              <span class="block text-sm font-semibold group-hover:text-accent-deep">{{ c.name }}</span>
              <span class="block text-xs text-muted">{{ c.institution?.trim() }}</span>
            </button>
          </li>
        </ul>
        <p v-if="!shownCollaborators.length" class="py-6 text-sm text-muted">No collaborators match “{{ query }}”.</p>
      </div>

      <div class="lg:col-span-5">
        <h2 class="border-b border-line pb-4 text-3xl font-semibold">Institutional affiliations</h2>
        <ul>
          <li v-for="i in sortedInstitutions" :key="i.name" class="border-b border-line/70 py-4">
            <button type="button" class="group w-full text-left" @click="focus(i)">
              <span class="flex items-baseline justify-between gap-3">
                <span class="text-sm font-semibold group-hover:text-accent-deep">{{ i.name }}<span v-if="i.acronym" class="font-normal text-muted"> ({{ i.acronym }})</span></span>
                <span class="shrink-0 text-xs text-muted">{{ i.yearsActive }}</span>
              </span>
              <span class="mt-0.5 block text-xs text-muted">
                {{ [i.city, i.country].filter(Boolean).join(', ') }}<span v-if="i.researchAssociate"> · Research Associate</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { collaborators } from './Collaborators/index.js'
import { institutions } from './Institutions/index.js'

const INK = '#15171c'
const ACCENT = '#8c5e2a'

const summary = computed(() => [
  { label: 'Collaborators', value: collaborators.length },
  { label: 'Their institutions', value: new Set(collaborators.map((c) => c.institution?.trim()).filter(Boolean)).size },
  { label: 'Active projects', value: collaborators.filter((c) => c.active).length },
  { label: 'Affiliations', value: institutions.length }
])

const layers = reactive({ people: true, places: true })
const layerButtons = computed(() => [
  { key: 'people', label: 'Collaborators', count: collaborators.length, swatch: 'rounded-full border-ink bg-ink/80' },
  { key: 'places', label: 'Institutional affiliations', count: institutions.length, swatch: 'border-accent bg-white' }
])

const query = ref('')
const shownCollaborators = computed(() => {
  const q = query.value.toLowerCase().trim()
  const list = [...collaborators].sort((a, b) => lastName(a.name).localeCompare(lastName(b.name)))
  return q ? list.filter((c) => `${c.name} ${c.institution}`.toLowerCase().includes(q)) : list
})
const sortedInstitutions = computed(() => [...institutions].sort((a, b) => a.name.localeCompare(b.name)))
function lastName(n) {
  const parts = n.trim().split(/\s+/)
  return parts[parts.length - 1]
}

const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

function personPopup(c) {
  const tags = [c.active ? 'Active collaboration' : '', c.published ? 'Co-author' : ''].filter(Boolean).join(' · ')
  const projects = (c.projects || [])
    .map((p) => (p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a>` : esc(p.name)))
    .join(', ')
  return `<div class="pop"><b>${esc(c.name)}</b><span>${esc(c.institution?.trim())}</span>${tags ? `<em>${tags}</em>` : ''}${projects ? `<span>Projects: ${projects}</span>` : ''}</div>`
}
function placePopup(i) {
  return `<div class="pop"><b>${esc(i.name)}${i.acronym ? ` (${esc(i.acronym)})` : ''}</b><span>${esc([i.city, i.country].filter(Boolean).join(', '))}${i.yearsActive ? ` · ${esc(i.yearsActive)}` : ''}</span>${i.researchAssociate ? '<em>Research Associate</em>' : ''}${(i.roles || []).length ? `<span>${i.roles.map(esc).join('; ')}</span>` : ''}</div>`
}

const mapEl = ref(null)
let L, map, peopleLayer, placesLayer
const markerFor = new Map()

onMounted(async () => {
  L = (await import('leaflet')).default
  window.L = L
  await import('leaflet.markercluster')

  // fadeAnimation off: with "reduce motion" switched on, faded tiles can stay invisible
  map = L.map(mapEl.value, { fadeAnimation: false, scrollWheelZoom: false, worldCopyJump: true, minZoom: 2 }).setView([30, 10], 2)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
    maxZoom: 16
  }).addTo(map)
  map.on('focus', () => map.scrollWheelZoom.enable())
  map.on('blur', () => map.scrollWheelZoom.disable())

  peopleLayer = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40,
    iconCreateFunction: (cl) =>
      L.divIcon({
        className: '',
        html: `<div class="cl">${cl.getChildCount()}</div>`,
        iconSize: [30, 30]
      })
  })
  for (const c of collaborators) {
    const m = L.marker([c.lat, c.lng], {
      icon: L.divIcon({ className: '', html: '<div class="dot"></div>', iconSize: [12, 12], iconAnchor: [6, 6] }),
      title: c.name
    }).bindPopup(personPopup(c))
    markerFor.set(c, m)
    peopleLayer.addLayer(m)
  }

  placesLayer = L.layerGroup()
  for (const i of institutions) {
    const m = L.marker([i.lat, i.lng], {
      icon: L.divIcon({ className: '', html: '<div class="sq"></div>', iconSize: [14, 14], iconAnchor: [7, 7] }),
      title: i.name,
      zIndexOffset: 500
    }).bindPopup(placePopup(i))
    markerFor.set(i, m)
    placesLayer.addLayer(m)
  }

  map.addLayer(peopleLayer)
  map.addLayer(placesLayer)
  const pts = [...collaborators, ...institutions].map((p) => [p.lat, p.lng])
  map.fitBounds(pts, { padding: [30, 30], maxZoom: 4 })
  setTimeout(() => map.invalidateSize(), 200)
})

onBeforeUnmount(() => map?.remove())

function toggle(key) {
  layers[key] = !layers[key]
  const layer = key === 'people' ? peopleLayer : placesLayer
  if (!map || !layer) return
  layers[key] ? map.addLayer(layer) : map.removeLayer(layer)
}

function focus(item) {
  const m = markerFor.get(item)
  if (!m || !map) return
  const isPerson = collaborators.includes(item)
  if (isPerson && !layers.people) toggle('people')
  if (!isPerson && !layers.places) toggle('places')
  mapEl.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  if (isPerson) peopleLayer.zoomToShowLayer(m, () => m.openPopup())
  else {
    map.setView(m.getLatLng(), Math.max(map.getZoom(), 6))
    m.openPopup()
  }
}
</script>

<style scoped>
:deep(.dot) {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgb(21 23 28 / 0.85);
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgb(21 23 28 / 0.4);
}
:deep(.sq) {
  width: 14px;
  height: 14px;
  background: #fff;
  border: 3px solid #8c5e2a;
}
:deep(.cl) {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #15171c;
  color: #fff;
  font: 600 12px/30px Inter, system-ui, sans-serif;
  text-align: center;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgb(21 23 28 / 0.35);
}
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 4px;
  box-shadow: 0 6px 20px rgb(21 23 28 / 0.18);
}
:deep(.pop) {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font: 13px/1.4 Inter, system-ui, sans-serif;
  color: #15171c;
  min-width: 180px;
}
:deep(.pop span) {
  color: #5f636b;
  font-size: 12px;
}
:deep(.pop em) {
  font-style: normal;
  font-size: 11px;
  font-weight: 600;
  color: #6e4a22;
}
:deep(.pop a) {
  color: #6e4a22;
  text-decoration: underline;
}
</style>

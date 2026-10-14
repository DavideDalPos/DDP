<template>
  <section class="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
    <!-- Summary -->
    <dl class="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-line py-12 sm:grid-cols-4">
      <div v-for="s in summary" :key="s.label" class="border-l border-ink/20 pl-4">
        <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{{ s.label }}</dt>
        <dd class="mt-1 font-display text-4xl font-semibold">{{ s.value }}</dd>
      </div>
    </dl>

    <!-- Controls -->
    <div class="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Family">
        <button
          v-for="f in familyButtons"
          :key="f.key"
          type="button"
          class="flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors"
          :class="family === f.key ? 'border-ink bg-white font-semibold' : 'border-line bg-paper-2 text-muted hover:text-ink'"
          :aria-pressed="family === f.key"
          @click="family = f.key"
        >
          <span v-if="f.color" class="inline-block h-3 w-3 rounded-full border-2 border-white" :style="{ background: f.color, boxShadow: '0 0 0 1px rgba(21,23,28,.35)' }" />
          {{ f.label }} <span class="font-normal text-muted">({{ f.count }})</span>
        </button>
      </div>
      <div class="flex gap-2">
        <input v-model="query" type="search" placeholder="Search taxon, genus or author" class="w-full rounded border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink lg:w-72" aria-label="Search taxa" />
        <select v-model="sort" class="rounded border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink" aria-label="Sort">
          <option value="year">Newest first</option>
          <option value="name">A–Z</option>
        </select>
      </div>
    </div>

    <div class="mt-5 grid gap-8 lg:grid-cols-12">
      <!-- Map -->
      <div class="lg:col-span-7">
        <div class="relative z-0 overflow-hidden rounded-md border border-line lg:sticky lg:top-24">
          <div ref="mapEl" class="h-[420px] w-full bg-paper-2 lg:h-[calc(100vh-8rem)] lg:max-h-[640px]" />
          <p class="border-t border-line bg-white px-4 py-2 text-xs text-muted">Each point marks the type locality (holotype) of a taxon.</p>
        </div>
      </div>

      <!-- List -->
      <div class="lg:col-span-5">
        <p class="mb-2 text-sm text-muted">{{ filtered.length }} of {{ species.length }} taxa</p>
        <ol class="divide-y divide-line border-y border-line">
          <li
            v-for="s in filtered"
            :key="s.name"
            :ref="(el) => el && rowEls.set(s.name, el)"
            class="row cursor-pointer px-3 py-4 transition-colors"
            :class="active === s.name ? 'bg-accent-soft' : 'hover:bg-white'"
            @mouseenter="highlight(s.name)"
            @mouseleave="highlight(null)"
            @click="focus(s)"
          >
            <p class="font-display text-lg leading-snug">
              <i>{{ s.name }}</i>
              <span class="ml-1.5 text-sm text-muted">{{ s.authors }}, {{ s.year }}</span>
            </p>
            <p class="mt-0.5 text-xs uppercase tracking-[0.1em] text-muted">{{ s.family }} · {{ s.subfamily }}</p>
            <p class="mt-2 flex gap-4 text-[0.8rem] font-semibold" @click.stop>
              <NuxtLink v-if="s.url" :to="s.url" class="underline decoration-line underline-offset-4 hover:text-accent-deep hover:decoration-current">Original description</NuxtLink>
              <a v-if="s.taxonworks" :href="s.taxonworks" target="_blank" rel="noopener" class="underline decoration-line underline-offset-4 hover:text-accent-deep hover:decoration-current">World Ichneumonidae Database ↗</a>
            </p>
          </li>
        </ol>
        <p v-if="!filtered.length" class="py-8 text-sm text-muted">No taxa match these filters.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { speciesPoints } from './SpeciesData.js'

const COLORS = { Ichneumonidae: '#15171c', Braconidae: '#8c5e2a' }
const colorOf = (f) => COLORS[f] || '#5f636b'

const species = speciesPoints

const genus = (n) => n.split(' ')[0]
const summary = computed(() => {
  const ys = species.map((s) => Number(s.year))
  return [
    { label: 'Taxa described', value: new Set(species.map((s) => s.name)).size },
    { label: 'Genera', value: new Set(species.map((s) => genus(s.name))).size },
    { label: 'Subfamilies', value: new Set(species.map((s) => s.subfamily)).size },
    { label: 'Years', value: `${Math.min(...ys)}–${String(Math.max(...ys)).slice(2)}` }
  ]
})

const family = ref('')
const query = ref('')
const sort = ref('year')

const familyButtons = computed(() => [
  { key: '', label: 'All families', count: species.length },
  ...[...new Set(species.map((s) => s.family))].map((f) => ({
    key: f,
    label: f,
    count: species.filter((s) => s.family === f).length,
    color: colorOf(f)
  }))
])

const filtered = computed(() => {
  const q = query.value.toLowerCase().trim()
  const list = species.filter(
    (s) =>
      (!family.value || s.family === family.value) &&
      (!q || `${s.name} ${s.authors} ${s.family} ${s.subfamily} ${s.year}`.toLowerCase().includes(q))
  )
  return [...list].sort((a, b) => (sort.value === 'name' ? a.name.localeCompare(b.name) : b.year - a.year || a.name.localeCompare(b.name)))
})

// ── Map ──
const mapEl = ref(null)
const rowEls = new Map()
const active = ref(null)
let L, map, group
const markers = new Map()

// spread taxa that share the exact same coordinates in a small ring
function positions() {
  const byKey = new Map()
  for (const s of species) {
    const k = `${s.lat},${s.lng}`
    if (!byKey.has(k)) byKey.set(k, [])
    byKey.get(k).push(s)
  }
  const out = new Map()
  for (const list of byKey.values()) {
    list.forEach((s, i) => {
      if (list.length === 1) return out.set(s.name, [s.lat, s.lng])
      const a = (2 * Math.PI * i) / list.length
      out.set(s.name, [s.lat + 0.35 * Math.sin(a), s.lng + 0.35 * Math.cos(a)])
    })
  }
  return out
}

const icon = (s, on = false) =>
  L.divIcon({
    className: '',
    html: `<div class="pt${on ? ' on' : ''}" style="background:${colorOf(s.family)}"></div>`,
    iconSize: on ? [18, 18] : [12, 12],
    iconAnchor: on ? [9, 9] : [6, 6]
  })

const popup = (s) =>
  `<div class="pop"><b><i>${s.name}</i></b><span>${s.authors}, ${s.year}</span><span>${s.family} · ${s.subfamily}</span>${
    s.url ? `<a href="${s.url}">Original description</a>` : ''
  }${s.taxonworks ? `<a href="${s.taxonworks}" target="_blank" rel="noopener">World Ichneumonidae Database ↗</a>` : ''}</div>`

onMounted(async () => {
  L = (await import('leaflet')).default
  map = L.map(mapEl.value, { fadeAnimation: false, scrollWheelZoom: false, worldCopyJump: true, minZoom: 2 }).setView([10, 10], 2)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri — Esri, HERE, Garmin, &copy; OpenStreetMap contributors',
    maxZoom: 16
  }).addTo(map)
  map.on('focus', () => map.scrollWheelZoom.enable())
  map.on('blur', () => map.scrollWheelZoom.disable())

  group = L.layerGroup().addTo(map)
  const pos = positions()
  for (const s of species) {
    const m = L.marker(pos.get(s.name), { icon: icon(s), title: s.name, riseOnHover: true }).bindPopup(popup(s))
    m.on('click', () => {
      active.value = s.name
      rowEls.get(s.name)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
    markers.set(s.name, { m, s })
  }
  draw()
  setTimeout(() => map.invalidateSize(), 200)
})
onBeforeUnmount(() => map?.remove())

function draw() {
  if (!group) return
  group.clearLayers()
  const shown = new Set(filtered.value.map((s) => s.name))
  const pts = []
  for (const [name, { m }] of markers) {
    if (shown.has(name)) {
      group.addLayer(m)
      pts.push(m.getLatLng())
    }
  }
  if (pts.length) map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 5 })
  if (map.getZoom() < 2) map.setZoom(2)
}
watch(filtered, draw)

function highlight(name) {
  for (const [n, { m, s }] of markers) {
    const on = n === name || n === active.value
    m.setIcon(icon(s, on))
    if (on) m.setZIndexOffset(1000)
    else m.setZIndexOffset(0)
  }
}
function focus(s) {
  active.value = s.name
  const entry = markers.get(s.name)
  if (!entry || !map) return
  map.setView(entry.m.getLatLng(), Math.max(map.getZoom(), 5))
  entry.m.openPopup()
  highlight(s.name)
}
</script>

<style scoped>
:deep(.pt) {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgb(21 23 28 / 0.45);
  transition: transform 0.15s ease;
}
:deep(.pt.on) {
  box-shadow: 0 0 0 2px #8c5e2a;
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
  min-width: 190px;
}
:deep(.pop span) {
  color: #5f636b;
  font-size: 12px;
}
:deep(.pop a) {
  color: #6e4a22;
  font-size: 12px;
  font-weight: 600;
  text-decoration: underline;
}
</style>

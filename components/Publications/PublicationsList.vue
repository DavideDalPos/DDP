<template>
  <section class="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
    <!-- Overview: numbers + publications per year -->
    <div class="grid gap-10 border-b border-line py-12 lg:grid-cols-12">
      <dl class="grid grid-cols-2 gap-x-6 gap-y-8 lg:col-span-5">
        <div v-for="s in summary" :key="s.label" class="border-l border-ink/20 pl-4">
          <dt class="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{{ s.label }}</dt>
          <dd class="mt-1 font-display text-4xl font-semibold">{{ s.value }}</dd>
        </div>
      </dl>

      <figure class="lg:col-span-7">
        <figcaption class="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          <span>Publications per year</span>
          <span class="normal-case tracking-normal">Click a year to filter</span>
        </figcaption>
        <div class="relative mt-4" @mouseleave="hoverYear = null">
          <div class="flex h-36 items-end gap-[2px] border-b border-ink/30" role="list">
            <button
              v-for="b in bars"
              :key="b.year"
              type="button"
              role="listitem"
              class="group relative flex h-full flex-1 items-end"
              :aria-label="`${b.year}: ${b.count} publication${b.count === 1 ? '' : 's'}`"
              :aria-pressed="year === b.year"
              @mouseenter="hoverYear = b.year"
              @focus="hoverYear = b.year"
              @click="toggleYear(b.year)"
            >
              <span
                class="bar block w-full rounded-t-[4px]"
                :class="year === b.year ? 'bg-accent' : year ? 'bg-ink/20' : 'bg-ink/80 group-hover:bg-ink'"
                :style="{ height: b.count ? `${(b.count / maxCount) * 100}%` : '2px' }"
              />
            </button>
          </div>
          <div class="mt-2 flex gap-[2px] text-[0.68rem] text-muted">
            <span v-for="(b, i) in bars" :key="b.year" class="flex-1 text-center">{{ i % labelStep === 0 || b.year === lastYear ? b.year : '' }}</span>
          </div>
          <div
            v-if="hoverBar"
            class="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded bg-ink px-2.5 py-1.5 text-xs text-white shadow"
            :style="{ left: `${hoverBar.center}%` }"
          >
            <b>{{ hoverBar.year }}</b> · {{ hoverBar.count }} publication{{ hoverBar.count === 1 ? '' : 's' }}
          </div>
        </div>
      </figure>
    </div>

    <!-- Toolbar -->
    <div class="toolbar sticky top-[64px] z-20 -mx-5 border-b border-line bg-paper/95 px-5 py-4 backdrop-blur lg:-mx-8 lg:px-8">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <label class="relative flex-1">
          <span class="sr-only">Search publications</span>
          <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            v-model="query"
            type="search"
            placeholder="Search title, author, journal, taxon or abstract"
            class="w-full rounded border border-line bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-ink"
          />
        </label>
        <div class="flex flex-wrap items-center gap-2">
          <select v-model="topic" class="rounded border border-line bg-white px-3 py-2.5 text-sm outline-none focus:border-ink" aria-label="Topic">
            <option value="">All topics</option>
            <option v-for="t in topicOptions" :key="t.key" :value="t.key">{{ t.label }} ({{ t.count }})</option>
          </select>
          <label class="flex cursor-pointer items-center gap-2 rounded border border-line bg-white px-3 py-2.5 text-sm">
            <input v-model="firstOnly" type="checkbox" class="accent-[#15171c]" />
            First author
          </label>
          <button type="button" class="rounded border border-line bg-white px-3 py-2.5 text-sm hover:border-ink" @click="newestFirst = !newestFirst">
            {{ newestFirst ? 'Newest first' : 'Oldest first' }} <span aria-hidden="true">{{ newestFirst ? '↓' : '↑' }}</span>
          </button>
        </div>
      </div>
      <p class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <span>
          Showing <b class="text-ink">{{ filtered.length }}</b> of {{ all.length }} publications<span v-if="year"> from {{ year }}</span>
        </span>
        <button v-if="isFiltered" type="button" class="font-semibold text-ink underline underline-offset-4" @click="reset">Clear filters</button>
      </p>
    </div>

    <!-- List -->
    <div v-if="grouped.length" class="mt-4">
      <section v-for="[y, pubs] in grouped" :key="y" class="grid gap-4 border-b border-line py-8 md:grid-cols-12">
        <h2 class="font-display text-3xl font-semibold text-ink/80 md:col-span-2">
          <span class="md:sticky md:top-[200px]">{{ y }}</span>
        </h2>
        <ol class="space-y-7 md:col-span-10">
          <li
            v-for="pub in pubs"
            :key="pub.path"
            class="entry grid grid-cols-[2.5rem_1fr] gap-x-3"
            itemscope
            itemtype="https://schema.org/ScholarlyArticle"
          >
            <span class="pt-0.5 text-right font-display text-sm text-muted">{{ number(pub) }}.</span>
            <div>
              <p class="text-[0.95rem] leading-relaxed text-ink/85">
                <span itemprop="author" v-html="authorList(pub.meta.authors, { html: true })" />
                <span class="text-muted"> ({{ yearOf(pub) }})</span>
              </p>
              <NuxtLink
                :to="pub.path"
                class="title mt-1 block font-display text-lg font-semibold leading-snug text-ink hover:text-accent-deep"
                itemprop="name"
              ><span v-html="pub.title" /></NuxtLink>
              <p class="mt-1 text-sm text-muted">
                <i itemprop="isPartOf">{{ pub.meta.journal }}</i><span v-if="sourceLine(pub.meta)">, {{ sourceLine(pub.meta) }}</span>
              </p>

              <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8rem]">
                <a v-if="pub.meta.doi" :href="doiUrl(pub.meta.doi)" target="_blank" rel="noopener" class="act">DOI ↗</a>
                <a v-if="pub.meta.pdf" :href="pub.meta.pdf" target="_blank" rel="noopener" class="act">PDF</a>
                <NuxtLink :to="pub.path" class="act">Abstract</NuxtLink>
                <button type="button" class="act" @click="copy(pub)">{{ copied === pub.path ? 'Copied ✓' : 'Cite' }}</button>
                <button type="button" class="act" @click="downloadText(`${pub.path.split('/').pop()}.bib`, bibtex(pub))">BibTeX</button>
                <span v-if="taxaOf(pub).length" class="flex flex-wrap gap-1.5">
                  <span v-for="t in taxaOf(pub)" :key="t" class="rounded border border-line px-1.5 py-0.5 text-[0.7rem] text-muted">{{ t }}</span>
                </span>
              </div>
            </div>
          </li>
        </ol>
      </section>
    </div>
    <div v-else class="py-20 text-center text-muted">
      <p>No publications match these filters.</p>
      <button type="button" class="mt-3 font-semibold text-ink underline underline-offset-4" @click="reset">Clear filters</button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import {
  TOPICS,
  authorList,
  bibtex,
  citation,
  doiUrl,
  downloadText,
  isFirstAuthor,
  sourceLine,
  stripHtml,
  taxaOf,
  topicsOf,
  yearOf
} from './pubUtils.js'

const { data } = await useAsyncData('publications-list', () => queryCollection('publications').all())

const all = computed(() =>
  [...(data.value || [])].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
)

// Reverse numbering, newest = highest, like a CV
const numbers = computed(() => new Map(all.value.map((p, i) => [p.path, all.value.length - i])))
const number = (pub) => numbers.value.get(pub.path)

// ── Overview numbers ──
const years = computed(() => all.value.map(yearOf))
const firstYear = computed(() => Math.min(...years.value))
const lastYear = computed(() => Math.max(new Date().getFullYear(), ...years.value))
const summary = computed(() => [
  { label: 'Publications', value: all.value.length },
  { label: 'As first author', value: all.value.filter(isFirstAuthor).length },
  { label: 'Journals', value: new Set(all.value.map((p) => p.meta.journal.toLowerCase())).size },
  { label: 'Since', value: firstYear.value }
])

// ── Per-year bars ──
const bars = computed(() => {
  const n = lastYear.value - firstYear.value + 1
  return Array.from({ length: n }, (_, i) => {
    const y = firstYear.value + i
    return { year: y, count: years.value.filter((v) => v === y).length, center: ((i + 0.5) / n) * 100 }
  })
})
const maxCount = computed(() => Math.max(1, ...bars.value.map((b) => b.count)))
const labelStep = computed(() => (bars.value.length > 12 ? 3 : bars.value.length > 7 ? 2 : 1))
const hoverYear = ref(null)
const hoverBar = computed(() => bars.value.find((b) => b.year === hoverYear.value))

// ── Filters ──
const query = ref('')
const topic = ref('')
const year = ref(null)
const firstOnly = ref(false)
const newestFirst = ref(true)

const topicOptions = computed(() =>
  TOPICS.map((t) => ({ ...t, count: all.value.filter((p) => topicsOf(p).includes(t.key)).length })).filter((t) => t.count)
)

function toggleYear(y) {
  year.value = year.value === y ? null : y
}
const isFiltered = computed(() => !!(query.value || topic.value || year.value || firstOnly.value))
function reset() {
  query.value = ''
  topic.value = ''
  year.value = null
  firstOnly.value = false
}

const haystack = (p) =>
  [
    stripHtml(p.title),
    p.meta.journal,
    (p.meta.authors || []).map((a) => `${a.first_name} ${a.last_name}`).join(' '),
    (p.meta.category || []).join(' '),
    stripHtml(p.meta.abstract || ''),
    p.meta.doi || ''
  ]
    .join(' ')
    .toLowerCase()

const filtered = computed(() => {
  const words = query.value.toLowerCase().split(/\s+/).filter(Boolean)
  return all.value.filter((p) => {
    if (year.value && yearOf(p) !== year.value) return false
    if (topic.value && !topicsOf(p).includes(topic.value)) return false
    if (firstOnly.value && !isFirstAuthor(p)) return false
    if (words.length) {
      const h = haystack(p)
      if (!words.every((w) => h.includes(w))) return false
    }
    return true
  })
})

const grouped = computed(() => {
  const groups = new Map()
  for (const p of filtered.value) {
    const y = yearOf(p)
    if (!groups.has(y)) groups.set(y, [])
    groups.get(y).push(p)
  }
  const out = [...groups.entries()].sort((a, b) => b[0] - a[0])
  if (!newestFirst.value) {
    out.reverse()
    out.forEach(([, list]) => list.reverse())
  }
  return out
})

// ── Cite ──
const copied = ref(null)
async function copy(pub) {
  try {
    await navigator.clipboard.writeText(citation(pub))
    copied.value = pub.path
    setTimeout(() => (copied.value === pub.path ? (copied.value = null) : null), 1800)
  } catch {
    window.prompt('Copy the citation:', citation(pub))
  }
}
</script>

<style scoped>
.bar {
  transition: height 0.5s ease, background-color 0.2s ease;
}
.act {
  font-weight: 600;
  color: var(--color-ink);
  text-decoration: underline;
  text-decoration-color: var(--color-line);
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s ease, color 0.2s ease;
}
.act:hover {
  color: var(--color-accent-deep);
  text-decoration-color: currentColor;
}
.title :deep(i) {
  font-style: italic;
}
</style>

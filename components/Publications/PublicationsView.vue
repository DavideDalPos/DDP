<template>
  <div v-if="publication">
    <!-- Header -->
    <section class="border-b border-line bg-paper-2">
      <div class="mx-auto max-w-7xl px-5 pb-12 pt-10 lg:px-8">
        <NuxtLink to="/publications" class="inline-block text-sm font-semibold text-muted hover:text-ink">← All publications</NuxtLink>
        <p class="kicker !flex mt-8">
          {{ m.journal }} · {{ year }}
        </p>
        <h1 class="title mt-4 max-w-5xl text-3xl font-semibold leading-tight sm:text-[2.6rem]" v-html="publication.title" />

        <!-- Authors -->
        <p class="mt-6 max-w-5xl text-[1.02rem] leading-relaxed">
          <template v-for="(a, i) in m.authors" :key="i">
            <span :class="isMe(a) ? 'font-semibold' : ''">{{ a.first_name }} {{ a.last_name }}</span><sup v-if="affNo(a)" class="ml-0.5 text-muted">{{ affNo(a) }}</sup><a
              v-if="a.orcid"
              :href="a.orcid"
              target="_blank"
              rel="noopener"
              class="ml-1 inline-block align-[-2px]"
              :aria-label="`ORCID of ${a.first_name} ${a.last_name}`"
              ><img src="/images/orcid.svg" alt="" class="inline h-3.5 w-3.5"
            /></a><span v-if="i < m.authors.length - 1">, </span>
          </template>
        </p>
        <ol v-if="affiliations.list.length" class="mt-3 max-w-5xl space-y-0.5 text-sm text-muted">
          <li v-for="(aff, i) in affiliations.list" :key="i"><sup>{{ i + 1 }}</sup> {{ aff }}</li>
        </ol>
      </div>
    </section>

    <section class="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-12 lg:px-8">
      <!-- Abstract + PDF -->
      <article class="lg:col-span-8">
        <div v-if="m.abstract">
          <h2 class="text-2xl font-semibold">Abstract</h2>
          <div class="abstract prose-epic mt-4" v-html="m.abstract" />
        </div>

        <div v-if="topicLabels.length || taxa.length" class="mt-8 flex flex-wrap gap-2">
          <span v-for="t in topicLabels" :key="t" class="rounded border border-ink/20 px-2 py-1 text-xs font-semibold">{{ t }}</span>
          <span v-for="t in taxa" :key="t" class="rounded border border-line px-2 py-1 text-xs text-muted">{{ t }}</span>
        </div>

        <div class="mt-10">
          <PDFPreview :pdf="m.pdf" :researchgate="m.researchgate" :doi="doiLink" />
        </div>
      </article>

      <!-- Sidebar -->
      <aside class="lg:col-span-4">
        <div class="space-y-6 lg:sticky lg:top-24">
          <div class="card relative overflow-hidden p-6">
            <span class="absolute inset-x-0 top-0 h-[3px] bg-accent" />
            <dl class="space-y-3 text-sm">
              <div><dt class="label">Journal</dt><dd class="mt-0.5 italic">{{ m.journal }}</dd></div>
              <div class="grid grid-cols-3 gap-3">
                <div v-if="m.volume"><dt class="label">Volume</dt><dd class="mt-0.5">{{ m.volume }}</dd></div>
                <div v-if="m.issue"><dt class="label">Issue</dt><dd class="mt-0.5">{{ m.issue }}</dd></div>
                <div v-if="m.pagination"><dt class="label">Pages</dt><dd class="mt-0.5">{{ m.pagination }}</dd></div>
              </div>
              <div><dt class="label">Published</dt><dd class="mt-0.5">{{ published }}</dd></div>
              <div v-if="doi">
                <dt class="label">DOI</dt>
                <dd class="mt-0.5 break-all"><a :href="doiLink" target="_blank" rel="noopener" class="underline underline-offset-2 hover:text-accent-deep">{{ doi }}</a></dd>
              </div>
            </dl>

            <div class="mt-6 flex flex-col gap-2">
              <a v-if="doiLink" :href="doiLink" target="_blank" rel="noopener" class="btn btn-primary justify-center">Read at the journal <span class="arrow">↗</span></a>
              <a v-if="m.pdf" :href="m.pdf" target="_blank" rel="noopener" class="btn btn-ghost justify-center text-ink hover:bg-ink hover:text-white">Download PDF</a>
              <a v-else-if="m.researchgate" :href="m.researchgate" target="_blank" rel="noopener" class="btn btn-ghost justify-center text-ink hover:bg-ink hover:text-white">Request on ResearchGate ↗</a>
            </div>
          </div>

          <div class="card p-6">
            <p class="label">How to cite</p>
            <p class="mt-3 text-sm leading-relaxed text-ink/85">{{ cite }}</p>
            <div class="mt-4 flex gap-4 text-sm font-semibold">
              <button type="button" class="underline underline-offset-4 hover:text-accent-deep" @click="copy">{{ copied ? 'Copied ✓' : 'Copy citation' }}</button>
              <button type="button" class="underline underline-offset-4 hover:text-accent-deep" @click="downloadText(`${slug}.bib`, bibtex(publication))">BibTeX</button>
            </div>
          </div>

          <div v-if="doi" class="flex items-center">
            <AltmetricBadge :raw-doi="m.doi" />
          </div>
        </div>
      </aside>
    </section>

    <!-- Previous / next -->
    <nav v-if="prev || next" class="border-t border-line">
      <div class="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-2 lg:px-8">
        <NuxtLink v-if="next" :to="next.path" class="group">
          <span class="label">← Newer</span>
          <span class="mt-1 block font-display text-lg font-semibold leading-snug group-hover:text-accent-deep" v-html="next.title" />
        </NuxtLink>
        <span v-else />
        <NuxtLink v-if="prev" :to="prev.path" class="group sm:text-right">
          <span class="label">Older →</span>
          <span class="mt-1 block font-display text-lg font-semibold leading-snug group-hover:text-accent-deep" v-html="prev.title" />
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AltmetricBadge from './AltmetricBadge.vue'
import PDFPreview from './PDFPreview.vue'
import { TOPICS, bibtex, citation, cleanDoi, doiUrl, downloadText, isMe, stripHtml, taxaOf, topicsOf, yearOf } from './pubUtils.js'

const props = defineProps({ publication: Object })

const m = computed(() => props.publication?.meta || {})
const year = computed(() => yearOf(props.publication))
const doi = computed(() => cleanDoi(m.value.doi))
const doiLink = computed(() => doiUrl(m.value.doi))
const slug = computed(() => props.publication?.path?.split('/').pop() || 'citation')
const published = computed(() =>
  new Date(m.value.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
)
const cite = computed(() => citation(props.publication))
const topicLabels = computed(() => topicsOf(props.publication).map((k) => TOPICS.find((t) => t.key === k).label))
const taxa = computed(() => taxaOf(props.publication))

useHead({
  title: computed(() => stripHtml(props.publication?.title || 'Publication')),
  meta: [
    { name: 'description', content: computed(() => stripHtml(m.value.abstract || '').slice(0, 300)) },
    { name: 'citation_title', content: computed(() => stripHtml(props.publication?.title || '')) },
    { name: 'citation_journal_title', content: computed(() => m.value.journal) },
    { name: 'citation_publication_date', content: computed(() => String(m.value.date || '').slice(0, 10)) },
    { name: 'citation_doi', content: computed(() => doi.value) }
  ]
})

// Numbered affiliations
const affiliations = computed(() => {
  const map = new Map()
  const list = []
  for (const a of m.value.authors || []) {
    const aff = a.affiliation?.trim()
    if (aff && !map.has(aff)) {
      map.set(aff, list.length + 1)
      list.push(aff)
    }
  }
  return { map, list }
})
const affNo = (a) => affiliations.value.map.get(a.affiliation?.trim())

// Previous / next by date
const { data: all } = await useAsyncData('publications-nav', () => queryCollection('publications').all())
const ordered = computed(() => [...(all.value || [])].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date)))
const idx = computed(() => ordered.value.findIndex((p) => p.path === props.publication?.path))
const next = computed(() => (idx.value > 0 ? ordered.value[idx.value - 1] : null))
const prev = computed(() => (idx.value >= 0 && idx.value < ordered.value.length - 1 ? ordered.value[idx.value + 1] : null))

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(cite.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    window.prompt('Copy the citation:', cite.value)
  }
}
</script>

<style scoped>
.label {
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.title :deep(i) {
  font-style: italic;
}
.abstract {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #33363c;
  text-align: justify;
  hyphens: auto;
}
</style>

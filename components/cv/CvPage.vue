<template>
  <div>
    <CVIntro />

    <div class="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-12 lg:px-8">
      <!-- Contents -->
      <nav class="hidden lg:col-span-3 lg:block" aria-label="CV sections">
        <div class="sticky top-24">
          <p class="label">Contents</p>
          <ol class="mt-4 space-y-1 border-l border-line">
            <li v-for="s in sections" :key="s.id">
              <a
                :href="`#${s.id}`"
                class="-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors"
                :class="current === s.id ? 'border-accent font-semibold text-ink' : 'border-transparent text-muted hover:text-ink'"
                @click.prevent="go(s.id)"
              >{{ s.label }}</a>
            </li>
          </ol>
          <div class="mt-8 space-y-2 text-sm">
            <a :href="PDF" target="_blank" rel="noopener" class="btn btn-primary w-full justify-center">Download PDF</a>
            <p v-if="lastUpdated" class="text-center text-xs text-muted">PDF updated {{ lastUpdated }}</p>
          </div>
        </div>
      </nav>

      <div class="space-y-16 lg:col-span-9">
        <!-- Appointments -->
        <section id="appointments" class="scroll-mt-24">
          <h2 class="h">Appointments</h2>
          <ol class="mt-6 divide-y divide-line border-y border-line">
            <li v-for="job in sortedJobs" :key="`${job.id}-${job.title}`" class="row">
              <span class="years">
                {{ job.start }}–{{ job.end === 'Present' ? '' : job.end }}
                <span v-if="job.end === 'Present'" class="current">Current</span>
              </span>
              <div>
                <p class="font-semibold">{{ job.title }}</p>
                <p class="text-ink/80">{{ job.institution }}</p>
                <ul v-if="Array.isArray(job.description)" class="mt-1.5 space-y-0.5 text-sm text-muted">
                  <li v-for="(d, i) in job.description" :key="i">— {{ d }}</li>
                </ul>
                <p v-else-if="job.description" class="mt-1 text-sm text-muted">{{ job.description }}</p>
              </div>
            </li>
          </ol>
        </section>

        <!-- Education -->
        <section id="education" class="scroll-mt-24">
          <h2 class="h">Education</h2>
          <ol class="mt-6 divide-y divide-line border-y border-line">
            <li v-for="e in education" :key="e.degree" class="row">
              <span class="years">{{ e.year }}</span>
              <div>
                <p class="font-semibold">{{ e.degree }}</p>
                <p class="text-ink/80">{{ e.institution }}</p>
                <p v-if="e.title" class="mt-1 font-display italic text-ink/85">“{{ e.title }}”</p>
                <p v-if="e.advisor" class="mt-1 text-sm text-muted">Advisor: {{ e.advisor }}</p>
              </div>
            </li>
          </ol>
        </section>

        <!-- Awards -->
        <section id="awards" class="scroll-mt-24">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 class="h">Awards and honours</h2>
            <p class="text-sm text-muted">{{ awards.length }} awards · {{ money(awardsTotal) }} in prizes</p>
          </div>
          <ol class="mt-6 divide-y divide-line border-y border-line">
            <li v-for="a in sortedAwards" :key="a.name + a.year" class="row">
              <span class="years">{{ a.year }}</span>
              <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div>
                  <p class="font-semibold">{{ a.name }}</p>
                  <p class="text-sm text-muted">{{ a.org }}<span v-if="a.additional"> · {{ a.additional }}</span></p>
                </div>
                <span class="text-sm tabular-nums text-muted">{{ a.value ? money(a.value) : a.type }}</span>
              </div>
            </li>
          </ol>
        </section>

        <!-- Funding -->
        <section id="funding" class="scroll-mt-24">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 class="h">Grants and fellowships</h2>
            <p class="text-sm text-muted">{{ funding.length }} awards · {{ money(fundingTotal) }} total</p>
          </div>
          <ol class="mt-6 divide-y divide-line border-y border-line">
            <li v-for="f in sortedFunding" :key="f.name + f.year + f.term" class="row">
              <span class="years">{{ f.year }}</span>
              <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <div>
                  <p class="font-semibold">{{ f.name }}</p>
                  <p class="text-sm text-muted">{{ f.org }}<span v-if="f.note"> · {{ f.note }}</span></p>
                </div>
                <span class="text-sm tabular-nums text-muted">{{ f.value ? money(f.value) : '' }}</span>
              </div>
            </li>
          </ol>
        </section>

        <!-- Skills -->
        <section id="skills" class="scroll-mt-24">
          <h2 class="h">Expertise</h2>
          <dl class="mt-6 divide-y divide-line border-y border-line">
            <div v-for="g in skills" :key="g.label" class="row">
              <dt class="years !text-ink/80">{{ g.label }}</dt>
              <dd class="text-ink/85">{{ g.items.join(' · ') }}</dd>
            </div>
          </dl>
        </section>

        <!-- Publications -->
        <section id="publications" class="scroll-mt-24">
          <h2 class="h">Publications</h2>
          <div class="mt-6 flex flex-col items-start justify-between gap-4 border-y border-line py-6 sm:flex-row sm:items-center">
            <p class="text-ink/85">
              {{ pubCount }} publications, {{ firstAuthor }} as first author.
              The full, searchable list is on the publications page.
            </p>
            <NuxtLink to="/publications" class="btn btn-ghost shrink-0 text-ink hover:bg-ink hover:text-white">All publications <span class="arrow">→</span></NuxtLink>
          </div>
        </section>

        <!-- PDF -->
        <section id="cv" class="scroll-mt-24">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2 class="h">Full CV (PDF)</h2>
            <a :href="PDF" target="_blank" rel="noopener" class="text-sm font-semibold underline underline-offset-4 hover:text-accent-deep">Open in a new tab ↗</a>
          </div>
          <div class="mt-6 overflow-hidden rounded-md border border-line bg-white">
            <iframe :src="PDF" title="Curriculum vitae (PDF)" class="h-[760px] w-full" loading="lazy" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CVIntro from './CVIntro.vue'
import { awards } from './CvAwardsData.js'
import { education } from './CvEducationData.js'
import { funding } from './CvFundingData.js'
import { jobs } from './CvJobsData.js'
import { isFirstAuthor } from '~/components/Publications/pubUtils.js'

const PDF = '/PDFs/Davide_Dal_Pos_CV.pdf'

const sections = [
  { id: 'appointments', label: 'Appointments' },
  { id: 'education', label: 'Education' },
  { id: 'awards', label: 'Awards and honours' },
  { id: 'funding', label: 'Grants and fellowships' },
  { id: 'skills', label: 'Expertise' },
  { id: 'publications', label: 'Publications' },
  { id: 'cv', label: 'Full CV (PDF)' }
]

const endVal = (e) => (e === 'Present' ? Infinity : Number(e))
const sortedJobs = computed(() =>
  [...jobs].sort((a, b) => endVal(b.end) - endVal(a.end) || Number(b.start) - Number(a.start))
)
const termOrder = { Fall: 3, Summer: 2, Spring: 1 }
const byDate = (a, b) => b.year - a.year || (termOrder[b.term] || 0) - (termOrder[a.term] || 0)
const sortedAwards = computed(() => [...awards].sort(byDate))
const sortedFunding = computed(() => [...funding].sort(byDate))
const sum = (list) => list.reduce((t, x) => t + (x.value || 0), 0)
const awardsTotal = computed(() => sum(awards))
const fundingTotal = computed(() => sum(funding))
const money = (n) => `$${Number(n).toLocaleString('en-US')}`

const skills = [
  { label: 'Systematics', items: ['Taxonomy', 'Systematics and phylogenetics', 'Ichneumonidae', 'Species description', 'Host–parasitoid interactions', 'Parasitoid ecology'] },
  { label: 'Morphology', items: ['Comparative and skeleto-muscular anatomy', 'Convergent evolution', 'Anatomy ontologies (HAO)', 'Micro-CT scanning', 'Specimen preparation and dissection'] },
  { label: 'Collections', items: ['Collection management', 'Digitization', 'Biodiversity informatics', 'TaxonWorks and TaxonPages', 'Database management'] },
  { label: 'Technical', items: ['Data visualization', 'Web development (Vue.js, Nuxt, Tailwind CSS)', 'Scientific publishing and editing'] },
  { label: 'Teaching', items: ['Entomology', 'Invertebrate biodiversity', 'General biology', 'Mentoring students'] }
]

const { data: pubs } = await useAsyncData('cv-pubs', () => queryCollection('publications').all())
const pubCount = computed(() => pubs.value?.length || 0)
const firstAuthor = computed(() => (pubs.value || []).filter(isFirstAuthor).length)

// Section highlighted in the contents list
const current = ref('appointments')
let io
function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
}

// Date the PDF was last changed on GitHub
const lastUpdated = ref('')
onMounted(async () => {
  io = new IntersectionObserver(
    (entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (vis[0]) current.value = vis[0].target.id
    },
    { rootMargin: '-20% 0px -65% 0px' }
  )
  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) io.observe(el)
  })
  try {
    const res = await fetch('https://api.github.com/repos/DavideDalPos/DDP/commits?path=public/PDFs/Davide_Dal_Pos_CV.pdf&page=1&per_page=1')
    const data = await res.json()
    if (Array.isArray(data) && data[0]) {
      lastUpdated.value = new Date(data[0].commit.committer.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }
  } catch {}
})
onBeforeUnmount(() => io?.disconnect())
</script>

<style scoped>
.label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.h {
  font-size: 1.9rem;
  font-weight: 600;
}
.row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem 1.5rem;
  padding: 1.1rem 0;
}
@media (min-width: 640px) {
  .row {
    grid-template-columns: 9rem 1fr;
  }
}
.years {
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
  color: var(--color-muted);
  padding-top: 0.1rem;
}
.current {
  display: inline-block;
  margin-left: 0.35rem;
  padding: 0 0.4rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-deep);
  border: 1px solid currentColor;
  border-radius: 3px;
  vertical-align: 1px;
}
</style>

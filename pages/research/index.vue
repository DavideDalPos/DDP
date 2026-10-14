<template>
  <div>
    <LabPageHero
      kicker="Research"
      title="Four connected areas of research"
      lede="We discover and describe insect species, study their anatomy and its evolution, organise the resulting knowledge as open data, and use collections to document how diversity changes."
    />

    <section class="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-12 lg:px-8">
      <!-- Diagram -->
      <div v-reveal class="relative mx-auto w-full max-w-[26rem] lg:col-span-5">
        <svg viewBox="0 0 400 400" class="w-full" role="img" aria-label="The four research areas form a cycle: Species Exploration, Phenomics, Informatics, Conservation">
          <defs>
            <marker id="tip" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill="#8a8d93" />
            </marker>
          </defs>
          <circle cx="200" cy="200" r="150" fill="none" stroke="#dedad2" stroke-width="1" />
          <path v-for="(a, i) in arcs" :key="i" :d="a" fill="none" stroke="#8a8d93" stroke-width="1.2" marker-end="url(#tip)" />
          <g
            v-for="(p, i) in pillars"
            :key="p.key"
            class="node cursor-pointer"
            :transform="`translate(${pos[i][0]} ${pos[i][1]})`"
            @mouseenter="active = i"
            @mouseleave="active = null"
            @click="navigateTo(p.link)"
          >
            <circle r="32" :fill="active === i ? '#15171c' : '#ffffff'" stroke="#15171c" stroke-width="1.2" />
            <text text-anchor="middle" dy="0.35em" :fill="active === i ? '#ffffff' : '#15171c'" font-size="26" font-weight="600" style="font-family: var(--font-display)">{{ p.letter }}</text>
          </g>
          <text x="200" y="196" text-anchor="middle" font-size="22" font-weight="600" fill="#15171c" style="font-family: var(--font-display)">EPIC</text>
          <text x="200" y="220" text-anchor="middle" font-size="11" letter-spacing="2" fill="#5f636b">RESEARCH CYCLE</text>
        </svg>
      </div>

      <!-- List -->
      <ol class="divide-y divide-line border-y border-line lg:col-span-7">
        <li v-for="(p, i) in pillars" :key="p.key" v-reveal="i * 70">
          <NuxtLink
            :to="p.link"
            class="group flex gap-6 py-6 transition-colors"
            @mouseenter="active = i"
            @mouseleave="active = null"
          >
            <span class="w-8 shrink-0 font-display text-2xl font-semibold" :class="active === i ? 'text-accent-deep' : 'text-ink/40'">{{ p.letter }}</span>
            <span class="flex-1">
              <span class="flex items-center justify-between gap-3">
                <span class="font-display text-xl font-semibold group-hover:text-accent-deep">{{ p.name }}</span>
                <span class="text-sm text-accent-deep transition-transform group-hover:translate-x-1">→</span>
              </span>
              <span class="mt-1 block text-[0.95rem] leading-relaxed text-muted">{{ p.summary }}</span>
            </span>
          </NuxtLink>
        </li>
      </ol>
    </section>

    <!-- How they connect -->
    <section class="border-t border-line bg-paper-2">
      <div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p v-reveal class="kicker">How the areas connect</p>
        <div class="mt-10 grid gap-10 md:grid-cols-4">
          <div v-for="(c, i) in links" :key="c.from" v-reveal="i * 80" class="border-t border-ink/20 pt-5">
            <p class="text-sm font-semibold">{{ c.from }} <span class="text-muted">→</span> {{ c.to }}</p>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ c.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div v-reveal class="flex flex-col items-start justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center">
        <div>
          <p class="font-display text-2xl font-semibold">Species described</p>
          <p class="mt-1 text-muted">Type localities on a map, and the full list of new taxa with their original publications.</p>
        </div>
        <NuxtLink to="/species" class="btn btn-primary">View species <span class="arrow">→</span></NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pillars } from '~/components/Lab/labData.js'

useHead({ title: 'Research' })

const pos = [
  [200, 50],
  [350, 200],
  [200, 350],
  [50, 200]
]
function arc(a, b) {
  const ang = (p) => Math.atan2(p[1] - 200, p[0] - 200)
  const off = 0.32
  const a1 = ang(a) + off
  const a2 = ang(b) - off
  const r = 150
  const x1 = 200 + r * Math.cos(a1)
  const y1 = 200 + r * Math.sin(a1)
  const x2 = 200 + r * Math.cos(a2)
  const y2 = 200 + r * Math.sin(a2)
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
}
const arcs = pos.map((p, i) => arc(p, pos[(i + 1) % 4]))

const links = [
  { from: 'Exploration', to: 'Phenomics', text: 'New species and revisions require detailed anatomy, and raise questions about how traits evolve.' },
  { from: 'Phenomics', to: 'Informatics', text: 'Images and ontology-based descriptions become structured data that can be shared and compared.' },
  { from: 'Informatics', to: 'Conservation', text: 'Digitized, open collection data provide a baseline for tracking where species occur and how that changes.' },
  { from: 'Conservation', to: 'Exploration', text: 'Gaps and declines indicate where further survey and taxonomic work are needed.' }
]

const active = ref(null)
</script>

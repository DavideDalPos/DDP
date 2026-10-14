<template>
  <div>
    <LabPageHero
      kicker="The lab"
      title="People"
      lede="The EPIC Lab is based at the Enns Entomology Museum, University of Missouri. The lab was established in 2026 and is currently recruiting its first members."
    />

    <!-- PI -->
    <section class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div v-reveal class="pi grid overflow-hidden rounded-lg border border-line bg-white lg:grid-cols-12">
        <div class="relative lg:col-span-5">
          <img src="/images/lab/davide.jpg" alt="Davide Dal Pos" class="h-full max-h-[34rem] w-full object-cover" />
          <span class="absolute left-0 top-5 bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">Principal investigator</span>
        </div>
        <div class="p-8 sm:p-12 lg:col-span-7">
          <h2 class="text-4xl font-semibold">Davide Dal Pos, Ph.D.</h2>
          <p class="mt-2 text-lg text-accent-deep">Assistant Professor · Director, {{ lab.museum.name }}</p>
          <div class="prose-epic mt-6">
            <p>
              Davide is an entomologist who works on parasitoid wasps, especially the Ichneumonidae. His research joins
              <strong>systematics</strong>, <strong>evolutionary morphology</strong> and comparative anatomy,
              <strong>anatomy ontologies</strong> and <strong>biodiversity informatics</strong>, with museum collections
              at the centre of it all.
            </p>
            <p>
              Before Missouri he spent nearly eight years at the University of Central Florida as a Ph.D. student and
              postdoc. He runs the World Ichneumonidae Database and Syrphidae of Italy, and serves as an editor for
              ZooKeys, Deutsche Entomologische Zeitschrift and Biodiversity Data Journal.
            </p>
          </div>
          <div class="mt-8 flex flex-wrap gap-2">
            <NuxtLink to="/cv" class="btn btn-primary !py-2.5">Full CV <span class="arrow">→</span></NuxtLink>
            <a :href="`mailto:${lab.email}`" class="btn btn-ghost !py-2.5 text-ink hover:bg-ink hover:text-white">Email</a>
            <a href="https://orcid.org/0000-0002-9122-934X" target="_blank" rel="noopener" class="btn btn-ghost !py-2.5 text-ink hover:bg-ink hover:text-white">ORCID</a>
            <a href="https://scholar.google.com/citations?user=wYj3d_oAAAAJ" target="_blank" rel="noopener" class="btn btn-ghost !py-2.5 text-ink hover:bg-ink hover:text-white">Scholar</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Members by group -->
    <section v-for="g in filled" :key="g.key" class="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
      <h2 v-reveal class="text-3xl font-semibold">{{ g.label }}</h2>
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(m, i) in g.people"
          :key="m.name"
          v-reveal="i * 80"
          class="member card overflow-hidden"
        >
          <div class="aspect-[4/3] overflow-hidden bg-paper-2">
            <img v-if="m.photo" :src="m.photo" :alt="m.name" class="h-full w-full object-cover transition-transform duration-700" loading="lazy" />
            <div v-else class="flex h-full items-center justify-center font-display text-5xl font-semibold text-ink/30">{{ initials(m.name) }}</div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold">{{ m.name }}</h3>
            <p class="mt-1 text-sm font-medium text-lav-deep">{{ m.role }}<span v-if="m.since"> · since {{ m.since }}</span></p>
            <p v-if="m.project" class="mt-3 text-sm leading-relaxed text-muted">{{ m.project }}</p>
            <div v-if="m.links" class="mt-4 flex gap-3 text-sm font-semibold">
              <a v-if="m.links.email" :href="`mailto:${m.links.email}`" class="underline underline-offset-4">Email</a>
              <a v-if="m.links.orcid" :href="m.links.orcid" target="_blank" rel="noopener" class="underline underline-offset-4">ORCID</a>
              <a v-if="m.links.website" :href="m.links.website" target="_blank" rel="noopener" class="underline underline-offset-4">Website</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Open seats -->
    <section class="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
      <h2 v-reveal class="text-3xl font-semibold">{{ members.length ? 'Open positions' : 'Lab members' }}</h2>
      <p v-reveal="60" class="mt-3 max-w-2xl text-muted">
        The lab is recruiting graduate students and undergraduate researchers, and welcomes postdoctoral fellowship applicants. See the positions page for details.
      </p>
      <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="(s, i) in seats"
          :key="s.title"
          v-reveal="i * 70"
          to="/join"
          class="seat group flex flex-col border-t border-ink/20 pt-5"
        >
          <span class="text-lg font-semibold group-hover:text-accent-deep">{{ s.title }}</span>
          <span class="mt-1 flex-1 text-sm text-muted">{{ s.text }}</span>
          <span class="mt-4 text-sm font-semibold text-accent-deep">Details →</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Collaborators -->
    <section class="bg-paper-2">
      <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-16 sm:flex-row sm:items-center lg:px-8">
        <div v-reveal>
          <p class="kicker">Collaborators</p>
          <p class="mt-3 font-display text-3xl font-semibold">{{ collaborators.length }} collaborators worldwide</p>
          <p class="mt-2 text-muted">The people we work with, on a map.</p>
        </div>
        <NuxtLink v-reveal="100" to="/network" class="btn btn-primary">See the network <span class="arrow">→</span></NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { lab } from '~/components/Lab/labData.js'
import { groups, members } from '~/components/Lab/people.js'
import { collaborators } from '~/components/Network/Collaborators/index.js'

useHead({ title: 'People' })

const filled = computed(() =>
  groups.map((g) => ({ ...g, people: members.filter((m) => m.group === g.key) })).filter((g) => g.people.length)
)
const initials = (n) =>
  n
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')


const seats = [
  { title: 'Ph.D. students', text: 'Independent projects in one or more research areas.' },
  { title: 'M.S. students', text: 'Focused projects based on specimens and data.' },
  { title: 'Undergraduate researchers', text: 'Imaging, digitization and research for credit.' },
  { title: 'Postdoctoral researchers', text: 'Fellowship proposals developed with the lab.' }
]
</script>

<style scoped>
.pi {

}
.member {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.member:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 40px -30px rgb(21 23 28 / 0.5);
}
.member:hover img {
  transform: scale(1.05);
}
</style>

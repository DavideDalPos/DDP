<template>
  <section
    id="about"
    class="mx-auto grid max-w-7xl scroll-mt-20 gap-14 px-5 py-24 lg:grid-cols-12 lg:px-8 lg:py-32"
  >
    <div class="lg:col-span-7">
      <p v-reveal class="kicker">About the lab</p>
      <h2 v-reveal="80" class="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
        Insects are the most diverse animals on Earth, and most of them are still unknown.
      </h2>
      <div v-reveal="160" class="prose-epic mt-8 max-w-2xl">
        <p>
          The EPIC Lab studies that diversity from the specimen up. We discover and describe new species, measure how
          insects are built and how their anatomy evolves, and turn museum collections into open, connected data that
          anyone can use.
        </p>
        <p>
          Our work centres on <strong>parasitoid wasps</strong> — especially the hyperdiverse Ichneumonidae, or Darwin
          wasps — but reaches across insects, from hoverflies to the many groups held in Missouri’s insect collection. We are based
          at the <a :href="lab.museum.url" target="_blank" rel="noopener">{{ lab.museum.name }}</a>, home to
          {{ lab.museum.holdings }} specimens.
        </p>
      </div>
      <div v-reveal="220" class="mt-8 flex flex-wrap gap-3">
        <NuxtLink to="/research" class="btn btn-primary">Our research <span class="arrow">→</span></NuxtLink>
        <NuxtLink to="/people" class="btn btn-ghost text-ink hover:bg-ink hover:text-white">Meet the lab</NuxtLink>
      </div>
    </div>

    <!-- PI card -->
    <aside v-reveal="200" class="lg:col-span-5">
      <div class="pi card relative overflow-hidden p-7 sm:p-8">
        <div class="flex items-center gap-5">
          <div class="relative shrink-0">
                        <img
              src="/images/lab/davide.jpg"
              alt="Davide Dal Pos"
              class="relative h-24 w-24 rounded-full object-cover ring-1 ring-line sm:h-28 sm:w-28"
              width="112"
              height="112"
            />
          </div>
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-muted">Principal investigator</p>
            <p class="mt-1 font-display text-2xl font-semibold">Davide Dal Pos, Ph.D.</p>
          </div>
        </div>
        <ul class="mt-6 space-y-3 text-sm">
          <li v-for="r in roles" :key="r" class="flex gap-3">
            <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lav" />
            <span class="text-ink/80">{{ r }}</span>
          </li>
        </ul>
        <div class="mt-7 flex flex-wrap gap-2 border-t border-line pt-6">
          <NuxtLink to="/cv" class="chip">CV</NuxtLink>
          <NuxtLink to="/publications" class="chip">Publications</NuxtLink>
          <NuxtLink to="/teaching" class="chip">Teaching</NuxtLink>
          <a :href="`mailto:${lab.email}`" class="chip">Email</a>
        </div>
      </div>
    </aside>
  </section>
</template>

<script setup>
import { lab } from '~/components/Lab/labData.js'

const roles = [
  `Assistant Professor, ${lab.division}`,
  `Director, ${lab.museum.name}`,
  'Research Associate, Natural History Museum of Venice',
  'Editor, ZooKeys, Deutsche Entomologische Zeitschrift & Biodiversity Data Journal'
]
</script>

<style scoped>
.pi::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: var(--color-accent);
}
.chip {
  border: 1px solid var(--color-line);
  border-radius: 4px;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}
.chip:hover {
  border-color: var(--color-ink);
  background: var(--color-ink);
  color: #fff;
}
</style>

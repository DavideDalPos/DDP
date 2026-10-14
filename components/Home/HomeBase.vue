<template>
  <section class="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
    <div class="grid items-start gap-14 lg:grid-cols-12">
      <!-- Photographs -->
      <div v-reveal class="grid grid-cols-3 gap-3 lg:col-span-6">
        <figure class="col-span-3 overflow-hidden rounded-md border border-line">
          <img src="/images/lab/compactors.jpg" alt="Rows of compactor cabinets in the Enns Entomology Museum" class="aspect-[16/9] w-full object-cover" loading="lazy" />
        </figure>
        <figure class="col-span-2 overflow-hidden rounded-md border border-line">
          <img src="/images/lab/odonata.jpg" alt="A drawer of dragonflies stored in envelopes" class="aspect-[4/3] h-full w-full object-cover" loading="lazy" />
        </figure>
        <figure class="overflow-hidden rounded-md border border-line">
          <img src="/images/lab/wet.jpg" alt="Shelves of specimens preserved in alcohol" class="h-full w-full object-cover" loading="lazy" />
        </figure>
      </div>

      <div class="lg:col-span-6">
        <p v-reveal class="kicker">The Enns Entomology Museum</p>
        <h2 v-reveal="60" class="mt-5 text-4xl font-semibold leading-tight">A lab within a research collection</h2>
        <p v-reveal="120" class="mt-5 text-lg leading-relaxed text-muted">
          The lab is based at the {{ lab.museum.name }}, the insect collection of the University of Missouri, with
          {{ lab.museum.holdings }} specimens. The collection is both the starting point of our research and the place
          where the data we produce are kept and shared.
        </p>
        <a
          v-reveal="160"
          :href="lab.museum.url"
          target="_blank"
          rel="noopener"
          class="btn btn-ghost mt-7 text-ink hover:bg-ink hover:text-white"
          >Visit the museum website <span class="arrow">↗</span></a
        >

        <p v-reveal="180" class="mt-12 text-xs font-bold uppercase tracking-[0.16em] text-muted">Databases and resources</p>
        <ul class="mt-4 divide-y divide-line border-y border-line">
          <li v-for="(r, i) in resources" :key="r.short" v-reveal="200 + i * 60">
            <a :href="r.url" target="_blank" rel="noopener" class="group flex items-baseline gap-4 py-4">
              <span class="w-12 shrink-0 font-display text-sm font-semibold text-accent-deep">{{ r.short }}</span>
              <span class="flex-1">
                <span class="block text-sm font-semibold group-hover:underline">{{ r.name }}</span>
                <span class="block text-sm text-muted">{{ r.text }}</span>
              </span>
              <span class="text-muted transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { lab, resources } from '~/components/Lab/labData.js'
</script>

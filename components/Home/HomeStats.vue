<template>
  <section class="bg-ink py-16 text-white">
    <div class="mx-auto grid max-w-7xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <div
        v-for="(s, i) in stats"
        :key="s.label"
        v-reveal="i * 80"
        class="border-l border-white/20 pl-5"
      >
        <p class="font-display text-5xl font-semibold">
          <LabCountUp :to="s.value" :suffix="s.suffix" />
        </p>
        <p class="mt-2 text-sm leading-snug text-white/60">{{ s.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { speciesPoints } from '~/components/Species/SpeciesData.js'
import { collaborators } from '~/components/Network/Collaborators/index.js'

const { data: pubs } = await useAsyncData('home-pub-count', () => queryCollection('publications').all())

const stats = computed(() => [
  { value: new Set(speciesPoints.map((s) => s.name)).size, suffix: '', label: 'new species and subspecies described' },
  { value: pubs.value?.length || 0, suffix: '', label: 'publications' },
  { value: collaborators.length, suffix: '', label: 'collaborators worldwide' },
  { value: 7, suffix: 'M+', label: 'specimens in the Enns Entomology Museum' }
])
</script>

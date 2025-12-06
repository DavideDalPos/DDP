<template>
  <div class="container mx-auto px-6 my-16 max-w-10xl">
      <!-- Header with toggle -->
      <h2
        class="text-xl font-bold mb-4 text-amber-400 cursor-pointer flex items-center gap-2"
        @click="toggleList"
      >
        Complete Species List
        <span class="text-amber-200 text-sm">{{ isOpen ? '▲' : '▼' }}</span>
      </h2>

      <transition name="fade">
        <div v-show="isOpen">
          <template v-for="(speciesArray, family) in groupedSpecies" :key="family">
            <!-- Family subheader -->
            <h3 class="text-lg font-semibold mt-4 mb-2 text-gray-300">
              {{ family }}
            </h3>

            <!-- Species in two columns -->
            <ul class="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-1 list-disc list-inside">
              <li
                v-for="species in speciesArray"
                :key="species.name"
                class="hover:text-amber-400 transition cursor-pointer"
              >
<a :href="species.url" target="_blank" rel="noopener noreferrer">
  <i>{{ species.name }}</i>
  <span v-if="species.authors" class="ml-1 text-sm text-gray-400">
    {{ formatAuthors(species.authors) }}
  </span>
</a>

              </li>
            </ul>
          </template>
        </div>
      </transition>
    </div>
</template>

<script setup>import { speciesPoints } from '@/components/Species/SpeciesData.js'
import { ref } from 'vue'


const isOpen = ref(false)
const toggleList = () => { isOpen.value = !isOpen.value }

// Group species by family
const groupedSpecies = speciesPoints.reduce((acc, sp) => {
  if (!acc[sp.family]) acc[sp.family] = []
  acc[sp.family].push(sp)
  return acc
}, {})

// Format authors safely
function formatAuthors(authors) {
  const arr = Array.isArray(authors) ? authors : [authors]
  if (arr.length === 1) return arr[0]
  if (arr.length === 2) return arr.join(' & ')
  return arr.slice(0, -1).join(', ') + ' & ' + arr[arr.length - 1]
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

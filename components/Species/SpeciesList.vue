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

        <!-- LOOP families -->
        <template v-for="(subfamilies, family) in groupedSpecies" :key="family">

          <!-- FAMILY -->
          <h3 class="text-xl font-bold mt-6 mb-2 text-amber-300">
            {{ family }}
          </h3>

          <!-- LOOP subfamilies within family -->
          <template v-for="(speciesArray, subfamily) in subfamilies" :key="subfamily">

            <!-- SUBFAMILY -->
            <h4 class="text-lg font-semibold mt-3 mb-1 text-gray-300 ml-2">
              {{ subfamily }}
            </h4>

            <!-- SPECIES LIST -->
            <ul class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1 list-disc list-inside ml-4">
              <li
                v-for="species in speciesArray"
                :key="species.name"
                class="hover:text-amber-400 transition cursor-pointer"
              >
                <a :href="species.url" target="_blank" rel="noopener noreferrer">
                  <i>{{ species.name }}</i>
                  <span class="text-sm text-gray-400 ml-1">
                    {{ formatAuthorsAndYear(species.authors, species.year) }}
                  </span>
                </a>
              </li>
            </ul>

          </template>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { speciesPoints } from '@/components/Species/SpeciesData.js'
import { ref } from 'vue'

const isOpen = ref(false)
const toggleList = () => { isOpen.value = !isOpen.value }

///////////////////////////////////////////////////////
// GROUP: Family → Subfamily → alphabetical sorting
///////////////////////////////////////////////////////
const groupedSpecies = speciesPoints.reduce((acc, sp) => {
  if (!acc[sp.family]) acc[sp.family] = {}
  if (!acc[sp.family][sp.subfamily]) acc[sp.family][sp.subfamily] = []
  acc[sp.family][sp.subfamily].push(sp)
  return acc
}, {})

// alphabetical sorting
Object.values(groupedSpecies).forEach(subfamilies => {
  Object.values(subfamilies).forEach(list =>
    list.sort((a, b) => a.name.localeCompare(b.name))
  )
})

///////////////////////////////////////////////////////
// FORMAT SPECIES CITATION — "Dal Pos & Rousse, 2018"
///////////////////////////////////////////////////////
function formatAuthorsAndYear(authors, year) {
  const arr = Array.isArray(authors) ? authors : [authors]
  const formattedAuthors = arr.length <= 2
    ? arr.join(' & ')
    : arr.slice(0, -1).join(', ') + ' & ' + arr[arr.length - 1]

  return `${formattedAuthors}, ${year}`
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

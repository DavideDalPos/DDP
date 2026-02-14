<template>
  <div class="container mx-auto px-6 my-16 max-w-10xl">

    <!-- Header -->
    <h1 class="text-4xl md:text-5xl font-bold text-amber-400 text-center mb-12">
      Complete Taxa List
    </h1>

    <div>
      <!-- LOOP families -->
      <template v-for="(subfamilies, family) in groupedSpecies" :key="family">

        <!-- FAMILY -->
        <h3 class="text-2xl font-bold mt-12 mb-4 text-gray-700 border-b border-gray-600 pb-2">
          {{ family }}
        </h3>

        <!-- LOOP subfamilies within family -->
        <template v-for="(speciesArray, subfamily) in subfamilies" :key="subfamily">

          <!-- SUBFAMILY -->
          <h4 class="text-xl font-semibold mt-8 mb-2 text-gray-600 ml-2">
            Subfamily {{ subfamily }}
          </h4>

          <!-- SPECIES LIST -->
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 list-disc list-inside ml-4">
            <li
              v-for="species in speciesArray"
              :key="species.name"
              class="flex items-center gap-2"
            >
              <div>
                <i class="font-medium text-amber-600 tracking-wide">{{ species.name }}</i>
                <span class="text-sm text-gray-500 ml-1">
                  {{ formatAuthorsAndYear(species.authors, species.year) }}
                </span>
              </div>

              <!-- Links -->
              <!-- Links -->
<span class="ml-1 flex gap-1 items-center opacity-70">

  <!-- TaxonWorks Icon -->
  <a
    :href="species.url || '#'"
    target="_blank"
    rel="noopener noreferrer"
    title="URL"
    class="transition-transform duration-150"
    :class="species.url ? 'text-red-300 hover:text-red-600' : 'text-gray-500 pointer-events-none'"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4" fill="currentColor">
      <path d="M208 48L96 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l80 0 0 48-80 0c-35.3 0-64-28.7-64-64L32 64C32 28.7 60.7 0 96 0L229.5 0c17 0 33.3 6.7 45.3 18.7L397.3 141.3c12 12 18.7 28.3 18.7 45.3l0 149.5-48 0 0-128-88 0c-39.8 0-72-32.2-72-72l0-88zM348.1 160L256 67.9 256 136c0 13.3 10.7 24 24 24l68.1 0zM240 380l32 0c33.1 0 60 26.9 60 60s-26.9 60-60 60l-12 0 0 28c0 11-9 20-20 20s-20-9-20-20l0-128c0-11 9-20 20-20zm32 80c11 0 20-9 20-20s-9-20-20-20l-12 0 0 40 12 0zm96-80l32 0c28.7 0 52 23.3 52 52l0 64c0 28.7-23.3 52-52 52l-32 0c-11 0-20-9-20-20l0-128c0-11 9-20 20-20zm32 128c6.6 0 12-5.4 12-12l0-64c0-6.6-5.4-12-12-12l-12 0 0 88 12 0zm76-108c0-11 9-20 20-20l48 0c11 0 20 9 20 20s-9 20-20 20l-28 0 0 24 28 0c11 0 20 9 20 20s-9 20-20 20l-28 0 0 44c0 11-9 20-20 20s-20-9-20-20l0-128z"/>
    </svg>
  </a>

  <!-- Second Icon (blue) -->
  <a
    :href="species.taxonworks || '#'"
    target="_blank"
    rel="noopener noreferrer"
    title="TaxonWorks"
    class="transition-transform duration-150"
    :class="species.taxonworks ? 'text-blue-400 hover:text-blue-600' : 'text-gray-500 pointer-events-none'"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-4 h-4" fill="currentColor">
      <path d="M419.5 96c-16.6 0-32.7 4.5-46.8 12.7-15.8-16-34.2-29.4-54.5-39.5 28.2-24 64.1-37.2 101.3-37.2 86.4 0 156.5 70 156.5 156.5 0 41.5-16.5 81.3-45.8 110.6l-71.1 71.1c-29.3 29.3-69.1 45.8-110.6 45.8-86.4 0-156.5-70-156.5-156.5 0-1.5 0-3 .1-4.5 .5-17.7 15.2-31.6 32.9-31.1s31.6 15.2 31.1 32.9c0 .9 0 1.8 0 2.6 0 51.1 41.4 92.5 92.5 92.5 24.5 0 48-9.7 65.4-27.1l71.1-71.1c17.3-17.3 27.1-40.9 27.1-65.4 0-51.1-41.4-92.5-92.5-92.5zM275.2 173.3c-1.9-.8-3.8-1.9-5.5-3.1-12.6-6.5-27-10.2-42.1-10.2-24.5 0-48 9.7-65.4 27.1L91.1 258.2c-17.3 17.3-27.1 40.9-27.1 65.4 0 51.1 41.4 92.5 92.5 92.5 16.5 0 32.6-4.4 46.7-12.6 15.8 16 34.2 29.4 54.6 39.5-28.2 23.9-64 37.2-101.3 37.2-86.4 0-156.5-70-156.5-156.5 0-41.5 16.5-81.3 45.8-110.6l71.1-71.1c29.3-29.3 69.1-45.8 110.6-45.8 86.6 0 156.5 70.6 156.5 156.9 0 1.3 0 2.6 0 3.9-.4 17.7-15.1 31.6-32.8 31.2s-31.6-15.1-31.2-32.8c0-.8 0-1.5 0-2.3 0-33.7-18-63.3-44.8-79.6z"/>
    </svg>
  </a>

</span>

            </li>
          </ul>

        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { speciesPoints } from '@/components/Species/SpeciesData.js'

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

<template>
  <section>
    <div class="container mx-auto px-6 my-16 max-w-9xl">
      <h1 class="text-4xl font-extrabold mb-2 text-gray-700">Publications</h1>

      <!-- Total publications count -->
      <h3 class="text-lg font-medium mb-6 text-gray-600">
        Total publications: {{ totalPublications }}
      </h3>

      <template v-for="[year, pubs] in grouped" :key="year">
        <h2 class="text-2xl font-bold mt-10 mb-4 text-gray-600">{{ year }}</h2>
        <ol class="list-decimal list-inside marker:text-gray-400 marker:text-xl text-justify">
          <li
            v-for="(publication, index) in pubs"
            :key="publication._path"
            class="publication-entry pb-4"
          >
            <span
              v-html="formatAuthors(publication.meta.authors)"
              class="text-gray-800"
            ></span>
            <span class="text-gray-600">
              ({{ new Date(publication.meta.date).getFullYear() }}).
            </span>
            <NuxtLink
              :to="publication.path"> <span
              class="font-semibold text-gray-800 hover:text-gray-900 hover:underline transition-colors duration-300"
              v-html="publication.title"></span>
            </NuxtLink>.
            <span class="text-gray-700 italic">
              {{ publication.meta.journal }},
              {{ publication.meta.volume }}<span v-if="publication.meta.issue">({{ publication.meta.issue }})</span>,
              {{ publication.meta.pagination }}.
            </span>
            <a
              v-if="publication.meta.doi"
              :href="publication.meta.doi"
              target="_blank"
              rel="noopener noreferrer"
              class="text-quinary hover:text-blue-800 hover:underline"
            >{{ publication.meta.doi }}</a>

            <!-- Gray line between items except last -->
            <hr
              v-if="index < pubs.length - 1"
              class="border-t border-gray-300 mt-4 w-[98%] mx-auto"
            />
          </li>
        </ol>
      </template>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()

const { data } = await useAsyncData(route.path, () => {
  return queryCollection('publications').all()
})

// Format author names and bold "Dal Pos, D."
function formatAuthors(authors) {
  return authors
    .map(({ first_name, last_name }) => {
      const initials = first_name
        .split(' ')
        .map(n => n[0] + '.')
        .join(' ')

      const fullName = `${last_name}, ${initials}`
      const myName = 'Dal Pos, D.'

      if (fullName === myName) {
        return `<strong>${fullName}</strong>`
      }
      return fullName
    })
    .join(' & ')
}

// Group by year and sort within each year by descending date (Dec → Jan)
const grouped = computed(() => {
  const groups = {}

  for (const pub of data.value) {
    const date = new Date(pub.meta.date)
    const year = date.getFullYear()

    if (!groups[year]) groups[year] = []
    groups[year].push(pub)
  }

  // Sort each group by descending date
  for (const year in groups) {
    groups[year].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
  }

  // Sort years descending
  return Object.entries(groups).sort((a, b) => b[0] - a[0])
})

// Total number of publications
const totalPublications = computed(() => data.value?.length || 0)
</script>

<style scoped>
.publication-entry {
  text-indent: -2rem;
  padding-left: 4rem;
  line-height: 1.85;
}
</style>

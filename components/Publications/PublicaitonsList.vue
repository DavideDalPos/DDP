<template>
  <section>
    <div class="container mx-auto px-6 my-16 max-w-9xl">
      <h1 class="text-4xl font-extrabold mb-2 text-gray-700">Publications</h1>

      <h3 class="text-lg font-medium mb-6 text-gray-600">
        Total publications: {{ filteredData.length }}
      </h3>

      <!-- Search Input -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by title, journal, or author"
        class="w-full p-2 mb-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      <template v-for="[year, pubs] in grouped" :key="year">
        <!-- Sticky Year Header -->
        <h2
          class="text-2xl font-bold mb-4 text-tertiary sticky top-16 z-10 bg-white py-2 border-b border-gray-200"
        >
          {{ year }}
        </h2>

        <ol class="list-decimal list-inside marker:text-gray-400 marker:text-xl text-justify">
          <li
            v-for="(publication, index) in pubs"
            :key="publication._path"
            class="pb-6 -ml-8 pl-8 relative"
            itemscope
            itemtype="https://schema.org/ScholarlyArticle"
          >
            <span
              v-html="formatAuthors(publication.meta.authors)"
              class="text-gray-800"
              itemprop="author"
            ></span>

            <span class="text-gray-600" itemprop="datePublished">
              ({{ new Date(publication.meta.date).getFullYear() }}).
            </span>

            <span
              class="text-md text-gray-800"
              itemprop="name"
              v-html="publication.title"
            ></span>.

            <span class="text-gray-700 italic" itemprop="isPartOf">
              {{ publication.meta.journal }},
              {{ publication.meta.volume }}<span v-if="publication.meta.issue">({{ publication.meta.issue }})</span>,
              {{ publication.meta.pagination }}.
            </span>

            <span>
              <a
                v-if="publication.meta.doi"
                :href="publication.meta.doi"
                target="_blank"
                rel="noopener noreferrer"
                class="text-emerald-700 hover:text-blue-800 hover:underline"
                itemprop="identifier"
              >
                {{ publication.meta.doi }}
              </a>

              <span v-if="publication.meta.pdf">
                <span class="mx-1 text-gray-400">|</span>
                [<a
                  :href="publication.meta.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-quaternary font-bold hover:text-blue-800 hover:underline"
                >
                  PDF
                </a>]
              </span>

              <span class="mx-1 text-gray-400">|</span>
              [<NuxtLink
                :to="publication.path"
                class="font-bold text-quaternary hover:text-blue-800 hover:underline"
              >
                View Publication
              </NuxtLink>]
            </span>

            <!-- Optional horizontal rule -->

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

// Search
const searchQuery = ref('')

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  const q = searchQuery.value.toLowerCase()
  return data.value.filter(pub => {
    const text = `${pub.title} ${pub.meta.journal} ${pub.meta.authors.map(a => a.last_name).join(' ')}`.toLowerCase()
    return text.includes(q)
  })
})

// Format authors, bold your name
function formatAuthors(authors) {
  return authors
    .map(({ first_name, last_name }) => {
      const initials = first_name
        .split(' ')
        .map(n => n[0] + '.')
        .join(' ')
      const fullName = `${last_name}, ${initials}`
      return fullName === 'Dal Pos, D.' ? `<strong>${fullName}</strong>` : fullName
    })
    .join(' & ')
}

// Group by year and sort by date
const grouped = computed(() => {
  const groups = {}

  for (const pub of filteredData.value) {
    const year = new Date(pub.meta.date).getFullYear()
    if (!groups[year]) groups[year] = []
    groups[year].push(pub)
  }

  for (const year in groups) {
    groups[year].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
  }

  return Object.entries(groups).sort((a, b) => b[0] - a[0])
})
</script>

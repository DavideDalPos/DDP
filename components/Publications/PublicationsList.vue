<template>
  <section>
    <div class="container mx-auto px-6 my-16 max-w-5xl">
      <h1 class="text-4xl font-extrabold mb-2 text-gray-700">Publications</h1>

      <h3 class="text-lg font-medium mb-6 text-gray-600">
        Total publications: {{ filteredData.length }}
      </h3>

      <!-- Search -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by title, journal, or author"
        class="w-full p-2 mb-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />

      <template v-for="[year, pubs] in grouped" :key="year">
        <h2
          class="text-2xl font-bold mb-4 text-gray-600 sticky top-16 z-10 bg-white py-2 border-b border-gray-200"
        >
          {{ year }}
        </h2>

        <ol class="list-decimal list-inside marker:text-gray-400 marker:text-xl">
          <li
            v-for="(publication, index) in pubs"
            :key="publication._path"
            class="pb-6 -ml-8 pl-8 relative text-sm leading-relaxed"
            itemscope
            itemtype="https://schema.org/ScholarlyArticle"
          >
            <!-- Authors -->
            <span
              v-html="formatAuthors(publication.meta.authors)"
              class="text-gray-800"
              itemprop="author"
            ></span>

            <!-- Year -->
            <span class="text-gray-600" itemprop="datePublished">
              ({{ new Date(publication.meta.date).getFullYear() }}).
            </span>

            <!-- Title -->
            <NuxtLink
              :to="publication.path"
              class="ml-1 text-base font-medium text-gray-800 hover:underline hover:decoration-gray-400 transition"
              itemprop="name"
              title="View publication"
            >
              <span v-html="publication.title"></span>
            </NuxtLink>.

            <!-- Journal info -->
            <span class="text-gray-800 italic" itemprop="isPartOf">
              {{ publication.meta.journal }},
              {{ publication.meta.volume }}
              <span v-if="publication.meta.issue">({{ publication.meta.issue }})</span>,
              {{ publication.meta.pagination }}.
            </span>

            <!-- DOI as icon + link -->
            <span
              v-if="publication.meta.doi"
              class="ml-3 inline-flex items-center text-gray-600 text-xs"
            >
              <svg
                class="w-4 h-4 mr-1 text-gray-500"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M10 14l2-2-2-2" />
                <path d="M14 10l-2 2 2 2" />
                <path d="M15 12H9" />
              </svg>
              <a
                :href="publication.meta.doi"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:underline"
                title="DOI link"
              >
                doi.org/{{ publication.meta.doi.replace('https://doi.org/', '') }}
              </a>
            </span>

            <!-- NEW LINE BELOW for PDF / Details -->
            <div class="mt-1 flex gap-1 text-xs text-gray-700">
              <!-- PDF -->
              <a
                v-if="publication.meta.pdf"
                :href="publication.meta.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center border border-gray-300 rounded-md px-3 py-1 gap-1 hover:text-gray-900 transition"
                title="Download PDF"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                PDF
              </a>

              <!-- Details -->
              <NuxtLink
                :to="publication.path"
                class="inline-flex border border-gray-300 rounded-md px-3 py-1 items-center gap-1 hover:text-gray-900 transition"
                title="View full publication"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
                  />
                </svg>
                Details
              </NuxtLink>
            </div>
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

const searchQuery = ref('')

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  const q = searchQuery.value.toLowerCase()
  return data.value.filter((pub) => {
    const text = `${pub.title} ${pub.meta.journal} ${pub.meta.authors
      .map((a) => a.last_name)
      .join(' ')}`.toLowerCase()
    return text.includes(q)
  })
})

function formatAuthors(authors) {
  return authors
    .map(({ first_name, last_name }) => {
      const initials = first_name
        .split(' ')
        .map((n) => n[0] + '.')
        .join(' ')
      const fullName = `${last_name}, ${initials}`
      return fullName === 'Dal Pos, D.' ? `<strong>${fullName}</strong>` : fullName
    })
    .join(' & ')
}

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

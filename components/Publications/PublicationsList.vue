<template>
  <section class=" text-gray-200">
    <div class="bg-gray-700 container mx-auto px-6 my-16 max-w-6xl">
      <h1 class="text-4xl font-extrabold mb-2 text-white">Publications</h1>

      <h3 class="text-lg font-medium mb-6 text-gray-300">
        Total publications: {{ filteredData.length }}
      </h3>

      <!-- Search -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by title, journal, or author"
        class="w-full p-2 mb-10 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      <template v-for="[year, pubs] in grouped" :key="year">
        <h2
          class="text-2xl font-bold mb-4 text-amber-400 py-2 border-b border-gray-700"
        >
          {{ year }}
        </h2>

        <ol class="list-decimal list-inside marker:text-gray-400 marker:text-xl">
          <li
            v-for="(publication, index) in pubs"
            :key="publication._path"
            class="pt-4 pb-4 pl-6 relative text-sm leading-relaxed hover:bg-gray-800 transition rounded-md"
            itemscope
            itemtype="https://schema.org/ScholarlyArticle"
          >
            <!-- Authors -->
            <span
              v-html="formatAuthors(publication.meta.authors)"
              class="text-gray-200"
              itemprop="author"
            ></span>

            <!-- Year -->
            <span class="text-gray-400 ml-1" itemprop="datePublished">
              ({{ new Date(publication.meta.date).getFullYear() }}).
            </span>

            <!-- Title -->
            <NuxtLink
              :to="publication.path"
              class="ml-1 text-base font-medium text-white hover:underline hover:decoration-amber-400 transition"
              itemprop="name"
              title="View publication"
              target="_blank"
            >
              <span v-html="publication.title"></span>
            </NuxtLink>.

            <!-- Journal info -->
            <span class="text-gray-300 italic ml-1" itemprop="isPartOf">
              {{ publication.meta.journal }}, {{ publication.meta.volume }}
              <span v-if="publication.meta.issue">({{ publication.meta.issue }})</span>,
              {{ publication.meta.pagination }}.
            </span>

            <!-- DOI (inline) -->
<span
  v-if="publication.meta.doi"
  class="ml-1 inline-flex items-center text-gray-400 text-[0.85rem] align-baseline hover:bg-gray-800 px-1 rounded transition"
>
  <span>doi:</span>
  <a
    :href="publication.meta.doi"
    target="_blank"
    rel="noopener noreferrer"
    class="hover:underline text-amber-400 ml-1"
  >
    {{ publication.meta.doi.replace('https://doi.org/', '') }}
  </a>
</span>


            <!-- Buttons (PDF / Details) -->
            <div class="mt-2 flex gap-2 text-[0.75rem] text-gray-300">
              <a
                v-if="publication.meta.pdf"
                :href="publication.meta.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center border border-red-400 rounded-lg px-3 py-1.5 gap-1 hover:bg-amber-400 hover:text-gray-900 transition shadow-md"
                title="Download PDF"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                PDF
              </a>

              <NuxtLink
                :to="publication.path"
                class="inline-flex items-center border border-amber-400 rounded-lg px-3 py-1.5 gap-1 hover:bg-amber-400 hover:text-gray-900 transition shadow-md"
                title="View full publication"
                target="_blank"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z" />
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
  const formatted = authors.map(({ first_name, last_name }) => {
    const initials = first_name.split(' ').map((n) => n[0] + '.').join(' ')
    const full = `${last_name}, ${initials}`

    return full === 'Dal Pos, D.'
      ? `<span class="text-amber-400 font-bold">${full}</span>` // highlight you
      : full
  })

  if (formatted.length <= 2) {
    return formatted.join(' & ')
  }

  return formatted.slice(0, -1).join(', ') + ' & ' + formatted.at(-1)
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

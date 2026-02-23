<template>
  <section>
    <div class="container mx-auto px-2 my-16 max-w-5xl">

      <!-- Card Container -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-md p-6 w-full max-h-[500px] flex flex-col">

        <!-- Card Heading (fixed) -->
        <h3 class="text-gray-800 font-bold text-lg mb-4 flex-shrink-0">
          Relevant Publications
        </h3>

        <!-- Scrollable Grid/List -->
        <div class="overflow-y-auto flex-1 pr-2 grid grid-cols-1 gap-4">
          <div
            v-for="(publication, index) in filteredPublications"
            :key="publication._path"
            class="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition flex flex-col gap-1"
            itemscope
            itemtype="https://schema.org/ScholarlyArticle"
          >
            <!-- Title + Year -->
            <NuxtLink
              :to="publication.path"
              class="font-semibold text-gray-900 hover:text-amber-400 hover:underline text-sm sm:text-base"
              itemprop="name"
              title="View publication"
              target="_blank"
            >
              <span v-html="publication.title"></span>
            </NuxtLink>
            <span class="text-gray-500 text-xs sm:text-sm">({{ new Date(publication.meta.date).getFullYear() }})</span>

            <!-- Authors -->
            <span
              v-html="formatAuthors(publication.meta.authors)"
              class="text-gray-700 text-xs sm:text-sm"
              itemprop="author"
            ></span>

            <!-- Journal / DOI -->
            <div class="text-gray-600 text-xs sm:text-sm italic flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-0.5">
              <span itemprop="isPartOf">
                {{ publication.meta.journal }}{{ publication.meta.volume ? `, ${publication.meta.volume}` : '' }}
                <span v-if="publication.meta.issue">({{ publication.meta.issue }})</span>,
                {{ publication.meta.pagination }}.
              </span>
        <span v-if="publication.meta.doi" class="text-amber-600 hover:text-amber-700">
          <a
            :href="publication.meta.doi.startsWith('http') ? publication.meta.doi : 'https://doi.org/' + publication.meta.doi"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline"
          >
            https://doi.org/{{ publication.meta.doi.replace('https://doi.org/', '') }}
          </a>
        </span>
            </div>

            <!-- Buttons -->
            <div class="flex gap-2 mt-2 text-xs">
              <a
                v-if="publication.meta.pdf"
                :href="publication.meta.pdf"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center border border-gray-300 rounded-full px-2 py-0.5 gap-1 text-gray-800 hover:bg-amber-100 hover:text-amber-600 transition shadow-sm"
                title="Download PDF"
              >
                PDF
              </a>

              <NuxtLink
                :to="publication.path"
                class="inline-flex border border-gray-300 rounded-full px-2 py-0.5 items-center gap-1 text-gray-800 hover:bg-amber-100 hover:text-amber-600 transition shadow-sm"
                title="View full publication"
                target="_blank"
              >
                Details
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const { data } = await useAsyncData('publications', () =>
  queryCollection('publications').all()
)

// Filter by category AND sort by date descending
const filteredPublications = computed(() => {
  return (
    data.value
      ?.filter(pub => pub.meta?.category?.includes('Collection'))
      .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date)) || []
  )
})

function formatAuthors(authors) {
  const formatted = authors.map(({ first_name, last_name }) => {
    const initials = first_name.split(' ').map(n => n[0] + '.').join(' ')
    const full = `${last_name}, ${initials}`
    return full === 'Dal Pos, D.'
      ? `<span class="text-gray-800 underline font-bold">${full}</span>`
      : full
  })

  if (formatted.length <= 2) return formatted.join(' & ')
  return formatted.slice(0, -1).join(', ') + ' & ' + formatted.at(-1)
}
</script>
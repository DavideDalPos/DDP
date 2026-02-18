<template>
  <section>
    <div class="container mx-auto px-6 my-16 max-w-5xl">

      <!-- Card Container -->
      <div class="bg-white border border-gray-300 rounded-xl shadow-md p-6">

        <!-- Heading -->
        <h3 class="text-amber-600 font-bold text-lg mb-6">
          Relevant Publications – Taxonomy
        </h3>

        <ol class="list-decimal list-inside marker:text-amber-400 marker:text-lg space-y-6">
          <li
            v-for="(publication, index) in filteredPublications"
            :key="publication._path"
            class="relative text-gray-800 text-sm leading-relaxed pl-4"
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
            <span class="text-gray-500" itemprop="datePublished">
              ({{ new Date(publication.meta.date).getFullYear() }}).
            </span>

            <!-- Title -->
            <NuxtLink
              :to="publication.path"
              class="ml-1 text-base font-medium text-gray-900 hover:text-amber-400 hover:underline transition"
              itemprop="name"
              title="View publication"
              target="_blank"
            >
              <span v-html="publication.title"></span>
            </NuxtLink>.

            <!-- Journal info -->
            <span class="text-gray-600 italic" itemprop="isPartOf">
              {{ publication.meta.journal }},
              {{ publication.meta.volume }}
              <span v-if="publication.meta.issue">({{ publication.meta.issue }})</span>,
              {{ publication.meta.pagination }}.
            </span>

            <!-- DOI link -->
            <span
              v-if="publication.meta.doi"
              class="ml-3 inline-flex items-center text-amber-400 text-xs"
            >
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

            <!-- PDF / Details Buttons -->
            <div class="mt-2 flex gap-2 text-xs">
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
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
const { data } = await useAsyncData('publications', () =>
  queryCollection('publications').all()
)

// Filter by category AND sort by date descending (most recent first)
const filteredPublications = computed(() => {
  return (
    data.value
      ?.filter(pub => pub.meta?.category?.includes('Taxonomy'))
      .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date)) || []
  )
})

function formatAuthors(authors) {
  const formatted = authors.map(({ first_name, last_name }) => {
    const initials = first_name.split(' ').map(n => n[0] + '.').join(' ')
    const full = `${last_name}, ${initials}`
    return full === 'Dal Pos, D.'
      ? `<span class="text-amber-700 font-bold">${full}</span>`
      : full
  })

  if (formatted.length <= 2) return formatted.join(' & ')
  return formatted.slice(0, -1).join(', ') + ' & ' + formatted.at(-1)
}

// Helper function to highlight the year
function formatYear(date) {
  const year = new Date(date).getFullYear()
  return `<span class="text-amber-400 font-semibold">(${year})</span>`
}
</script>


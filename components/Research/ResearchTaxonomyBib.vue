<template>
  <section>
    <div class="container mx-auto px-6 my-16 max-w-5xl">
      <!-- Heading -->
      <h1 class="text-xl font-semibold mb-6 text-white">
        Relevant Publications
      </h1>

      <ol class="list-decimal list-inside marker:text-amber-400 marker:text-xl">
        <li
          v-for="(publication, index) in filteredPublications"
          :key="publication._path"
          class="pb-6 -ml-8 pl-8 relative text-sm leading-relaxed"
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
          <span class="text-gray-400" itemprop="datePublished">
            ({{ new Date(publication.meta.date).getFullYear() }}).
          </span>

          <!-- Title -->
          <NuxtLink
            :to="publication.path"
            class="ml-1 text-base font-medium text-white hover:underline hover:text-amber-400 transition"
            itemprop="name"
            title="View publication"
          >
            <span v-html="publication.title"></span>
          </NuxtLink>.

          <!-- Journal info -->
          <span class="text-gray-300 italic" itemprop="isPartOf">
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

          <!-- PDF / Details -->
          <div class="mt-1 flex gap-1 text-xs text-gray-400">
            <!-- PDF -->
            <a
              v-if="publication.meta.pdf"
              :href="publication.meta.pdf"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center border border-gray-600 rounded-md px-3 py-1 gap-1 hover:bg-gray-700 hover:text-amber-400 transition shadow-md"
              title="Download PDF"
            >
              PDF
            </a>

            <!-- Details -->
            <NuxtLink
              :to="publication.path"
              class="inline-flex border border-gray-600 rounded-md px-3 py-1 items-center gap-1 hover:bg-gray-700 hover:text-amber-400 transition shadow-md"
              title="View full publication"
            >
              Details
            </NuxtLink>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>


<script setup>
const { data } = await useAsyncData('publications', () =>
  queryCollection('publications').all()
)

// Filter publications by category "Taxonomy"
const filteredPublications = computed(() =>
  data.value?.filter(pub => pub.meta?.category?.includes('Taxonomy')) || []
)

// Helper to format authors
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
</script>

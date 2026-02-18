<template>
  <section class="bg-gray-50 text-gray-800 py-16">
    <div class="container mx-auto px-6 max-w-6xl">
      <h1 class="text-4xl font-extrabold mb-12 text-gray-900">News</h1>

      <template v-for="[year, items] in grouped" :key="year">
        <h2 class="text-3xl font-bold mb-8 text-amber-600 border-b border-amber-300 pb-2 mt-10">
          {{ year }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="news in items" :key="news.path || news.title">
            <NuxtLink
              v-if="news.meta.clickable"
              :to="news.path"
              class="block p-6 bg-white border border-gray-300 rounded-2xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 group"
            >
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold text-amber-600 group-hover:text-amber-700">
                  {{ news.title }}
                </h3>
                <span
                  v-if="news.meta.categories?.length"
                  class="text-xs font-bold px-3 py-1 rounded-full"
                  :style="getBadgeStyle(news.meta.categories[0])"
                >
                  {{ news.meta.categories[0] }}
                </span>
              </div>

              <p class="text-gray-500 text-sm mt-2">
                {{ new Date(news.meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </p>

              <p v-if="news.description" class="mt-3 text-gray-700 text-sm line-clamp-4" v-html="news.description"></p>

              <span
                v-if="news.meta.clickable"
                class="mt-4 inline-block text-xs font-bold text-white bg-indigo-300 px-3 py-1 rounded group-hover:bg-amber-600"
              >
                Read More
              </span>
            </NuxtLink>

            <div
              v-else
              class="p-6 bg-white border border-gray-300 rounded-2xl shadow-sm"
            >
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold text-amber-600">{{ news.title }}</h3>
                <span
                  v-if="news.meta.categories?.length"
                  class="text-xs font-bold px-3 py-1 rounded-full"
                  :style="getBadgeStyle(news.meta.categories[0])"
                >
                  {{ news.meta.categories[0] }}
                </span>
              </div>

              <p class="text-gray-500 text-sm mt-2">
                {{ new Date(news.meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </p>

              <p v-if="news.description" class="mt-3 text-gray-700 text-sm line-clamp-4" v-html="news.description"></p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()

const { data } = await useAsyncData(route.path, () => queryCollection('news').all())

const searchQuery = ref('')

// Filter by search query
const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  const q = searchQuery.value.toLowerCase()
  return data.value.filter(item => item.title.toLowerCase().includes(q))
})

// Group by year
const grouped = computed(() => {
  const groups = {}
  for (const item of filteredData.value) {
    const year = new Date(item.meta.date).getFullYear()
    if (!groups[year]) groups[year] = []
    groups[year].push(item)
  }
  // Sort within each year (newest first)
  for (const year in groups) {
    groups[year].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
  }
  return Object.entries(groups).sort((a, b) => b[0] - a[0])
})

// Dynamic Earth Tones badge colors
function getBadgeStyle(category) {
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = (hash % 60) + 20  // Earth tones: 20–80
  return {
    backgroundColor: `hsl(${hue}, 60%, 85%)`, // soft pastel
    color: `hsl(${hue}, 60%, 25%)`            // darker text
  }
}
</script>

<style scoped>
/* Tailwind's line-clamp for truncating descriptions */
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>

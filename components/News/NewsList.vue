<template>
  <section class="bg-gray-900 text-gray-200">
    <div class="container mx-auto px-6 my-16 max-w-5xl">
      <h1 class="text-4xl font-extrabold mb-4 text-white">News</h1>

      <template v-for="[year, items] in grouped" :key="year">
        <!-- Year header -->
        <h2 class="text-2xl font-bold mb-6 text-amber-400 py-2 border-b border-gray-700">
          {{ year }}
        </h2>

        <ul class="space-y-4">
          <li
            v-for="news in items"
            :key="news._path"
            class="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition border-l-4 border-amber-400"
          >
            <div class="flex flex-col md:flex-row md:justify-between md:items-center">
              <!-- Left: Title + Category/NEW badges -->
              <div class="flex items-center gap-2 flex-wrap">
                <!-- Title -->
                <p class="text-lg font-semibold text-gray-200">{{ news.title }}</p>

                <!-- Category badge -->
<!-- Category badge -->
<span
  v-if="news.meta.categories && news.meta.categories.length > 0"
  :class="[
    'text-xs font-bold px-2 py-0.5 rounded',
    news.meta.categories[0] === 'Milestone'
      ? 'bg-green-500 text-white'
      : 'bg-amber-400 text-gray-900'
  ]"
>
  {{ news.meta.categories[0] }}
</span>


                <!-- NEW badge for recent posts -->
                <span
                  v-if="isNew(news.meta.date)"
                  class="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded"
                >
                  NEW
                </span>
              </div>

              <!-- Right: Date -->
              <span class="text-gray-400 mt-2 md:mt-0">
                {{ new Date(news.meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </span>
            </div>

            <!-- Optional description with HTML support -->
            <p v-if="news.description" class="mt-2 text-gray-300" v-html="news.description"></p>
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()

const { data } = await useAsyncData(route.path, () => {
  return queryCollection('news').all()
})

const searchQuery = ref('')

// Filter by search query
const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  const q = searchQuery.value.toLowerCase()
  return data.value.filter((item) => item.title.toLowerCase().includes(q))
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

// Highlight news from the last 7 days
function isNew(dateStr) {
  const newsDate = new Date(dateStr)
  const today = new Date()
  const diff = (today - newsDate) / (1000 * 60 * 60 * 24)
  return diff <= 7
}
</script>

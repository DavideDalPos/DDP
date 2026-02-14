<template>
  <section class="text-gray-200">
    <div class="container mx-auto px-6 my-16 max-w-5xl">
      <h1 class="text-4xl font-extrabold mb-4 text-gray-700">News</h1>

      <template v-for="[year, items] in grouped" :key="year">
        <!-- Year header -->
        <h2 class="text-2xl font-bold mb-6 text-amber-600 py-2 border-b border-gray-700">
          {{ year }}
        </h2>

        <ul class="space-y-4">
          <li v-for="news in items" :key="news.path || news.title">

            <!-- Clickable -->
            <NuxtLink
              v-if="news.meta.clickable"
              :to="news.path"
              class="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition border-l-4 border-amber-400 cursor-pointer"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                <!-- Left: Title + Category/NEW badges -->
                <div class="flex items-center gap-2 flex-wrap">
                  <!-- Title -->
                  <p class="text-lg font-semibold text-amber-400">{{ news.title }}</p>

                  <!-- Category badge -->
<!-- Category badge -->
<span
  v-if="news.meta.categories && news.meta.categories.length > 0"
  :class="[
    'text-[10px] font-semibold px-2 py-0.5 rounded-full', // pill shape
    getBadgeColor(news.meta.categories[0])
  ]"
>
  {{ news.meta.categories[0] }}
</span>

                </div>

                <!-- Right: Date -->
                <span class="text-gray-400 mt-2 md:mt-0">
                  {{ new Date(news.meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}
                </span>
              </div>

              <!-- Description -->
<div class="mt-2 flex justify-between items-start">
  <!-- Description on the left -->
  <p v-if="news.description" class="text-gray-300" v-html="news.description"></p>

  <!-- Read More badge on the right -->
  <span
    v-if="news.meta.clickable"
    class="text-xs font-bold text-white bg-red-900 px-2 py-0.5 rounded ml-4 flex-shrink-0"
  >
    Read More
  </span>
</div>

            </NuxtLink>

            <!-- Non-clickable -->
            <div
              v-else
              class="block bg-gray-800 rounded-lg p-4 border-l-4 border-amber-400"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                <!-- Left: Title + Category/NEW badges -->
                <div class="flex items-center gap-2 flex-wrap">
                  <!-- Title -->
                  <p class="text-lg font-semibold text-amber-400">{{ news.title }}</p>

                  <!-- Category badge -->
                  <span
  v-if="news.meta.categories && news.meta.categories.length > 0"
  :class="[
    'text-[10px] font-semibold px-2 py-0.5 rounded-full', // pill shape
    getBadgeColor(news.meta.categories[0])
  ]"
>
  {{ news.meta.categories[0] }}
</span>
                </div>

                <!-- Right: Date -->
                <span class="text-gray-400 mt-2 md:mt-0">
                  {{ new Date(news.meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}
                </span>
              </div>

              <!-- Description -->
              <p v-if="news.description" class="mt-2 text-gray-300" v-html="news.description"></p>
            </div>

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

function getBadgeColor(category) {
  switch(category) {
    case 'Milestone':
      return 'bg-green-200 text-green-900'
    case 'Publication':
      return 'bg-red-200 text-red-900'
    case 'New Job':
    case 'Job':
      return 'bg-amber-200 text-amber-900'
    default:
      return 'bg-gray-200 text-gray-900'
  }
}


</script>

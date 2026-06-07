<template>
  <section class="bg-gray-50 text-gray-800 py-16">
    <div class="container mx-auto px-6 max-w-4xl">
      <h1 class="text-4xl font-extrabold mb-12 text-gray-900">News</h1>

      <div class="relative pl-8">
        <!-- Vertical line -->
        <div class="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <template v-for="[year, items] in grouped" :key="year">
          <!-- Year marker -->
          <div class="relative flex items-center gap-4 mb-6 mt-10 first:mt-0">
            <div class="absolute -left-8 w-4 h-4 rounded-full bg-white border-2 border-amber-500 z-10"></div>
            <h2 class="text-2xl font-bold text-gray-700">{{ year }}</h2>
          </div>

          <div class="flex flex-col gap-4 mb-6">
            <component
              :is="news.meta.clickable ? NuxtLink : 'div'"
              v-for="news in items"
              :key="news.path || news.title"
              :to="news.meta.clickable ? news.path : undefined"
              class="bg-white border border-gray-200 rounded-r-lg p-5 transition hover:shadow-md"
              :style="getCardStyle(news.meta.categories?.[0])"
            >
              <div class="flex justify-between items-start gap-3">
                <h3 class="text-base font-semibold text-gray-900">{{ news.title }}</h3>
                <span
                  v-if="news.meta.categories?.length"
                  class="text-xs px-3 py-1 rounded-full whitespace-nowrap shrink-0"
                  :style="getBadgeStyle(news.meta.categories[0])"
                >
                  {{ news.meta.categories[0] }}
                </span>
              </div>

              <p class="text-sm text-gray-400 mt-1">
                {{ new Date(news.meta.date + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </p>

              <p
                v-if="news.description"
                class="mt-2 text-sm text-gray-600 line-clamp-3"
                v-html="news.description"
              ></p>

              <span
                v-if="news.meta.clickable"
                class="mt-3 inline-block text-xs font-semibold text-amber-700 hover:underline"
              >
                Read more →
              </span>
            </component>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { NuxtLink } from '#components'

const route = useRoute()
const { data } = await useAsyncData(route.path, () => queryCollection('news').all())

const searchQuery = ref('')

const filteredData = computed(() => {
  if (!searchQuery.value) return data.value
  const q = searchQuery.value.toLowerCase()
  return data.value.filter(item => item.title.toLowerCase().includes(q))
})

const grouped = computed(() => {
  const groups = {}
  for (const item of filteredData.value) {
    const year = item.meta.date.split('-')[0]
    if (!groups[year]) groups[year] = []
    groups[year].push(item)
  }
  for (const year in groups) {
    groups[year].sort((a, b) => b.meta.date.localeCompare(a.meta.date))
  }
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
})


function getColors(category) {
  if (!category) category = 'default'
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash)
  }
  hash = Math.abs(hash)
  const hue = (hash * 137.508) % 360
  return {
    border: `hsl(${hue}, 60%, 65%)`,
    bg: `hsl(${hue}, 60%, 92%)`,
    text: `hsl(${hue}, 60%, 30%)`
  }
}

function getCardStyle(category) {
  const { border } = getColors(category)
  return { borderLeft: `4px solid ${border}`, borderRadius: '0 0.5rem 0.5rem 0' }
}

function getBadgeStyle(category) {
  const { bg, text } = getColors(category)
  return { backgroundColor: bg, color: text }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
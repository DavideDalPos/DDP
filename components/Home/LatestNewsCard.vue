<template>
  <section class="w-full bg-white py-12 sm:py-16 md:py-20">
    <div class="max-w-5xl mx-auto px-4">
      <p class="text-center text-[#a85a2e] text-sm font-semibold uppercase tracking-wider mb-2">
        Keeping up
      </p>
      <h2 class="text-center text-[#26333b] text-2xl md:text-3xl font-bold mb-8 sm:mb-10">
        Latest News
      </h2>

      <ul v-if="recentNews.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="item in recentNews" :key="item.link">
          <NuxtLink
            :to="item.link"
            class="group flex h-full flex-col rounded-xl border border-[#3a4b56] bg-[#2b3841] p-5 shadow-sm transition
                   hover:-translate-y-1 hover:border-[#c07a4b] hover:bg-[#26333b] hover:shadow-md
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c07a4b]"
          >
            <time class="text-xs font-medium uppercase tracking-wide text-[#c07a4b]">
              {{ formatDate(item.date) }}
            </time>
<h3
  class="mt-2 font-semibold text-[#eae7dd] leading-snug"
  v-html="item.title"
/>
<p
  v-if="item.excerpt"
  class="mt-2 text-sm text-[#eae7dd]/70 leading-relaxed flex-1"
  v-html="item.excerpt"
/>
          </NuxtLink>
        </li>
      </ul>

      <p v-else class="text-center text-gray-500">
        No news just yet — check back soon.
      </p>

      <div class="mt-8 text-center">
        <NuxtLink to="/news" class="text-sm font-semibold text-[#a85a2e] hover:text-[#86461f]">
          All news →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAsyncData } from '#app'
import { computed } from 'vue'

// Uses the same collection + meta.date shape your header already relies on.
const { data: newsData } = await useAsyncData('home-news', () => queryCollection('news').all())

const recentNews = computed(() => {
  if (!newsData.value?.length) return []
  return [...newsData.value]
    .sort((a, b) => new Date(b.meta?.date) - new Date(a.meta?.date))
    .slice(0, 3)
    .map(item => ({
      // TODO: map these to your actual news frontmatter fields if they differ.
      title: item.title || item.meta?.title || 'Untitled',
      link: item.path || item.meta?.link || '/news',
      date: item.meta?.date,
      excerpt: item.description || item.meta?.description || item.meta?.summary || ''
    }))
})

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>
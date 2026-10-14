<template>
  <section class="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
    <div class="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
      <div>
        <p v-reveal class="kicker">News</p>
        <h2 v-reveal="60" class="mt-5 text-4xl font-semibold">Latest news</h2>
      </div>
      <NuxtLink v-reveal="100" to="/news" class="text-sm font-semibold text-ink underline underline-offset-4 hover:text-accent-deep">All news</NuxtLink>
    </div>

    <ul v-if="recentNews.length" class="mt-10 grid gap-8 md:grid-cols-3">
      <li v-for="(item, i) in recentNews" :key="item.link" v-reveal="i * 80">
        <NuxtLink :to="item.link" class="group flex h-full flex-col">
          <div class="relative mb-5 aspect-[16/9] overflow-hidden rounded-md border border-line bg-paper-2">
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.imageAlt"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <LabMark v-else class="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 opacity-60" body="#15171c" />
          </div>
          <time class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{{ formatDate(item.date) }}</time>
          <h3 class="mt-2 text-xl font-semibold leading-snug group-hover:text-accent-deep" v-html="item.title" />
          <p v-if="item.excerpt" class="mt-2 flex-1 text-sm leading-relaxed text-muted" v-html="item.excerpt" />
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="mt-10 text-muted">No news yet.</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const { data: newsData } = await useAsyncData('home-news', () => queryCollection('news').all())

const recentNews = computed(() => {
  if (!newsData.value?.length) return []
  return [...newsData.value]
    .sort((a, b) => new Date(b.meta?.date) - new Date(a.meta?.date))
    .slice(0, 3)
    .map((item) => ({
      title: item.title || item.meta?.title || 'Untitled',
      link: item.path || '/news',
      date: item.meta?.date,
      image: item.meta?.image || '',
      imageAlt: item.meta?.imageAlt || '',
      excerpt: item.description || item.meta?.summary || ''
    }))
})

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}
</script>

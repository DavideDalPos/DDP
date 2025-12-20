<template>
  <section class=" text-gray-200">
    <!-- Hero Image -->
    <div
      v-if="news.meta.image"
      class="w-full h-96 rounded-lg overflow-hidden mb-6 shadow-lg"
    >
      <img
        :src="news.meta.image.startsWith('/') ? news.meta.image : '/' + news.meta.image"
        :alt="news.meta.imageAlt || 'News image'"
        class="w-full h-full object-cover"
      />
    </div>

    <article class="container mx-auto px-6 max-w-4xl space-y-6">

      <!-- Title -->
      <h1 class="font-serif text-4xl font-bold text-amber-400 leading-tight text-center">
        {{ news.title }}
      </h1>

      <!-- Author & Date -->
      <div class="flex flex-col sm:flex-row sm:justify-center sm:items-center text-gray-400 italic text-sm gap-2">
        <span v-if="news.meta.author">By {{ news.meta.author }}</span>
        <span>{{ formattedDate }}</span>
      </div>

      <!-- Tags (below author/date) -->
      <div v-if="news.meta.tags && news.meta.tags.length" class="flex justify-center flex-wrap gap-2 mt-2">
        <span
          v-for="(tag, i) in news.meta.tags"
          :key="i"
          :class="getTagColorClass(tag)"
          class="text-xs font-semibold px-2 py-1 rounded-full transition"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Summary Box -->
       <div class="bg-gray-700">
      <div v-if="news.meta.summary" class="bg-gray-800 rounded-md p-6 shadow-md border border-gray-600 mt-4">
        <p class="text-gray-100 text-lg italic" v-html="news.meta.summary"></p>
      </div>

      <!-- Main Blog Content -->
      <div v-if="news.meta.blog" class=" prose text-gray-200 mt-4">
        <p v-html="news.meta.blog" class="text-justify"></p>
      </div>

      <!-- Why this matters -->
      <div v-if="news.meta.why" class="bg-gray-800 border border-gray-600 rounded-md p-6 shadow-md mt-4">
        <h3 class="font-semibold text-amber-400 mb-2">Why this matters</h3>
        <p class="text-gray-200 text-justify" v-html="news.meta.why"></p>
      </div>
      </div>
      <!-- Link to Paper -->
      <div v-if="news.meta.link" class="my-6 text-center">
        <a
          :href="news.meta.link"
          target="_blank"
          class="inline-block bg-amber-400 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-amber-300 transition shadow-md"
        >
          Read Full Paper
        </a>
      </div>

      <!-- Back Button -->
      <div class="text-center">
        <button
          type="button"
          class="uppercase flex justify-center gap-2 mx-auto text-amber-400 hover:text-amber-400 transition font-semibold mb-10"
          @click="goBack"
        >
          ← Back
        </button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({ news: Object })
const router = useRouter()

function goBack() {
  if (import.meta.client) {
    if (window.history.length > 1) router.back()
    else router.push('/news')
  }
}

// Tags pastel colors
function getTagColorClass(tag) {
  const colors = {
    Ichneumonidae: 'bg-green-200 text-green-900',
    Sicily: 'bg-yellow-200 text-yellow-900',
    Faunistics: 'bg-purple-200 text-purple-900',
    Biodiversity: 'bg-red-200 text-red-900'
  }
  return colors[tag] || 'bg-gray-200 text-gray-900'
}

// Format date nicely
const formattedDate = computed(() => {
  if (!props.news.meta.date) return ''
  return new Date(props.news.meta.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})
</script>

<style scoped>
.prose p {
  line-height: 1.8;
}
</style>

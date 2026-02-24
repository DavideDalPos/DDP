<template>
  <section class="text-gray-800">
    <article class="container mx-auto px-6 max-w-4xl space-y-6 mt-10">

      <!-- Title -->
      <h1 class="font-serif text-4xl font-bold text-amber-500 leading-tight text-center">
        {{ news.title }}
      </h1>

      <!-- Author & Date -->
      <div class="flex flex-col sm:flex-row sm:justify-center sm:items-center text-gray-500 italic text-sm gap-2">
        <span v-if="news.meta.author">By {{ news.meta.author }}</span>
        <span>{{ formattedDate }}</span>
      </div>

      <!-- Tags -->
      <div v-if="news.meta.tags && news.meta.tags.length" class="flex justify-center flex-wrap gap-2 mt-2">
<span
  v-for="(tag, i) in news.meta.tags"
  :key="i"
  class="text-xs px-2 py-1 rounded-full transition"
  :style="generateTagStyle(tag)"
>
  {{ tag }}
</span>


      </div>

      <!-- Image Below Title -->
      <div v-if="news.meta.image" class="w-full rounded-lg overflow-hidden shadow-md mt-4">
        <img
          :src="news.meta.image.startsWith('/') ? news.meta.image : '/' + news.meta.image"
          :alt="news.meta.imageAlt || 'News image'"
          class="w-full h-auto object-cover"
        />
      </div>

      <!-- Summary Box -->
      <div v-if="news.meta.summary" class="bg-white rounded-md p-6 shadow-sm border border-gray-200 mt-4">
        <p class="text-gray-700 text-center text-lg italic" v-html="news.meta.summary"></p>
      </div>

      <!-- Main Blog Content -->
      <div v-if="news.meta.blog" class="prose prose-gray max-w-none mt-4 text-gray-700">
        <p v-html="news.meta.blog"></p>
      </div>

      <!-- Why this matters -->
      <div v-if="news.meta.why" class="bg-white border border-gray-200 rounded-md p-6 shadow-sm mt-4">
        <h3 class="font-semibold text-amber-400 mb-2">Why this matters</h3>
        <p class="text-gray-700" v-html="news.meta.why"></p>
      </div>

<!-- Links Section -->
<div v-if="news.meta.links && news.meta.links.length" class="my-6 text-center flex flex-col sm:flex-row justify-center gap-4">
  <a
    v-for="(linkObj, index) in news.meta.links"
    :key="index"
    :href="linkObj.url"
    target="_blank"
    class="inline-block bg-[#a7c7e7] text-white font-semibold px-3 py-2 rounded-md hover:bg-amber-300 transition text-sm shadow-md"
  >
    {{ linkObj.text }}
  </a>
</div>


      <!-- Back Button -->
      <div class="text-center">
        <button
          type="button"
          class="uppercase flex justify-center gap-2 mx-auto text-gray-700 hover:underline transition font-semibold mb-10"
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

// Dynamic tag colors
function getTagColorClass(tag) {
  // Simple hash function to generate consistent number per tag
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }
  // Generate HSL color
  const hue = hash % 360
  const pastel = `hsl(${hue}, 60%, 80%)` // light pastel background
  const textHue = hash % 360
  const textColor = `hsl(${textHue}, 60%, 30%)` // dark enough text

  return `bg-[${pastel}] text-[${textColor}]`
}

function generateTagStyle(tag) {
  let hash = 0
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash)
  }

  hash = Math.abs(hash)

  // Golden angle ensures maximum separation
  const hue = (hash * 137.508) % 360

  return {
    backgroundColor: `hsl(${hue}, 60%, 78%)`,
    color: `hsl(${hue}, 65%, 100%)`
  }
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

<template>
  <div
    class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative"
  >
    <!-- Conditional NEW Badge -->
    <span
      v-if="isNew"
      class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold"
    >
      🔥 NEW
    </span>

    <!-- Title -->
    <h3 class="text-xl font-semibold text-indigo-600 mb-2">Publication</h3>
<p class="text-gray-700 mb-2">
      Check out my full list of publications.
    </p>
    <!-- Button -->
    <NuxtLink
      to="/publications"
      class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Explore My Publications
    </NuxtLink>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const latest = ref(null)
const isNew = ref(false)

onMounted(async () => {
  try {
    const pubs = await queryCollection('publications').all()
    if (pubs.length > 0) {
      // Get the latest publication
      latest.value = pubs.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))[0]

      // Check if it was published in the last 30 days
      const now = new Date()
      const pubDate = new Date(latest.value.meta.date)
      const diffDays = (now - pubDate) / (1000 * 60 * 60 * 24)
      isNew.value = diffDays <= 30
    }
  } catch (err) {
    console.error('Error fetching publications:', err)
  }
})
</script>

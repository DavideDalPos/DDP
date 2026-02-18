<template>
  <section class="py-5 border-gray-200">
    <div class="max-w-sm mx-auto px-4 text-center"> <!-- Narrow card -->

      <div 
        class="relative bg-gray-100 rounded-2xl p-4 shadow-lg
               hover:shadow-md transition-shadow duration-500 border border-gray-400 animate-fade-in"
      >

              <!-- Badge -->
        <span class="absolute top-3 left-3 bg-amber-100 text-amber-700 text-[9px] font-semibold 
                     uppercase px-2 py-0.5 rounded-full tracking-wide">
          News
        </span>

        <!-- Content -->
        <h2 class="text-xl font-bold text-gray-800 mb-2 mt-1 flex items-center justify-center gap-2">
          Latest News
          <!-- Flashing NEW button if recent -->
          <span
            v-if="isRecent"
            class="px-2 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-full animate-pulse"
          >
            NEW
          </span>
        </h2>

        <p class="text-gray-600 mb-3 text-xs leading-relaxed">
          Stay updated with recent research updates, publications, datasets, and academic activities.
        </p>

        <NuxtLink
          to="/news"
          class="inline-block px-3 py-1.5 bg-indigo-500 text-white text-xs font-semibold rounded-lg
                 hover:bg-indigo-600 transition duration-300 shadow-sm hover:shadow-md"
        >
          Visit News Page →
        </NuxtLink>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Latest news date
const latestNewsDate = ref('2026-02-11')

// Check if news is within last 14 days
const isRecent = computed(() => {
  const today = new Date()
  const newsDate = new Date(latestNewsDate.value)
  const diffTime = today - newsDate
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays <= 14
})
</script>

<style scoped>
/* Fade-in animation */
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 1s ease forwards; }
</style>

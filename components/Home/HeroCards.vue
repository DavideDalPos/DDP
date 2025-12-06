<template>
  <div class="container mx-auto px-4 mt-12">

    <!-- First Row: Main Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div 
        v-for="card in mainCards" 
        :key="card.title" 
        class="bg-white rounded-2xl shadow-lg p-4 text-center transform hover:scale-105 transition duration-300"
      >
        <h3 class="text-lg font-semibold text-indigo-600 mb-1">{{ card.title }}</h3>

        <template v-if="card.items">
          <ul class="text-gray-700 mb-2 space-y-1 text-sm">
            <li v-for="item in card.items" :key="item">{{ item }}</li>
          </ul>
        </template>
        <template v-else>
          <p class="text-gray-700 mb-2 text-sm">{{ card.description }}</p>
        </template>

        <button class="mt-2 px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
          {{ card.button }}
        </button>
      </div>
    </div>

    <!-- Second Row: Alerts -->
<div class="flex flex-wrap justify-center gap-6 mt-6">
  <NewPublicationAlert />
  <NewsAlert />
</div>



  </div>
</template>

<script setup>
import { mainCards } from '@/components/Home/cardsData.js';
import NewPublicationAlert from '@/components/Home/NewPublicationAlert.vue';
import NewsAlert from '@/components/Home/NewsAlert.vue';
</script>

<style scoped>
/* Optionally reduce card heights even more */
div > .bg-white {
  min-height: 180px; /* adjust to your liking */
}
</style>

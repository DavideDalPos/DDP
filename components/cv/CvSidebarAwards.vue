<template>
  <div class="bg-gray-100 border border-amber-300 p-5 rounded-xl shadow-sm">
    <!-- Main Heading -->
    <h3 class="font-bold mb-4 text-amber-600 text-lg">
      Awards & Funding
      <span class="text-gray-600 text-xs ml-2">
        (Total: ${{ totalAwardValue.toLocaleString() }})
      </span>
    </h3>

    <!-- Grouped Awards -->
    <div v-for="([year, yearGroup]) in groupedAwards" :key="year" class="mb-4">
      <h4 class="font-semibold text-amber-500 mb-2">{{ year }}</h4>
      <ul class="space-y-1">
        <li
          v-for="award in yearGroup"
          :key="award.name + award.org"
          class="flex justify-between items-center py-1.5 px-3 hover:bg-amber-100 transition rounded-md"
        >
          <div class="flex items-center gap-2">
            <!-- Amber star icon -->
            <svg class="w-3 h-3 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09L5.64 12.545 1 8.91l6.061-.545L10 3l2.939 5.365L19 8.91l-4.64 3.635 1.518 5.545z" />
            </svg>
            <span class="text-gray-700 text-sm">
              {{ award.name }} - {{ award.org }}
              <span
                v-if="award.value"
                class="ml-2 text-xs text-amber-800 font-medium bg-amber-200 px-2 py-0.5 rounded-full"
              >
                ${{ award.value.toLocaleString() }}
              </span>
              <span
                v-else-if="award.type"
                class="ml-2 text-xs text-amber-800 font-medium bg-amber-200 px-2 py-0.5 rounded-full"
              >
                {{ award.type }}
              </span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { awards } from './CvAwardsData.js';

// Group awards by year descending
const groupedAwards = computed(() => {
  const groups = {};
  for (const award of awards) {
    const year = Number(award.year);
    if (!groups[year]) groups[year] = [];
    groups[year].push(award);
  }
  return Object.entries(groups).sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));
});

// Total monetary awards
const totalAwardValue = computed(() => {
  return awards
    .filter(a => a.value)
    .reduce((sum, a) => sum + a.value, 0);
});
</script>

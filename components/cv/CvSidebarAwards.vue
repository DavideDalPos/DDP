<template>
  <div class="bg-gray-50 border border-indigo-200 p-5 rounded-xl shadow-sm space-y-6">
    <!-- Awards Section -->
    <div>
      <h3 class="font-bold mb-3 text-amber-700 text-lg">
        Awards
        <span class="text-gray-600 text-xs ml-2">
          (Total: ${{ awardsTotal.toLocaleString() }})
        </span>
      </h3>

      <div v-for="([year, yearGroup]) in groupedAwards" :key="'award-'+year" class="mb-4">
        <h4 class="font-semibold text-amber-600 mb-2">{{ year }}</h4>
        <ul class="space-y-1">
          <li
            v-for="item in yearGroup"
            :key="item.name + item.org"
            class="flex justify-between items-center py-1.5 px-3 rounded-md hover:shadow-md transition"
          >
            <div class="flex items-center gap-2">
              <!-- Star icon -->
              <svg class="w-3 h-3 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09L5.64 12.545 1 8.91l6.061-.545L10 3l2.939 5.365L19 8.91l-4.64 3.635 1.518 5.545z" />
              </svg>
              <span class="text-gray-700 text-sm">
                {{ item.name }} - {{ item.org }}
                <span
                  v-if="item.value"
                  class="ml-2 text-xs font-medium px-2 py-0.5 rounded-full text-amber-700 bg-amber-100"
                >
                  ${{ item.value.toLocaleString() }}
                </span>
                <span
                  v-else-if="item.type"
                  class="ml-2 text-xs font-medium px-2 py-0.5 rounded-full text-amber-700 bg-amber-100"
                >
                  {{ item.type }}
                </span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Funding Section -->
    <div>
      <h3 class="font-bold mb-3 text-teal-700 text-lg">
        Funding
        <span class="text-gray-600 text-xs ml-2">
          (Total: ${{ fundingTotal.toLocaleString() }})
        </span>
      </h3>

      <div v-for="([year, yearGroup]) in groupedFunding" :key="'fund-'+year" class="mb-4">
        <h4 class="font-semibold text-teal-600 mb-2">{{ year }}</h4>
        <ul class="space-y-1">
          <li
            v-for="item in yearGroup"
            :key="item.name + item.org"
            class="flex justify-between items-center py-1.5 px-3 rounded-md hover:shadow-md transition"
          >
            <div class="flex items-center gap-2">
              <!-- Funding icon: money bag -->
<!-- Funding icon: simple dollar sign -->
<svg
  class="w-3 h-3 text-teal-500 flex-shrink-0"
  fill="currentColor"
  viewBox="0 0 20 20"
>
  <text x="10" y="20" text-anchor="middle" font-size="20" font-family="Arial, sans-serif">$</text>
</svg>
              <span class="text-gray-700 text-sm">
                {{ item.name }} - {{ item.org }}
                <span
                  v-if="item.value"
                  class="ml-2 text-xs font-medium px-2 py-0.5 rounded-full text-teal-700 bg-teal-100"
                >
                  ${{ item.value.toLocaleString() }}
                </span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { awards, funding } from './index.js'; // import your data

// Helper: group items by year descending
const groupByYear = (items) => {
  const groups = {};
  for (const item of items) {
    const year = Number(item.year);
    if (!groups[year]) groups[year] = [];
    groups[year].push(item);
  }
  return Object.entries(groups).sort(([a], [b]) => b - a);
};

// Grouped data
const groupedAwards = computed(() => groupByYear(awards));
const groupedFunding = computed(() => groupByYear(funding));

// Totals
const awardsTotal = computed(() =>
  awards.filter(a => a.value).reduce((sum, a) => sum + a.value, 0)
);

const fundingTotal = computed(() =>
  funding.filter(f => f.value).reduce((sum, f) => sum + f.value, 0)
);
</script>
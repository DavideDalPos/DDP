<template>
  <div
    class="border border-gray-300 rounded-xl p-5 bg-gray-100 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
  >
    <!-- Header: title + institution + dates -->
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <div>
        <h3 class="font-bold text-lg text-amber-400">{{ title }}</h3>
        <p class="text-gray-700">{{ institution }}</p>
      </div>
      <p class="text-sm text-gray-600 mt-2 md:mt-0">{{ start }} – {{ end || 'Present' }}</p>
    </div>

    <!-- Description block -->
    <div
      v-if="description"
      class="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-4"
    >
      <p class="text-sm text-amber-600 font-semibold mb-2">Responsibilities:</p>

      <ul v-if="Array.isArray(description)" class="list-disc list-inside space-y-1 text-gray-700 text-sm">
        <li v-for="(item, index) in description" :key="index">{{ item }}</li>
      </ul>

      <p v-else class="text-gray-700 text-sm">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  institution: String,
  start: String,
  end: String,
  description: [String, Array]
});
</script>

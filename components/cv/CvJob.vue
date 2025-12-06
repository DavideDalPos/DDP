<template>
  <div class="border border-gray-600 rounded-lg p-4 bg-gray-800 shadow-sm">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <div>
        <h3 class="font-bold text-lg text-amber-400">{{ title }}</h3>
        <p class="text-gray-300">{{ institution }}</p>
      </div>
      <p class="text-sm text-gray-400 mt-2 md:mt-0">{{ start }} – {{ end || 'Present' }}</p>
    </div>

    <div v-if="description" class="mt-3 bg-gray-700 border border-gray-600 rounded p-3">
      <p class="text-sm text-gray-300 font-medium mb-1">Responsibilities:</p>

      <ul v-if="Array.isArray(description)" class="list-disc list-inside space-y-1 text-gray-300 text-sm">
        <li v-for="(item, index) in description" :key="index">{{ item }}</li>
      </ul>

      <p v-else class="text-gray-300 text-sm">{{ description }}</p>
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

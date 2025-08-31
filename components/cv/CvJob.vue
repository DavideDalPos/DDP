<template>
  <div class="mb-6">
    <p class="font-bold text-lg">
      {{ title }}
      <a
        v-if="link"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="ml-2 text-blue-600 hover:underline text-sm"
      >
        🔗
      </a>
    </p>
    <p class="text-gray-700">{{ institution }}</p>
    <p class="text-sm text-gray-500">{{ start }} - {{ end || 'Present' }}</p>
    <p v-if="role" class="text-gray-600 mt-1">Role: {{ role }}</p>

    <!-- Description as list -->
    <ul v-if="Array.isArray(description)" class="list-disc list-inside text-gray-600 mt-1">
      <li v-for="(item, index) in description" :key="index">{{ item }}</li>
    </ul>

    <p v-else-if="description" class="text-gray-600 mt-1">{{ description }}</p>

    <hr class="my-3 border-gray-300" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  institution: String,
  start: String,
  end: String,
  role: String,
  description: [String, Array],
  link: String
})
</script>

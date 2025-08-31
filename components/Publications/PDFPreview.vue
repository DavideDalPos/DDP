<template>
  <div class="mt-4">
    <iframe
      v-if="pdf"
      :src="pdf"
      width="100%"
      height="600"
      class="border rounded"
    ></iframe>

    <div v-else class="text-center mt-6">
      <p class="mb-3 text-gray-600">
        PDF not available. You can check it on ResearchGate:
      </p>

      <a
        v-if="researchgate"
        :href="researchgate"
        target="_blank"
        rel="noopener noreferrer"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow-lg"
      >
        Requested on ResearchGate
      </a>

      <p v-else class="text-gray-500">
        No ResearchGate link available.
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pdf: String,
  researchgate: String
})
</script>

<template>
  <div v-if="pdf" class="border border-gray-300 rounded-lg overflow-hidden shadow-lg max-w-[65rem] mx-auto mt-12">
    <div class="flex justify-between items-center bg-gray-100 px-4 py-2 border-b border-gray-300">
      <h4 class="text-lg font-semibold text-gray-700">Paper Preview</h4>
      <a
        :href="pdf"
        download
        class="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-500 transition"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
        </svg>
        Download PDF
      </a>
    </div>
    <iframe
      :src="pdf + '#toolbar=0'"
      type="application/pdf"
      width="100%"
      height="600"
      class="block"
    >
      This browser does not support PDFs. Please download the PDF to view it:
      <a :href="pdf">Download PDF</a>
    </iframe>
  </div>
</template>

<script setup>
const props = defineProps({
  pdf: {
    type: String,
    required: false
  }
})
</script>

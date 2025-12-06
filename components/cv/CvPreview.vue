<template>
  <div class="mt-4 max-w-[70rem] mx-auto">
    <!-- Header: Title + Download -->
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-xl italic text-amber-400">Curriculum Vitae</h2>
      <div class="text-right">
        <a
          href="/PDFs/Davide_Dal_Pos_CV.pdf"
          download
          class="text-amber-400 bg-gray-800 shadow-md px-2 py-1 rounded hover:bg-gray-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </a>
        <p class="text-sm text-gray-200 mt-1">Last updated: August 31, 2025</p>
      </div>
    </div>

    <!-- PDF Preview -->
    <iframe
      src="/PDFs/Davide_Dal_Pos_CV.pdf"
      width="100%"
      height="600"
      class="border rounded"
    ></iframe>
  </div>
</template>

<script setup>
// Fully self-contained, no props needed
</script>

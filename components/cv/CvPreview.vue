<template>
  <div class="mt-4 max-w-[70rem] mx-auto">
    <!-- Header: Title + Download -->
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-xl italic text-amber-400">Curriculum Vitae</h2>
      <div class="text-right">
        <a
          href="/PDFs/Davide_Dal_Pos_CV.pdf"
          download
          class="text-amber-600 bg-gray-300 border border-gray-400 shadow-md px-2 py-1 rounded hover:bg-gray-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </a>
        <p class="text-sm text-gray-200 mt-1">
          Last updated: {{ lastUpdated || 'Loading...' }}
        </p>
      </div>
    </div>

    <!-- PDF Preview -->
<iframe
  :src="`/PDFs/Davide_Dal_Pos_CV.pdf?ts=${Date.now()}`"
  width="100%"
  height="600"
  class="border rounded"
></iframe>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// reactive variable for the last updated date
const lastUpdated = ref('')

// GitHub API URL for the latest commit of your PDF
const apiUrl =
  'https://api.github.com/repos/DavideDalPos/DDP/commits?path=public/PDFs/Davide_Dal_Pos_CV.pdf&page=1&per_page=1'

onMounted(async () => {
  try {
    const res = await fetch(apiUrl)
    const data = await res.json()
    if (data.length > 0) {
      const date = new Date(data[0].commit.committer.date)
      lastUpdated.value = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })
    }
  } catch (err) {
    console.error('Error fetching PDF commit date', err)
    lastUpdated.value = 'Unknown'
  }
})
</script>

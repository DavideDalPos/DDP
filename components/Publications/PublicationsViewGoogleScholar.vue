<!-- PublicationViewGoogleScholar.vue -->
<template>
  <div class="w-[24rem] text-gray-700 mb-6">
    <h3 class="text-xl font-semibold mb-2">Google Scholar Citations</h3>

    <p v-if="loading" class="text-gray-400 italic">Loading citations...</p>

    <p v-else-if="error" class="text-red-500 italic">{{ error }}</p>

    <p v-else-if="citationCount !== null"><strong>Citations:</strong> {{ citationCount }}</p>

    <p v-else class="text-gray-400 italic">No citation data available.</p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  doi: {
    type: String,
    required: false,
    default: null
  }
})

const citationCount = ref(null)
const error = ref(null)
const loading = ref(false)

async function fetchCitation(doi, title) {
  loading.value = true
  error.value = null
  citationCount.value = null

  try {
    const payload = doi ? { doi } : { title }
    const res = await fetch('http://localhost:8000/citation_count', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (res.ok) {
      citationCount.value = typeof data.num_citations === 'number' ? data.num_citations : 0
    } else {
      error.value = data.detail || 'Failed to fetch citation data.'
    }
  } catch (e) {
    error.value = 'Network error while fetching citation data.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCitation(props.doi, props.title)
})

watch(() => [props.doi, props.title], ([newDoi, newTitle]) => {
  if (newDoi || newTitle) fetchCitation(newDoi, newTitle)
})
</script>


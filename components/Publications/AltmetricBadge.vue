<template>
  <div class="text-gray-700 text-gray-700 inline-flex">
    <a
      v-if="doi"
      :href="`https://www.altmetric.com/details.php?doi=${encodeURIComponent(doi)}`"
      target="_blank"
      rel="noopener noreferrer"
      title="View Altmetric details"
      class="inline-block"
    >
      <div
        class="altmetric-embed"
        target="_blank"
        data-badge-type="donut"
        :data-doi="doi"
        style="width: 32px; height: 32px;"
      ></div>
    </a>
  </div>
</template>

<script setup>
import { defineProps, nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps({
  rawDoi: {
    type: String,
    required: true
  }
})

const doi = ref(props.rawDoi.replace(/^https?:\/\/(dx\.)?doi\.org\//, ''))
const altmetricData = ref(null)
const error = ref(null)

async function fetchAltmetricData(doiValue) {
  if (!doiValue) {
    error.value = 'No DOI available'
    altmetricData.value = null
    return
  }
  try {
    const response = await fetch(`https://api.altmetric.com/v1/doi/${encodeURIComponent(doiValue)}`)
    if (!response.ok) {
      error.value = 'No Altmetric data found'
      altmetricData.value = null
      return
    }
    const data = await response.json()
    altmetricData.value = data
    error.value = null
  } catch (e) {
    error.value = 'Error fetching Altmetric data'
    altmetricData.value = null
  }
}

async function loadAltmetricScript() {
  return new Promise((resolve) => {
    if (window._altmetric_embed_init) {
      resolve()
    } else {
      const script = document.createElement('script')
      script.src = 'https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js'
      script.async = true
      script.onload = () => resolve()
      document.head.appendChild(script)
    }
  })
}

async function refreshBadge() {
  await nextTick()
  setTimeout(() => {
    if (window._altmetric_embed_init) {
      window._altmetric_embed_init()
    }
  }, 100)
}

onMounted(async () => {
  await fetchAltmetricData(doi.value)
  await loadAltmetricScript()
  await refreshBadge()
})

watch(() => props.rawDoi, async (newDoi) => {
  doi.value = newDoi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
  await fetchAltmetricData(doi.value)
  await loadAltmetricScript()
  await refreshBadge()
})
</script>

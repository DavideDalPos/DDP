<template>
  <div class="w-[24rem] text-gray-700">
    <h3 class="text-xl font-semibold mb-2">Altmetric</h3>

    <template v-if="altmetricData">
      <p><strong>Score:</strong> {{ altmetricData.score }}</p>
      <p><strong>Readers:</strong> {{ altmetricData.readers_count }}</p>
      <p><strong>Details:</strong>
        <a
          :href="altmetricData.details_url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline"
        >
          View on Altmetric
        </a>
      </p>

      <div class="mt-4" v-if="doi">
        <a
          :href="`https://www.altmetric.com/details.php?doi=${encodeURIComponent(doi)}`"
          target="_blank"
          rel="noopener noreferrer"
          title="View Altmetric details"
          class="inline-block"
        >
          <div
            class="altmetric-embed"
            data-badge-type="donut"
            :data-doi="doi"
            style="width:64px; height:64px;"
          ></div>
        </a>
      </div>
    </template>

    <template v-else>
      <div class="text-gray-500 italic p-4 border border-gray-300 rounded bg-gray-50">
        <p>{{ error || 'Altmetric data is currently unavailable.' }}</p>
        <p class="mt-2 text-sm text-gray-400">
          Please check back later or verify the DOI is correct.
        </p>
      </div>
    </template>
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



<template>
  <section class="container mx-auto my-10 px-8 max-w-[70rem]">
    <article>
      <!-- Title -->
      <h2
        class="font-serif font-semibold text-[35px] leading-tight text-tertiary transition-colors mb-6"
        v-html="publication.title"
      ></h2>

      <!-- Authors block -->
      <div v-if="publication.meta.authors" class="mb-2 text-gray-800 border-b border-gray-300 pb-4">
        <p class="text-[18px] leading-snug flex flex-wrap gap-x-2">
          <template v-for="(author, index) in publication.meta.authors" :key="'auth-' + index">
            <span class="inline-flex items-center">
              {{ author.first_name }} {{ author.last_name }}<sup>{{ getAffiliationNumber(author.affiliation) }}</sup>
              <a
                v-if="author.orcid"
                :href="author.orcid"
                class="ml-1 text-quinary hover:underline hover:text-quaternary inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/orcid.svg" alt="ORCID icon" class="w-4 h-4" />
              </a>
              <span v-if="index < publication.meta.authors.length - 1">;</span>
            </span>
          </template>
        </p>

        <ol class="mt-2 text-sm text-gray-500 list-decimal list-inside mb-2">
          <li v-for="(affil, idx) in uniqueAffiliations.list" :key="'aff-' + idx">
            {{ affil }}
          </li>
        </ol>
      </div>

      <!-- Two-column layout: abstract/PDF on left, metadata + badge on right -->
      <div class="flex flex-col lg:flex-row gap-8">

        <!-- Left column -->
        <div class="flex-1">
          <!-- Abstract -->
          <div v-if="publication.meta.abstract" class="prose pt-3">
            <h3 class="text-3xl font-bold text-gray-700 text-center">Abstract</h3>
            <p v-html="publication.meta.abstract" class="text-justify text-gray-700 mt-2" />
          </div>

          <!-- PDF Preview -->
          <PDFPreview :pdf="publication.meta.pdf" />
        </div>

        <!-- Vertical Divider -->
        <div class="hidden lg:block w-px bg-gray-300"></div>

        <!-- Right column -->
        <div class="w-full lg:w-[260px] flex-shrink-0 space-y-4 text-sm text-gray-700 mt-3">
          <!-- Publication Info -->
          <div class="border border-gray-300 rounded-md p-4">
            <p><strong>DOI:</strong> <a :href="publication.meta.doi" class="text-novenary hover:underline">{{ cleanedDoi }}</a></p>
            <p><strong>Journal:</strong> {{ publication.meta.journal }}</p>
            <p v-if="publication.meta.volume"><strong>Volume:</strong> {{ publication.meta.volume }}</p>
            <p v-if="publication.meta.issue"><strong>Issue:</strong> {{ publication.meta.issue }}</p>
            <p><strong>Pages:</strong> {{ publication.meta.pagination }}</p>
          </div>

          <!-- Altmetric Badge -->
          <div class="scale-[1.4] origin-left ml-22 mt-6">
            <AltmetricBadge :rawDoi="publication.meta.doi" />
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <button
        type="button"
        class="uppercase items-center flex my-10 gap-1.5 cursor-pointer mx-auto"
        @click="goBack"
      >
        <IconArrowLeft class="h-4 inline-block" />
        <span>Back</span>
      </button>
    </article>
  </section>
</template>


<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import IconArrowLeft from '../Icon/IconArrowLeft.vue'
import AltmetricBadge from './AltmetricBadge.vue'
import PDFPreview from './PDFPreview.vue'

const props = defineProps({
  publication: Object
})

const router = useRouter()

function goBack() {
  if (import.meta.client) {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/publications')
    }
  }
}

// Unique affiliations map and list
const uniqueAffiliations = computed(() => {
  const seen = new Map()
  const list = []

  if (
    props.publication &&
    props.publication.meta &&
    Array.isArray(props.publication.meta.authors)
  ) {
    props.publication.meta.authors.forEach((author) => {
      const affil = author.affiliation?.trim()
      if (affil && !seen.has(affil)) {
        seen.set(affil, list.length + 1)
        list.push(affil)
      }
    })
  }

  return {
    map: seen,
    list
  }
})

// Get affiliation number for superscript
function getAffiliationNumber(affil) {
  return uniqueAffiliations.value.map.get(affil?.trim())
}

const cleanedDoi = computed(() => {
  if (!props.publication?.meta?.doi) return null
  return props.publication.meta.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
})
</script>

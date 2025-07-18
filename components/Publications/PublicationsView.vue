<template>
  <section class="container mx-auto flex my-10 justify-between px-8">
    <article>
      <div class="space-y-1">
        <!-- Title -->
        <h2
          class="font-serif font-semibold text-[30px] leading-tight text-otenary transition-colors"
          v-html="publication.title"
        ></h2>
      </div>

      <div class="flex flex-row justify-between gap-8">
        <div class="w-[calc(100%-26rem)] max-w-[65rem]">
          <!-- Author block -->
          <div v-if="publication.meta.authors" class="my-4 text-gray-800">
            <!-- Inline authors -->
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

            <!-- Deduplicated affiliation list -->
            <ol class="mt-2 text-sm text-gray-500 list-decimal list-inside">
              <li v-for="(affil, idx) in uniqueAffiliations.list" :key="'aff-' + idx">
                {{ affil }}
              </li>
            </ol>
          </div>

          <!-- DOI -->
          <div v-if="publication.meta.doi" class="flex flex-row justify-between my-4 gap-4">
            <p>
              <span class="text-gray-700 font-bold">DOI: </span>
              <a
                :href="publication.meta.doi"
                target="_blank"
                rel="noopener noreferrer"
                class="text-novenary hover:text-quaternary hover:underline cursor-pointer"
              >
                {{ publication.meta.doi }}
              </a>
            </p>
          </div>

          <!-- Abstract -->
          <div class="prose w-full max-w-[65rem]">
            <template v-if="publication.meta.abstract">
              <h3 class="text-2xl">Abstract</h3>
              <p v-html="publication.meta.abstract" class="text-justify" />
            </template>
          </div>
        </div>


        <div class="mt-10 w-[24rem] pl-8 border-l border-gray-200 text-gray-700" ><!-- Import and use the right column component -->
          <PublicationsViewGoogleScholar :title="publication.title" :doi="cleanedDoi" />
          <PublicationsViewRightColumn :rawDoi="publication.meta.doi" />
      </div>
    </div>

      <!-- Back Button -->
      <button
        type="button"
        class="uppercase items-center flex my-10 gap-1.5 cursor-pointer"
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
import PublicationsViewGoogleScholar from './PublicationsViewGoogleScholar.vue'
import PublicationsViewRightColumn from './PublicationsViewRightColumn.vue'

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

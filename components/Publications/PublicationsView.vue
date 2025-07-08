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
          <div class="flex flex-row justify-between my-4 gap-4 text-gray-800">
            <div>
              <ul v-if="publication.meta.authors">
                <li
                  v-for="{
                    first_name,
                    last_name,
                    affiliation,
                    orcid
                  } in publication.meta.authors"
                  class="py-2"
                >
                  <p class="font-bold text-[20px]">
                    {{ first_name }} {{ last_name }}
                  </p>
                  <p class="text-[15px] text-gray-500 prose leading-tight">
                    {{ affiliation }}
                  </p>
                  <a
                    v-if="orcid"
                    :href="orcid"
                    class="text-sm text-quinary hover:underline hover:text-quaternary inline-flex items-center gap-1"
                    target="_blank"
                  >
                    <img
                      src="/images/orcid.svg"
                      alt="ORCID icon"
                      class="w-4 h-4"
                    />
                    {{ orcid }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-if="publication.meta.doi"
            class="flex flex-row justify-between my-4 gap-4"
          >
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
          

          <div class="prose w-full max-w-[65rem]">
            <template v-if="publication.meta.abstract">
              <h3 class="text-2xl">Abstract</h3>
              <p
                v-html="publication.meta.abstract"
                class="text-justify"
              />
            </template>
          </div>
        </div>

       </div>

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
import { useRouter } from 'vue-router'

defineProps({
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
</script>
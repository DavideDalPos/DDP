<template>
  <nav data-quicklinks class="mt-8 w-full max-w-4xl px-4 flex justify-center" aria-label="Quick links">
    <ul class="flex flex-wrap justify-center items-center gap-y-1
               rounded-full border border-gray-300 bg-gray-100 px-3 py-1
               text-sm font-medium text-gray-600">
      <li v-for="(btn, index) in ctas" :key="btn.label" class="flex items-center">

        <!-- Dropdown item -->
        <div v-if="btn.submenu" class="relative group" @keydown.esc="openIndex = null">
          <button
            type="button"
            class="flex items-center gap-1 rounded px-2.5 py-1.5 transition-colors
                   hover:bg-[#c07a4b] hover:text-[#26333b]"
            :class="{ 'bg-[#c07a4b] text-[#26333b]': openIndex === index }"
            :aria-expanded="openIndex === index"
            @click="toggle(index)"
          >
            {{ btn.label }}
            <svg
              class="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
              :class="{ 'rotate-180': openIndex === index }"
              fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Opens on hover, keyboard focus, OR tap -->
          <div
            class="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-40 flex-col
                   hidden group-hover:flex group-focus-within:flex
                   min-w-[190px] overflow-hidden rounded-md border border-gray-200
                   bg-white text-gray-700 shadow-lg"
            :class="{ '!flex': openIndex === index }"
          >
            <NuxtLink
              v-for="child in btn.submenu"
              :key="child.link"
              :to="child.link"
              class="px-3 py-2 text-xs transition-colors hover:bg-[#efe9df] hover:text-[#26333b]"
            >
              {{ child.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Plain link -->
        <NuxtLink
          v-else
          :to="btn.link"
          class="rounded px-2.5 py-1.5 transition-colors hover:bg-[#c07a4b] hover:text-[#26333b]"
          active-class="text-[#a85a2e] font-semibold"
        >
          {{ btn.label }}
        </NuxtLink>

        <span v-if="index < ctas.length - 1" aria-hidden="true" class="px-1 text-gray-300">|</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  ctas: {
    type: Array,
    default: () => [
      {
        label: 'Research',
        submenu: [
          { label: 'Systematics of Ichneumonidae', link: '/research/systematics' },
          { label: 'Phenomics & Ontologies', link: '/research/evolution' },
          { label: 'Collections & Biodiversity Informatics', link: '/research/collection' }
        ]
      },
      { label: 'Publications', link: '/publications' },
      { label: 'CV', link: '/cv' },
      { label: 'Teaching', link: '/teaching' },
      { label: 'Network', link: '/network' }
    ]
  }
})

const openIndex = ref(null)
function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}

// Close the tap-opened dropdown on outside click or navigation.
function onDocClick(e) {
  if (!e.target.closest('[data-quicklinks]')) openIndex.value = null
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

const route = useRoute()
watch(() => route.fullPath, () => { openIndex.value = null })
</script>
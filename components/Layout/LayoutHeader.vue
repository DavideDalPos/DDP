<template>
<header class="shadow-sm relative bg-[#26333b] text-[#eae7dd] border-b-[3px] border-[#1a242a]">
  <nav class="container mx-auto p-4 flex items-center justify-between gap-3">

    <!-- Left: Wasp + Name -->
    <div class="flex items-center gap-3 md:gap-4 min-w-0">
      <img src="/images/wasp1.png" alt="Wasp" class="w-9 h-9 md:w-10 md:h-10 shrink-0 object-contain hover:scale-110 transition-transform duration-300"/>
      <NuxtLink to="/" class="truncate text-[#eae7dd] text-base md:text-lg font-semibold hover:text-[#c07a4b] underline-offset-2 hover:underline transition duration-200">
        Davide Dal Pos, Ph.D.
      </NuxtLink>
    </div>

    <!-- Hamburger Mobile -->
    <button type="button" class="md:hidden shrink-0 -mr-2 p-2 text-[#eae7dd] hover:text-[#c07a4b] transition duration-200"
            aria-label="Toggle menu" :aria-expanded="isMenuOpen" @click="toggleMenu">
      <IconHamburger class="w-6 h-6" />
    </button>

    <!-- Desktop Menu -->
    <div class="hidden md:flex flex-wrap justify-end items-center gap-x-7 gap-y-2 text-[#eae7dd] text-base flex-1">
      <div v-for="item in links" :key="item.label" class="relative group transition">

        <!-- Submenu trigger (button so it's keyboard + touch operable) -->
        <button
          v-if="item.submenu"
          type="button"
          class="flex items-center gap-1 cursor-pointer hover:text-[#c07a4b] transition duration-200 relative"
          :aria-expanded="item.isOpen"
          @click="toggleSubmenu(item)"
        >
          <span>{{ item.label }}</span>
          <svg class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
            :class="{ 'rotate-180': item.isOpen }"
            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Plain link (with optional notification dot) -->
        <NuxtLink v-else :to="item.link" class="flex items-center gap-1 hover:text-[#c07a4b] transition duration-200 relative">
          <template v-if="(item.label === 'News' && isNewNews) || (item.label === 'Publications' && isNewPublication)">
            <span class="absolute -top-1 -left-2 w-2 h-2 rounded-full animate-ping opacity-50"
              :class="item.label === 'News' ? 'bg-pink-300' : 'bg-blue-300'"></span>
            <span class="absolute -top-1 -left-2 w-1.5 h-1.5 rounded-full"
              :class="item.label === 'News' ? 'bg-pink-300' : 'bg-blue-300'"></span>
          </template>
          {{ item.label }}
        </NuxtLink>

        <!-- Desktop Submenu: opens on hover, keyboard focus, OR click/tap -->
        <div v-if="item.submenu"
          class="absolute top-full left-1/2 -translate-x-1/2 hidden flex-col
                 group-hover:flex group-focus-within:flex
                 bg-[#1a242a] text-[#eae7dd] shadow-lg rounded-md z-40 min-w-[170px]
                 border border-[#3a4b56]/50">
          <NuxtLink v-for="child in item.submenu" :key="child.link" :to="child.link"
            class="block px-4 py-2 text-xs hover:bg-[#3a4b56]/40 hover:text-[#c07a4b] transition duration-200">
            {{ child.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div v-if="isMenuOpen"
       class="md:hidden max-h-[80vh] overflow-y-auto bg-[#1a242a] text-[#eae7dd] shadow-lg px-4 pb-4 flex flex-col divide-y divide-[#3a4b56]/30 border-t border-[#3a4b56]/30">
    <div v-for="item in links" :key="item.label" class="flex flex-col">

      <!-- Submenu row (button = accessible, full-width, finger-sized) -->
      <button
        v-if="item.submenu"
        type="button"
        class="flex items-center justify-between w-full py-3 text-left hover:text-[#c07a4b] transition duration-200"
        :aria-expanded="item.isOpen"
        @click="toggleSubmenu(item)"
      >
        <span>{{ item.label }}</span>
        <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': item.isOpen }"
          fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Plain link row -->
      <NuxtLink v-else :to="item.link" class="flex items-center gap-2 w-full py-3 hover:text-[#c07a4b] transition duration-200">
        <span>{{ item.label }}</span>
        <span v-if="(item.label === 'News' && isNewNews) || (item.label === 'Publications' && isNewPublication)"
          class="w-2 h-2 rounded-full" :class="item.label === 'News' ? 'bg-pink-300' : 'bg-blue-300'"></span>
      </NuxtLink>

      <!-- Expanded submenu children -->
      <div v-if="item.submenu && item.isOpen" class="flex flex-col pb-2">
        <NuxtLink v-for="child in item.submenu" :key="child.link" :to="child.link"
          class="block py-2.5 pl-4 text-sm text-[#eae7dd]/90 hover:text-[#c07a4b] transition duration-200">
          {{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</header>

</template>

<script setup>
import { useAsyncData } from '#app'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import IconHamburger from '~/components/Icon/IconHamburger.vue'

const isMenuOpen = ref(false)
function toggleMenu() { isMenuOpen.value = !isMenuOpen.value }
function toggleSubmenu(item) { if (item.submenu) item.isOpen = !item.isOpen }

// Close the mobile menu (and any open submenu) after navigating.
const route = useRoute()
watch(() => route.fullPath, () => {
  isMenuOpen.value = false
  links.forEach(l => { l.isOpen = false })
})

const links = reactive([
  { label: 'Home', link: '/', isOpen: false },
  { label: 'Research', submenu: [
      { label: 'Systematics of Ichneumonidae', link:'/research/systematics' },
      { label: 'Phenomics & Ontologies', link: '/research/evolution' },
      { label: 'Collections & Biodiversity Informatics', link: '/research/collection' },
    ], isOpen: false },
  { label: 'Publications', link: '/publications', isOpen: false },
  { label: 'Species', link: '/species', isOpen: false },
  { label: 'Teaching', link: '/teaching' },
  { label: 'Network', link: '/network', isOpen: false },
  { label: 'News', link: '/news', isOpen: false },
  { label: 'CV', link: '/cv', isOpen: false },
  { label: 'Contact', link: '/contact', isOpen: false }
])

const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30

// Fetch both collections in parallel rather than sequentially.
// NOTE: this still pulls each full collection. If your content schema exposes
// `date` as a queryable field, you can swap `.all()` for a limited query:
//   queryCollection('news').order('date', 'DESC').first()
// and read its date directly — cheaper than loading every item app-wide.
const [{ data: newsData }, { data: pubData }] = await Promise.all([
  useAsyncData('news', () => queryCollection('news').all()),
  useAsyncData('publications', () => queryCollection('publications').all())
])

// Single pass for the newest date — no full-array sort/spread.
function hasRecent(items) {
  if (!items?.length) return false
  let latest = 0
  for (const it of items) {
    const t = new Date(it.meta?.date).getTime()
    if (!Number.isNaN(t) && t > latest) latest = t
  }
  return latest > 0 && (Date.now() - latest) < THIRTY_DAYS
}

const isNewNews = computed(() => hasRecent(newsData.value))
const isNewPublication = computed(() => hasRecent(pubData.value))
</script>
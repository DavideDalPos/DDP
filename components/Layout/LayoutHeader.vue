<template>
<header class="shadow-sm relative bg-[#4a7c7b] text-[#e9e6d9] border-b-[3px] border-[#3a6462]">
  <nav class="container mx-auto p-4 flex items-center justify-between">
    
    <!-- Left: Wasp + Name -->
    <div class="flex items-center gap-3 md:gap-4">
      <img src="/images/wasp1.png" alt="Wasp" class="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300"/>
      <NuxtLink to="/" class="text-[#e9e6d9] text-lg font-semibold hover:text-[#ffc857] underline-offset-2 hover:underline transition duration-200">
        Davide Dal Pos, Ph.D.
      </NuxtLink>
    </div>

    <!-- Hamburger Mobile -->
    <button class="md:hidden text-[#e9e6d9] hover:text-[#ffc857] transition duration-200" aria-label="Toggle menu" @click="toggleMenu">
      <IconHamburger class="w-6 h-6" />
    </button>

    <!-- Desktop Menu -->
    <div class="hidden md:flex justify-center gap-10 text-[#e9e6d9] text-md flex-1">
      <div v-for="item in links" :key="item.label" class="relative group transition">
        <div class="flex items-center gap-1 cursor-pointer hover:text-[#ffc857] transition duration-200 relative">

          <!-- Notification Dot -->
          <template v-if="(item.label === 'News' && isNewNews) || (item.label === 'Publications' && isNewPublication)">
            <span class="absolute -top-1 -left-2 w-2 h-2 rounded-full animate-ping opacity-50"
              :class="item.label === 'News' ? 'bg-pink-300' : 'bg-blue-300'"></span>
            <span class="absolute -top-1 -left-2 w-1.5 h-1.5 rounded-full"
              :class="item.label === 'News' ? 'bg-pink-300' : 'bg-blue-300'"></span>
          </template>

          <NuxtLink v-if="item.link" :to="item.link" class="hover:text-[#ffc857]">
            {{ item.label }}
          </NuxtLink>
          <span v-else>{{ item.label }}</span>

          <svg v-if="item.submenu" class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>

        <!-- Desktop Submenu -->
        <div v-if="item.submenu"
          class="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col 
                 bg-[#3a6462] text-[#e9e6d9] shadow-lg rounded-md z-40 min-w-[170px] 
                 transition-all duration-300 border border-[#3a6462]/50">
          <NuxtLink v-for="child in item.submenu" :key="child.link" :to="child.link"
            class="block px-4 py-2 text-sm hover:bg-[#5a8a88]/30 hover:text-[#f0c674] transition duration-200">
            {{ child.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div v-if="isMenuOpen"
       class="md:hidden bg-[#3a6462] text-[#e9e6d9] shadow-lg p-4 flex flex-col space-y-2 transition-all duration-300 border-t border-[#3a6462]">
    <div v-for="item in links" :key="item.label" class="flex flex-col relative">
      <div class="flex items-center justify-between py-2 cursor-pointer hover:text-[#f0c674] transition duration-200 relative"
           @click="toggleSubmenu(item)">
        <NuxtLink v-if="item.link" :to="item.link">{{ item.label }}</NuxtLink>
        <span v-else>{{ item.label }}</span>
      </div>

      <div v-if="item.submenu && item.isOpen" class="flex flex-col pl-4 bg-[#5a8a88]/20 rounded-md p-1 transition">
        <NuxtLink v-for="child in item.submenu" :key="child.link" :to="child.link"
          class="py-1 hover:text-[#f0c674] transition duration-200">
          {{ child.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</header>

</template>

<script setup>
import { useAsyncData } from '#app'
import { computed, reactive, ref } from 'vue'
import IconHamburger from '~/components/Icon/IconHamburger.vue'

const isMenuOpen = ref(false)
function toggleMenu() { isMenuOpen.value = !isMenuOpen.value }
function toggleSubmenu(item) { if(item.submenu) item.isOpen = !item.isOpen }

const links = reactive([
  { label: 'Home', link: '/', isOpen: false },
  { label: 'Research', submenu: [
      { label: 'Systematics of Ichneumonidae', link:'/research/systematics' },
      { label: 'Phenomics & Ontologies', link: '/research/evolution' },
      { label: 'Collection-Based Research', link: '/research/collection' },
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

// News badge
const { data: newsData } = await useAsyncData('news', () => queryCollection('news').all())
const latestNewsDate = computed(() => {
  if(!newsData.value?.length) return null
  return new Date([...newsData.value].sort((a,b)=> new Date(b.meta.date)-new Date(a.meta.date))[0].meta.date)
})
const isNewNews = computed(() => latestNewsDate.value ? (new Date() - latestNewsDate.value) < THIRTY_DAYS : false)

// Publications badge
const { data: pubData } = await useAsyncData('publications', () => queryCollection('publications').all())
const latestPubDate = computed(() => {
  if(!pubData.value?.length) return null
  return new Date([...pubData.value].sort((a,b)=> new Date(b.meta.date)-new Date(a.meta.date))[0].meta.date)
})
const isNewPublication = computed(() => latestPubDate.value ? (new Date() - latestPubDate.value) < THIRTY_DAYS : false)
</script>

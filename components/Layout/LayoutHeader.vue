<template>
  <header class="shadow-sm relative border-b border-blue-800 bg-[#0b1a33] text-white transition-all duration-300">
    <nav class="container mx-auto p-4 flex items-center justify-between">

      <!-- Left: Name + Hamburger -->
      <div class="flex items-center gap-4 justify-between w-full md:w-auto">
        <NuxtLink 
          to="/" 
          class="text-white text-lg hover:underline hover:text-blue-200 transition duration-200"
        >
          Davide Dal Pos, Ph.D.
        </NuxtLink>

        <button
          class="md:hidden text-white hover:text-blue-200 transition duration-200"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <IconHamburger class="w-6 h-6" />
        </button>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex justify-center gap-10 text-white text-md flex-1">
        <div v-for="item in links" :key="item.label" class="relative group transition">
          
          <!-- Link + dropdown arrow -->
          <div class="flex items-center gap-1 cursor-pointer hover:text-blue-200 transition duration-200">
            <NuxtLink 
              v-if="item.link" 
              :to="item.link"
              class="flex items-center gap-1 hover:text-blue-200"
            >
              {{ item.label }}
            </NuxtLink>

            <span v-else class="flex items-center gap-1">
              {{ item.label }}
            </span>

            <!-- Arrow -->
            <svg
              v-if="item.submenu"
              class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Desktop submenu -->
          <div
            v-if="item.submenu"
            class="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-[#0f2547] text-white shadow-lg rounded-md z-40 min-w-[170px] transition-all duration-300"
          >
            <NuxtLink
              v-for="child in item.submenu"
              :key="child.link"
              :to="child.link"
              class="block px-4 py-2 text-sm hover:bg-[#13315a] hover:text-blue-200 transition duration-200"
            >
              {{ child.label }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Social Icons -->
      <div class="hidden md:flex items-center gap-4">
        <a href="mailto:your.email@example.com" class="text-white hover:text-blue-200 transition">
          <IconEmail class="w-6 h-6" />
        </a>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener" class="text-white hover:text-blue-200 transition">
          <IconGithub class="w-6 h-6" />
        </a>
        <a href="https://scholar.google.com/citations?user=YOUR_ID" target="_blank" rel="noopener" class="text-white hover:text-blue-200 transition">
          <IconGoogleScholar class="w-6 h-6" />
        </a>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div 
      v-if="isMenuOpen" 
      class="md:hidden bg-[#0e213f] text-white shadow-lg p-4 flex flex-col space-y-2 transition-all duration-300"
    >
      <div v-for="item in links" :key="item.label" class="flex flex-col">

        <div 
          class="flex items-center justify-between py-2 cursor-pointer hover:text-blue-200 transition duration-200"
          @click="toggleSubmenu(item)"
        >
          <NuxtLink v-if="item.link" :to="item.link">{{ item.label }}</NuxtLink>
          <span v-else>{{ item.label }}</span>

          <svg
            v-if="item.submenu"
            class="w-3 h-3 transition-transform duration-200"
            :class="{ 'rotate-180': item.isOpen }"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>

        <!-- Mobile submenu -->
        <div v-if="item.submenu && item.isOpen" class="flex flex-col pl-4 bg-[#112847]/30 rounded-md p-1 transition">
          <NuxtLink
            v-for="child in item.submenu"
            :key="child.link"
            :to="child.link"
            class="py-1 hover:text-blue-200 transition duration-200"
          >
            {{ child.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>


<script setup>
import { reactive, ref } from 'vue'
import IconEmail from '~/components/Icon/IconEmail.vue'
import IconGithub from '~/components/Icon/IconGithub.vue'
import IconGoogleScholar from '~/components/Icon/IconGoogleScholar.vue'
import IconHamburger from '~/components/Icon/IconHamburger.vue'

const isMenuOpen = ref(false)

const links = reactive([
  { 
    label: 'Research',
    submenu: [
      { label: 'Systematics of Ichneumonidae', link:'/research/systematics' },
      { label: 'Phenomics Evolution', link: '/research/evolution' },
      { label: 'Collection-Based Research', link: '/research/collection' }
    ],
    isOpen: false
  },
  { label: 'Publications', link: '/publications', isOpen: false },
  { label: 'CV', link: '/cv', isOpen: false },
  { label: 'Species', link: '/species', isOpen: false },
  { label: 'Teaching', link: '/teaching' },
  { label: 'Network', link: '/network', isOpen: false },
  { label: 'News', link: '/news', isOpen: false },
  { label: 'Contact', link: '/contact', isOpen: false }
])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleSubmenu(item) {
  if (item.submenu) item.isOpen = !item.isOpen
}
</script>

<template>
  <header class="shadow-sm relative">
    <nav class="container mx-auto p-4 flex items-center justify-between">
      <!-- Left: Name + Hamburger -->
      <div class="flex items-center gap-4 justify-between w-full md:w-auto">
        <NuxtLink to="/" class="text-xl font-semibold hover:underline">
          Davide Dal Pos, Ph.D.
        </NuxtLink>
        <button
          class="md:hidden text-gray-900"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <IconHamburger />
        </button>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex justify-center gap-6 text-gray-700 text-lg flex-1">
        <div
          v-for="item in links"
          :key="item.label"
          class="relative group"
        >
          <!-- Parent link + arrow -->
          <div class="flex items-center gap-1 cursor-pointer">
            <NuxtLink
              v-if="item.link"
              :to="item.link"
              class="hover:underline flex items-center gap-1"
            >
              {{ item.label }}
            </NuxtLink>
            <span v-else>{{ item.label }}</span>

            <svg
              v-if="item.submenu"
              class="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Submenu -->
          <div
            v-if="item.submenu"
            class="absolute left-0 mt-1 flex-col bg-white shadow-lg rounded-md z-50 hidden group-hover:flex"
          >
            <NuxtLink
              v-for="child in item.submenu"
              :key="child.link"
              :to="child.link"
              class="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
            >
              {{ child.label }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Social icons -->
      <div class="hidden md:flex items-center gap-4">
        <a href="mailto:your.email@example.com" class="hover:text-gray-400">
          <IconEmail class="w-6 h-6" />
        </a>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener" class="hover:text-gray-400">
          <IconGithub class="w-6 h-6" />
        </a>
        <a href="https://scholar.google.com/citations?user=YOUR_ID" target="_blank" rel="noopener" class="hover:text-gray-400">
          <IconGoogleScholar class="w-6 h-6" />
        </a>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white shadow p-4 flex flex-col text-gray-900">
      <div v-for="item in links" :key="item.label" class="flex flex-col">
        <div class="flex items-center justify-between py-2 cursor-pointer" @click="toggleSubmenu(item)">
          <NuxtLink v-if="item.link" :to="item.link">{{ item.label }}</NuxtLink>
          <span v-else>{{ item.label }}</span>

          <!-- Arrow for mobile -->
          <svg
            v-if="item.submenu"
            class="w-3 h-3 transition-transform duration-200"
            :class="{ 'rotate-180': item.isOpen }"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <!-- Submenu for mobile -->
        <div v-if="item.submenu && item.isOpen" class="pl-4 flex flex-col">
          <NuxtLink
            v-for="child in item.submenu"
            :key="child.link"
            :to="child.link"
            class="hover:underline py-1"
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
      { label: 'Taxonomy', link:'/research/taxonomy' },
      { label: 'Ontology', link: '/ontology' }
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
  if (item.submenu) {
    item.isOpen = !item.isOpen
  }
}
</script>

<template>
  <header class="shadow-sm relative">
    <nav class="container mx-auto p-4 relative flex items-center justify-between">
      
      <!-- Left: Name + Hamburger -->
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="text-xl font-semibold hover:underline">
          Davide Dal Pos
        </NuxtLink>

        <button class="md:hidden" @click="toggleMenu" aria-label="Toggle menu">
          <IconHamburger />
        </button>
      </div>

      <!-- Center Navigation (hidden on mobile) -->
      <div class="hidden md:flex justify-center gap-6 text-gray-800 text-lg flex-1">
        <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
        <NuxtLink to="/research" class="hover:underline">Research</NuxtLink>
        <NuxtLink to="/publication" class="hover:underline">Publications</NuxtLink>
        <NuxtLink to="/cv" class="hover:underline">CV</NuxtLink>
        <NuxtLink to="/news" class="hover:underline">News</NuxtLink>
        <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
      </div>

      <!-- Right: Social & Contact Icons (hidden on mobile) -->
<!-- Right: Social & Contact Icons (hidden on mobile) -->
<div class="hidden md:flex items-center gap-4">
  <a href="mailto:your.email@example.com" aria-label="Email" class="hover:text-blue-600">
    <IconEmail class="w-6 h-6" />
  </a>
  <a href="https://github.com/yourusername" target="_blank" rel="noopener" aria-label="GitHub" class="hover:text-gray-900">
    <IconGithub class="w-6 h-6" />
  </a>
  <a href="https://scholar.google.com/citations?user=YOUR_ID" target="_blank" rel="noopener" aria-label="Google Scholar" class="hover:text-green-600">
    <IconGoogleScholar class="w-6 h-6" />
  </a>

  <!-- Add Theme Toggle here -->
</div>

    </nav>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white shadow p-4">
      <NuxtLink to="/about" class="block py-2">About</NuxtLink>
      <NuxtLink to="/research" class="block py-2">Research</NuxtLink>
      <NuxtLink to="/publications/" class="block py-2">Publications</NuxtLink>
      <NuxtLink to="/cv" class="block py-2">CV</NuxtLink>
      <NuxtLink to="/news" class="block py-2">News</NuxtLink>
      <NuxtLink to="/contact" class="block py-2">Contact</NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import IconEmail from '~/components/Icon/IconEmail.vue'
import IconGithub from '~/components/Icon/IconGithub.vue'
import IconGoogleScholar from '~/components/Icon/IconGoogleScholar.vue'
import IconHamburger from '~/components/Icon/IconHamburger.vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

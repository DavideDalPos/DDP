<template>
  <header class="shadow-sm relative">
    <nav
      class="container mx-auto p-4 relative flex items-center justify-between"
    >
      <!-- Left: Name + Hamburger -->
      <div class="flex items-center gap-4 justify-between w-full md:w-auto">
        <NuxtLink
          to="/"
          class="text-xl font-semibold hover:underline"
        >
          Davide Dal Pos
        </NuxtLink>

        <button
          class="md:hidden text-white size-6"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <IconHamburger />
        </button>
      </div>

      <!-- Center Navigation (hidden on mobile) -->
      <div
        class="hidden md:flex justify-center gap-6 text-gray-700 text-lg flex-1"
      >
        <NuxtLink
          v-for="{ label, link } in links"
          :key="link"
          :to="link"
          class="hover:underline "
          >{{ label }}</NuxtLink
        >
      </div>

      <!-- Right: Social & Contact Icons (hidden on mobile) -->
      <!-- Right: Social & Contact Icons (hidden on mobile) -->
      <div class="hidden md:flex items-center gap-4">
        <a
          href="mailto:your.email@example.com"
          aria-label="Email"
          class="hover:text-gray-400"
        >
          <IconEmail class="w-6 h-6" />
        </a>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          class="hover:text-gray-400"
        >
          <IconGithub class="w-6 h-6" />
        </a>
        <a
          href="https://scholar.google.com/citations?user=YOUR_ID"
          target="_blank"
          rel="noopener"
          aria-label="Google Scholar"
          class="hover:text-gray-400"
        >
          <IconGoogleScholar class="w-6 h-6" />
        </a>

        <!-- Add Theme Toggle here -->
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-white shadow p-4 flex flex-col text-gray-900"
    >
      <NuxtLink
        v-for="{ label, link } in links"
        :key="link"
        :to="link"
        class="hover:underline my-2"
        >{{ label }}</NuxtLink
      >
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

const links = [
  {
    label: 'About',
    link: '/about'
  },
  {
    label: 'Research',
    link: '/research'
  },
  {
    label: 'Publications',
    link: '/publications'
  },
  {
    label: 'CV',
    link: '/cv'
  },
  {
    label: 'News',
    link: '/news'
  },
  {
    label: 'Contact',
    link: '/contact'
  }
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

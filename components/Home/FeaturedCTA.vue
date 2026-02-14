<template>
  <div class="mt-8 w-full max-w-4xl px-4 flex flex-col items-center space-y-16">

    <!-- Slim Pill with All CTAs -->
    <div class="flex justify-center">
      <div class="px-3 py-0.5 border border-gray-400 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex items-center gap-2">
        <template v-for="(btn, index) in ctas" :key="btn.label">
          <NuxtLink
            :to="btn.link"
            class="px-2 py-0.5 rounded transition-colors hover:bg-amber-400"
          >
            {{ btn.label }}
          </NuxtLink>
          <span v-if="index < ctas.length - 1" class="text-gray-400">|</span>
        </template>
      </div>
    </div>

  </div>
</template>


<script setup>
defineProps({
  featuredPublications: {
    type: Array,
    default: () => []
  },
  ctas: {
    type: Array,
    default: () => [
      { label: 'Research', link: '/research/systematics' },
      { label: 'Publications', link: '/publications' },
      { label: 'CV', link: '/cv' },
      { label: 'Network', link: '/network' }
    ]
  }
})
</script>

<template>
  <div class="mt-8 w-full max-w-4xl px-4 flex flex-col items-center space-y-16">

    <!-- Slim Pill with All CTAs -->
    <div class="flex justify-center">
      <div class="px-3 py-0.5 border border-gray-400 rounded-full bg-gray-100 text-gray-600 text-sm font-medium flex items-center gap-2">

        <!-- 👇 THIS is where your v-for goes -->
        <template v-for="(btn, index) in ctas" :key="btn.label">

          <!-- Dropdown Version -->
<div v-if="btn.submenu" class="relative group flex items-center">

  <!-- Research Button -->
  <div class="px-2 py-0.5 rounded transition-colors hover:bg-amber-400 cursor-pointer flex items-center gap-1">
    {{ btn.label }}

    <!-- Arrow -->
    <svg
      class="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  </div>

  <!-- Dropdown -->
  <div
    class="absolute top-full left-1/2 -translate-x-1/2 pt-1 hidden group-hover:flex flex-col
           bg-white text-gray-700 shadow-md rounded-md z-40 min-w-[180px]
           border border-gray-200"
  >
    <NuxtLink
      v-for="child in btn.submenu"
      :key="child.link"
      :to="child.link"
      class="px-3 py-1.5 text-xs hover:bg-amber-200 transition"
    >
      {{ child.label }}
    </NuxtLink>
  </div>

</div>


          <!-- Normal Link Version -->
          <NuxtLink
            v-else
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
  { 
    label: 'Research',
    submenu: [
      { label: 'Systematics of Ichneumonidae', link:'/research/systematics' },
      { label: 'Phenomics & Ontologies', link: '/research/evolution' },
      { label: 'Collections & Biodiversity Informatics', link: '/research/collection' },
    ]
  },
  { label: 'Publications', link: '/publications' },
  { label: 'CV', link: '/cv' },
    { label: 'Teaching', link: '/teaching' },
  { label: 'Network', link: '/network' }
]

  }
})
</script>

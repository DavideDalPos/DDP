<template>
  <div class="bg-gray-100 p-5 ">
    <!-- Heading with amber accent -->
    <h3 class="font-bold mb-4 text-amber-600 text-lg">Skills</h3>

    <!-- Skills list as smaller pills -->
    <ul class="flex flex-wrap gap-2">
      <li 
        v-for="(skill, index) in skills" 
        :key="index" 
        class="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium hover:bg-amber-300 transition"
      >
        {{ skill }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const skills = [
  'Morphology',
  'Taxonomy',
  'Micro-CT scanning',
  'Database management'
]
</script>

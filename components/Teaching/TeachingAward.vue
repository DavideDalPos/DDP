<template>
  <div class="container mx-auto p-6 pb-10 max-w-4xl">
    <h2 class="text-2xl font-semibold mb-6 text-center">Teaching Awards</h2>

    <ul class="space-y-4">
      <li v-for="(award, index) in awards" :key="index" class="flex items-start space-x-3">
        <span class="text-quaternary mt-1">★</span>
        <div>
          <p class="font-medium text-gray-800">{{ award.title }}</p>
          <p class="text-sm text-gray-600">{{ award.details }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const awards = [
  { title: 'UCF Graduate Teaching Associate Award for Excellence', details: 'Recognized for outstanding teaching and dedication to student success.' },
  { title: 'Recognition for Mentorship of Undergraduate Researchers', details: 'Acknowledged for exceptional guidance and mentorship in research projects.' }
]
</script>

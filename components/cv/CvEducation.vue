<template>
  <div>
    <h2 class="text-3xl font-bold text-gray-200 mb-6">Education</h2>
    <div v-for="(edu, index) in education" :key="'edu-' + index" class="mb-6">
      <p class="font-bold text-lg text-amber-400">{{ edu.degree }}</p>
      <p class="text-gray-300">{{ edu.institution }}</p>
      <p class="text-sm text-gray-400">{{ edu.year }}</p>
      <p v-if="edu.title" class="text-gray-300 italic mt-1">“{{ edu.title }}”</p>
      <p v-if="edu.advisor" class="text-gray-300 mt-1">Advisor: {{ edu.advisor }}</p>
      <hr class="my-3 border-gray-600" />
    </div>
  </div>
</template>

<script setup>
import { education } from './CvEducationData.js';
</script>

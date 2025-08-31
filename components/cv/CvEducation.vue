<template>
  <div>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Education</h2>
    <div v-for="(edu, index) in education" :key="'edu-' + index" class="mb-6">
      <p class="font-bold text-lg">{{ edu.degree }}</p>
      <p class="text-gray-700">{{ edu.institution }}</p>
      <p class="text-sm text-gray-500">{{ edu.year }}</p>
      <p v-if="edu.title" class="text-gray-600 italic mt-1">“{{ edu.title }}”</p>
      <p v-if="edu.advisor" class="text-gray-600 mt-1">Advisor: {{ edu.advisor }}</p>
      <hr class="my-3 border-gray-300" />
    </div>
  </div>
</template>

<script setup>
import { education } from './CvEducation.js';
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <h2 class="text-3xl font-bold text-gray-700 mb-6">Education</h2>

    <div
      v-for="(edu, index) in education"
      :key="'edu-' + index"
      class="border border-gray-300 rounded-xl p-5 bg-gray-100 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col md:flex-row md:justify-between md:items-start gap-4"
    >
      <!-- Left: Degree + Institution -->
      <div class="flex-1">
        <h3 class="text-amber-400 font-bold text-lg">{{ edu.degree }}</h3>
        <p class="text-gray-700 font-medium">{{ edu.institution }}</p>
        <p v-if="edu.title" class="text-gray-600 italic mt-1">“{{ edu.title }}”</p>
        <p v-if="edu.advisor" class="text-gray-500 mt-1">Advisor: {{ edu.advisor }}</p>
      </div>

      <!-- Right: Year -->
      <div class="flex-shrink-0 mt-1 md:mt-0">
        <span
          class="text-amber-800 font-semibold bg-amber-200 px-3 py-1 rounded-full shadow-sm text-xs"
        >
          {{ edu.year }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { education } from './CvEducationData.js';
</script>

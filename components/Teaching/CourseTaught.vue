<template>
  <div class="container mx-auto p-6 pb-10 max-w-4xl">
    <h2 class="text-4xl font-extrabold mb-4 text-amber-400">Courses Taught</h2>

    <!-- Explanation -->
    <p class="text-gray-300 mb-6">
      Courses are listed with the instructor role indicated in the amber badge: 
      <span class="font-semibold text-amber-400">IR</span> = Instructor of Record (full responsibility for course design, instruction, and assessment), 
      <span class="font-semibold text-amber-400">GTA</span> = Graduate Teaching Associate (assisted in laboratory sections).
    </p>

    <!-- Courses Grid -->
    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="course in teachingCourses"
        :key="course.name"
        class="relative p-4 border border-gray-600 rounded shadow-sm bg-gray-800 hover:shadow-lg transition"
      >
        <!-- Role Badge -->
<span
  class="absolute top-2 right-2 text-[10px] font-semibold text-amber-700 bg-amber-200 px-1 py-0.5 rounded-full"
>
  {{ course.role === 'Instructor of Record' ? 'IR' : 'GTA' }}
</span>


        <h4 class="font-medium text-gray-200 italic">{{ course.name }}</h4>
        <p class="text-gray-400 text-sm">{{ course.term }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { teachingCourses } from '~/components/Teaching/TeachingData.js';
</script>

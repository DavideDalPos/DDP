<template>
  <div class="container mx-auto p-6 pb-10 max-w-4xl">
    <h2 class="text-4xl font-extrabold mb-4 text-[#ffb86c]">Courses Taught</h2>

    <!-- Explanation -->
    <p class="text-gray-700 mb-6">
      Courses are listed with the instructor role indicated in the amber badge: 
      <span class="font-semibold text-[#ffb86c]">IR</span> = Instructor of Record (full responsibility for course design, instruction, and assessment), 
      <span class="font-semibold text-[#4fa3ff]">GTA</span> = Graduate Teaching Associate (assisted in laboratory sections).
    </p>

    <!-- Courses Grid -->
    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="course in teachingCourses"
        :key="course.name"
        class="relative p-4 rounded-lg shadow-sm bg-gray-50 hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-300"
      >
<!-- Role Badge -->
<span
  class="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-semibold"
  :style="{
    backgroundColor: course.role === 'Instructor of Record' ? '#fff0d6' : '#d9f0ff',
    color: course.role === 'Instructor of Record' ? '#ffb86c' : '#4fa3ff'
  }"
>
  {{ course.role === 'Instructor of Record' ? 'IR' : 'GTA' }}
</span>

        <h4 class="font-medium text-sm text-gray-700 italic">{{ course.name }}</h4>
        <p class="text-gray-500 text-xs">{{ course.term }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { teachingCourses } from '~/components/Teaching/TeachingData.js';
</script>

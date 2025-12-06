<template>
  <div class="bg-gray-800 border border-amber-400 p-4 rounded shadow-sm">
    <!-- Heading with amber accent -->
    <h3 class="font-bold mb-2 text-amber-400">Teaching Experience</h3>

    <!-- List of courses -->
    <ul class="list-disc list-outside px-4 text-gray-200">
      <li v-for="(course, index) in courses" :key="index">
        {{ course.name }} - <span class="font-semibold text-amber-300">{{ course.positionType }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { teachingCourses } from './CvSidebarTeachingData.js';

const courses = teachingCourses
</script>

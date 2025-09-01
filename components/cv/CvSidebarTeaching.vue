<template>
  <div class="bg-white border border-gray-200 p-4 rounded shadow-sm">
    <h3 class="font-bold mb-2">Teaching Experience</h3>
    <ul class="list-disc list-outside px-4 text-gray-700">
      <li v-for="(course, index) in courses" :key="index">
        {{ course.name }} - <span class="font-semibold">{{ course.positionType }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { teachingCourses } from './CvSidebarTeachingData.js';

const courses = teachingCourses
</script>

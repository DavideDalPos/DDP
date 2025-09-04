<template>
<div class="container mx-auto p-6 pb-10 max-w-4xl">
<h2 class="text-4xl font-extrabold mb-2 text-gray-700 mb-7">Courses Taught</h2>
<div class="grid gap-4 sm:grid-cols-2">
<div v-for="course in teachingCourses" :key="course.name" class="p-4 border rounded shadow hover:shadow-lg transition">
<h3 class="font-medium">{{ course.name }}</h3>
<p class="text-gray-600 text-sm">{{ course.positionType }}</p>
</div>
</div>
</div>
</template>


<script setup>
import { teachingCourses } from '~/components/cv/CvSidebarTeachingData.js';
</script>
<template>
  <div class="container mx-auto my-15 px-8 max-w-[70rem]">
    <CVIntro />
    
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left column -->
      <div class="flex-1">
        <CvEducation />

        <div class="mt-10">
          <h2 class="text-3xl font-bold text-gray-700 mb-6">Professional Experience</h2>

          <div class="space-y-6">
            <CvJob
              v-for="job in sortedJobs"
              :key="`${job.id}-${job.title}-${job.institution}`"
              :title="job.title"
              :institution="job.institution"
              :start="job.start"
              :end="job.end"
              :description="job.description"
            />
          </div>
        </div>
      </div>

      <!-- Right column -->
      <CvSidebar />
    </div>
<div id="cv" class="mt-16">
  <CvPreview />
</div>
  </div>
</template>

<script setup>
import CvEducation from './CvEducation.vue';
import CVIntro from './CVIntro.vue';
import CvJob from './CvJob.vue';
import { jobs } from './CvJobsData.js';
import CvSidebar from './CvSidebar.vue';

const sortedJobs = computed(() => {
  return [...jobs].sort((a, b) => {
    const startA = Number(a.start);
    const startB = Number(b.start);
    if (startA !== startB) return startB - startA;

    const endA = a.end === 'Present' ? Infinity : Number(a.end);
    const endB = b.end === 'Present' ? Infinity : Number(b.end);
    return endB - endA;
  });
});
</script>
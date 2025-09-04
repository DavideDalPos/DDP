<template>
  <div class="container mx-auto my-15 px-8 max-w-[70rem]">

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left column -->
      <div class="flex-1">
        <CvEducation />

        <div class="mt-10">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Professional Experience</h2>

          <!-- Loop over jobs -->
          <CvJob
            v-for="job in jobs"
            :key="job.id"
            :title="job.title"
            :institution="job.institution"
            :start="job.start"
            :end="job.end"
            :role="job.role"
            :description="job.description"
          />
        </div>
      </div>

      <!-- Right column -->
      <CvSidebar />
    </div>
    <CvPreview />
  </div>
</template>

<script setup>
import CvEducation from './CvEducation.vue'
import CvJob from './CvJob.vue'
import { jobs } from './CvJobs.js'
import CvPreview from './CvPreview.vue'
import CvSidebar from './CvSidebar.vue'
</script>

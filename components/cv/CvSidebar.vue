<template>
  <div class="w-full lg:w-80 flex-shrink-0 space-y-6">
    <CvSidebarSkills />
    <CvSidebarTeaching />
    <CvSidebarAwards />
  </div>
</template>

<script setup>
import CvSidebarAwards from './CvSidebarAwards.vue';
import CvSidebarSkills from './CvSidebarSkills.vue';
import CvSidebarTeaching from './CvSidebarTeaching.vue';
</script>

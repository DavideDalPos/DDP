<script setup lang="ts">
import ResearchCard from './ResearchCard.vue';
import WIDCard from './WIDCard.vue';

</script>

<template>
  <section class="bg-gray-50 py-16">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-gray-900 mb-10 text-center">
        Latest Updates & Projects
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- News Card -->

        <!-- WID Card -->
        <WIDCard />

        <!-- Research Interests -->
        <ResearchCard />

        <!-- Optional fourth card -->
        <!-- <OtherCard /> -->
      </div>
    </div>
  </section>
</template>

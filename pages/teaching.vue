<script setup lang="ts">
import CourseTaught from '~/components/Teaching/CourseTaught.vue';
import StudentTestimonials from '~/components/Teaching/StudentTestimonials.vue';
import TeachingAward from '~/components/Teaching/TeachingAward.vue';
import TeachingIntro from '~/components/Teaching/TeachingIntro.vue';
import TeachingPhilosophy from '~/components/Teaching/TeachingPhilosophy.vue';

</script>

<template>
    <TeachingIntro />
    <TeachingPhilosophy />
    
    <div id="teaching-courses" class="mt-16">
    <CourseTaught />
   </div>
    <StudentTestimonials />
    <TeachingAward />
</template>
<template>
  <section class="relative container mx-auto px-6 py-16 max-w-6xl">
    
    <!-- Hero Content -->
    <div class="relative z-10 bg-gray-800 p-12 rounded-xl shadow-lg text-center">
      
      <!-- Title -->
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">
        Teaching Philosophy & Courses
      </h1>
      
      <!-- Accent Divider -->
      <div class="mx-auto w-24 h-1 bg-indigo-400 rounded mb-6"></div>
      
      <!-- Subtitle -->
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        My teaching philosophy is rooted in
        <span class="text-indigo-400 font-semibold">active engagement, curiosity, and accessibility</span>.
        I design learning experiences that challenge students intellectually while providing the support needed to grow.
        I emphasize <span class="text-indigo-400 font-semibold">conceptual clarity, careful observation, and evidence-based reasoning</span>,
        fostering confidence, analytical skills, and independent thinking in scientific inquiry.
      </p>

      <!-- Optional CTA Button (scroll to courses or CV) -->
      <div class="mt-8">
        <a
          href="#teaching-courses"
          class="inline-block px-6 py-3 rounded-full bg-amber-400 text-white font-semibold shadow-lg hover:bg-amber-600 hover:text-gray-100 transition transform hover:-translate-y-1"
        >
          View Courses ↓
        </a>
      </div>

      <!-- Optional small note -->
      <p class="text-gray-400 text-sm mt-2">
        Explore my full teaching philosophy, course list, and mentoring experience below.
      </p>

    </div>

  </section>
</template>

<script setup>
// Static component, no props needed
</script>

<style scoped>
/* Optional subtle floating animation for consistency */
@keyframes floatPattern {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}
img {
  animation: floatPattern 15s ease-in-out infinite;
}
</style>

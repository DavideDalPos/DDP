<template>
  <section class="relative container mx-auto px-6 py-16 max-w-6xl">
    
    <!-- Hero Content -->
    <div class="bg-white p-12 rounded-lg shadow-lg mb-12 text-center border-t-15 border-[#ffb86c]">
      
      <!-- Title -->
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-700 mb-4">
        Teaching Philosophy & Courses
      </h1>
      
      <!-- Accent Divider -->
      <div class="mx-auto w-24 h-1 bg-[#ffb86c] rounded mb-6"></div>
      
      <!-- Subtitle -->
      <p class="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
        My teaching philosophy is rooted in
        <span class="font-semibold">active engagement, curiosity, and accessibility</span>.
        I design learning experiences that challenge students intellectually while providing the support needed to grow.
        I emphasize <span class="font-semibold">conceptual clarity, careful observation, and evidence-based reasoning</span>,
        fostering confidence, analytical skills, and independent thinking in scientific inquiry.
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

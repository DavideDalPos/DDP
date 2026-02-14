<template>
  <section class="relative container mx-auto px-6 py-16 max-w-6xl">
    

    <!-- Hero Content -->
    <div class="relative z-10 bg-gray-800 p-12 rounded-xl shadow-lg text-center">
      
      <!-- Title -->
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">
        Species Map & Descriptions
      </h1>
      
      <!-- Accent Divider -->
      <div class="mx-auto w-24 h-1 bg-amber-400 rounded mb-6"></div>
      
      <!-- Paragraph -->
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        Explore all the species I have described, with each 
        <span class="text-amber-400 font-semibold">dot representing the Holotype location</span>. 
        Below the map, you can browse the full species list. 
        Clicking on a species will redirect you to the original publication.
      </p>

      <!-- Call-to-Action Button -->
      <div class="mt-8">
        <a 
          href="#species-list"
          class="inline-block bg-amber-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-amber-500 transition"
        >
          Explore Species List
        </a>
      </div>
      
    </div>
    
  </section>
</template>

<script setup>
// Static component: no JS needed
</script>

<style scoped>
/* Optional: subtle floating effect for background pattern */
@keyframes floatPattern {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}
img {
  animation: floatPattern 15s ease-in-out infinite;
}
</style>

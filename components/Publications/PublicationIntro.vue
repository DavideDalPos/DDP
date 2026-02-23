<template>
  <section class="relative container mx-auto px-6 py-16 max-w-6xl">
    
    <!-- Hero Content -->
    <div class="bg-white p-12 rounded-lg shadow-lg mb-12 text-center border-t-15 border-[#ffb86c]">
      
      <!-- Title -->
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-700 mb-4">
        Publications
      </h1>
      
      <!-- Accent Divider -->
      <div class="mx-auto w-24 h-1 bg-[#ffb86c] rounded mb-6"></div>
      
      <!-- Subtitle -->
      <p class="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
        Browse my body of research, including journal articles, book chapters, and collaborative studies. 
        Each entry highlights my contributions to <span class="font-semibold">taxonomy, systematics, and evolutionary biology</span>.
      </p>

      <!-- Optional small note -->
      <p class="text-gray-400 text-sm mt-2">
        Use the search bar below to filter by topic, year, or co-author.
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

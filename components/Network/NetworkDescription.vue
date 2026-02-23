<template>
  <section class='container mx-auto px-6 mt-12 mb-8 max-w-6xl'>
    
    <!-- Hero Content -->
    <div class="bg-white p-12 rounded-lg shadow-lg mb-12 text-center border-t-15 border-[#ffb86c]">


      <!-- Title -->
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-700 mb-4 leading-tight">
        Research Network Overview
      </h1>
      
      <!-- Accent Divider -->
      <div class="mx-auto w-28 h-1 bg-[#ffb86c] rounded-full mb-6"></div>
      
      <!-- Paragraph -->
      <p class="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
        The maps below provide an overview of my professional network. Each marker represents a collaborator or an institution, 
        while clusters indicate multiple entries in the same region.
      </p>
      
      <!-- Optional subtle call-to-action -->
      <p class="mt-6 text-sm text-gray-400">
        Explore the maps to see details about each person, collaborator, and institution.
      </p>
      
    </div>
    
  </section>
</template>

<script setup>
// Static content only
</script>

<style scoped>
/* Subtle floating animation for any decorative icons */
@keyframes floatPattern {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

img.decorative {
  animation: floatPattern 12s ease-in-out infinite;
}

@media (max-width: 640px) {
  .max-w-6xl {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>

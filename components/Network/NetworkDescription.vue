<template>
  <section class="relative container mx-auto px-6 py-20 max-w-6xl">
    
    <!-- Hero Content -->
    <div class="relative z-10 bg-gray-900 p-12 sm:p-16 rounded-2xl shadow-xl text-center overflow-hidden">
      
      <!-- Accent Pattern (subtle background gradient) -->
      <div class="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-amber-400 to-purple-400"></div>

      <!-- Title -->
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
        Research Network Overview
      </h1>
      
      <!-- Accent Divider -->
      <div class="mx-auto w-28 h-1 bg-amber-400 rounded-full mb-6"></div>
      
      <!-- Paragraph -->
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
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

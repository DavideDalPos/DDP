<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900">
    <!-- Main content -->
    <LayoutHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutFooter from '@/components/Layout/LayoutFooter.vue';
import LayoutHeader from '@/components/Layout/LayoutHeader.vue';
</script>

<style scoped>
/* Optional: ensure smooth font and layout rendering */
body, html {
  margin: 0;
  padding: 0;
}
</style>

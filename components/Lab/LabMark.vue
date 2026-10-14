<template>
  <!-- The EPIC mark: a parasitoid wasp in outline -->
  <svg
    class="epic-mark"
    viewBox="0 0 48 48"
    role="img"
    aria-label="EPIC Lab"
  >
    <g :stroke="body" stroke-width="1.1" :fill="body" fill-opacity="0.16">
      <ellipse cx="14.5" cy="18" rx="11" ry="5.2" transform="rotate(-24 14.5 18)" />
      <ellipse cx="16.5" cy="28.5" rx="8" ry="4.2" transform="rotate(22 16.5 28.5)" />
      <ellipse cx="33.5" cy="18" rx="11" ry="5.2" transform="rotate(24 33.5 18)" />
      <ellipse cx="31.5" cy="28.5" rx="8" ry="4.2" transform="rotate(-22 31.5 28.5)" />
    </g>
    <g :fill="body" :stroke="body">
      <path d="M22.3 9.6c-1-2.3-2.6-4-4.6-4.9M25.7 9.6c1-2.3 2.6-4 4.6-4.9" fill="none" stroke-width="1.4" stroke-linecap="round" />
      <circle cx="24" cy="12" r="3" stroke="none" />
      <ellipse cx="24" cy="19.5" rx="3.2" ry="4.4" stroke="none" />
      <path d="M24 23.6c2.6 0 3.9 3.6 3.9 8.4 0 6.2-2.4 11.3-3.9 12.4-1.5-1.1-3.9-6.2-3.9-12.4 0-4.8 1.3-8.4 3.9-8.4Z" stroke="none" />
    </g>
  </svg>
</template>

<script setup>
defineProps({
  // colour of the drawing
  body: { type: String, default: '#ffffff' },
  // kept for compatibility; the mark no longer animates
  animated: { type: Boolean, default: false }
})
</script>

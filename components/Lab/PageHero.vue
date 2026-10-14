<template>
  <section class="hero relative border-b border-line">
    <div class="relative mx-auto max-w-7xl px-5 pb-14 pt-16 sm:pb-16 sm:pt-20 lg:px-8">
      <p v-if="kicker" class="kicker fade">{{ kicker }}</p>
      <h1 class="fade mt-4 max-w-4xl text-4xl font-semibold leading-[1.08] text-ink sm:text-[3.4rem]" style="animation-delay: 80ms">
        {{ title }}
      </h1>
      <p v-if="lede" class="fade mt-6 max-w-2xl text-lg leading-relaxed text-muted" style="animation-delay: 160ms">
        {{ lede }}
      </p>
      <div v-if="$slots.default" class="fade mt-8 flex flex-wrap gap-3" style="animation-delay: 240ms">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  kicker: { type: String, default: '' },
  title: { type: String, required: true },
  lede: { type: String, default: '' },
  // kept for compatibility (pillar key); the hero no longer changes colour
  tone: { type: String, default: '' }
})
</script>

<style scoped>
.hero {
  background: var(--color-paper-2);
}
.fade {
  opacity: 0;
  transform: translateY(8px);
  animation: fade-up 0.7s ease forwards;
}
@keyframes fade-up {
  to {
    opacity: 1;
    transform: none;
  }
}
</style>

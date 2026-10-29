<template>
  <section class="hero relative isolate overflow-hidden bg-ink text-white">
    <ClientOnly>
      <LabHeroCanvas />
    </ClientOnly>
    <div class="shade" />

    <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:pt-24 lg:grid-cols-12 lg:px-8 lg:pb-28">
      <!-- Text -->
      <div class="lg:col-span-7">
        <p class="fade text-xs font-semibold uppercase tracking-[0.22em] text-accent-light" style="animation-delay: 80ms">
          {{ lab.division }} · {{ lab.university }}
        </p>

        <h1 class="fade mt-6 font-display leading-none" style="animation-delay: 180ms">
          <span class="block text-[clamp(4.5rem,13vw,8.5rem)] font-semibold tracking-tight">EPIC Lab</span>
        </h1>

        <p class="fade mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl" style="animation-delay: 300ms">
          Species <b class="initial">E</b>xploration, <b class="initial">P</b>henomics, <b class="initial">I</b>nformatics
          &amp; <b class="initial">C</b>onservation
        </p>

        <div class="fade mt-8 h-px w-24 bg-accent-light/70" style="animation-delay: 380ms" />

        <p class="fade mt-8 max-w-xl text-base leading-relaxed text-white/65" style="animation-delay: 440ms">
          We study the diversity of insects — parasitoid wasps above all — through taxonomy, comparative anatomy and
          biodiversity informatics, using the collections of the {{ lab.museum.name }}.
        </p>

        <div class="fade mt-10 flex flex-wrap gap-3" style="animation-delay: 540ms">
          <NuxtLink to="/research" class="btn bg-white text-ink hover:bg-accent-soft">Our research <span class="arrow">→</span></NuxtLink>
          <NuxtLink to="/join" class="btn btn-ghost text-white/90 hover:bg-white/10">Join the lab</NuxtLink>
        </div>
      </div>

      <!-- Self-drawing Darwin wasp -->
      <div class="fade lg:col-span-5" style="animation-delay: 400ms">
        <ClientOnly>
          <HomeSpecimenExplorer />
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup>
import { lab } from '~/components/Lab/labData.js'
</script>

<style scoped>
.hero {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
}
.hero > div:not(.shade) {
  width: 100%;
}
.shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(ellipse at 15% 20%, rgb(140 94 42 / 0.16), transparent 55%);
  pointer-events: none;
}
.initial {
  color: var(--color-accent-light);
  font-weight: 600;
}
.fade {
  opacity: 0;
  transform: translateY(10px);
  animation: fade-up 0.8s ease forwards;
}
@keyframes fade-up {
  to {
    opacity: 1;
    transform: none;
  }
}
</style>

<template>
  <section class="relative flex flex-col items-center justify-center overflow-hidden py-16 sm:py-24 md:py-32">

    <!-- Particle Network Canvas -->

    <div class="text-center px-4 relative z-10 max-w-2xl mx-auto">

      <!-- Profile Image -->
      <div class="mx-auto w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-md ring-4 ring-[#e7e4da] opacity-0 animate-fade-in animation-delay-100">
        <img src="/images/profile3.jpg" alt="Davide Dal Pos" class="w-full h-full object-cover" />
      </div>

      <!-- Name & Title -->
      <div class="mt-6 space-y-2 opacity-0 animate-fade-in animation-delay-300">
        <h1 class="text-[#26333b] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Davide Dal Pos</h1>
        <p class="text-gray-600 text-base sm:text-lg italic">Postdoctoral Scholar, University of Central Florida</p>
      </div>

      <!-- Welcome Message + Typewriter -->
      <p class="text-gray-700 text-xl sm:text-2xl md:text-3xl mt-8 max-w-xl mx-auto leading-relaxed opacity-0 animate-fade-in animation-delay-700">
        Hi! Welcome to my academic website. <br />
        I work on <span class="text-[#a85a2e] font-semibold" id="typewriter"></span>
      </p>

    </div>

    <!-- Featured CTA + Publications -->
    <FeaturedCTA />

  </section>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import FeaturedCTA from '~/components/Home/FeaturedCTA.vue'

const props = defineProps({
  textColor: { type: String, default: 'text-white' },
  subtitleColor: { type: String, default: 'text-gray-300' },
  italicColor: { type: String, default: 'text-gray-400' },
  highlightColor: { type: String, default: 'text-amber-400' }
})

const networkCanvas = ref(null)

onMounted(() => {
  const el = document.getElementById('typewriter')
  const texts = [
    'Evolutionary Morphology',
    'Phenomics',
    'Taxonomy & Systematics',
    'Integrative Biology Research',
    'Comparative Anatomy',
    'Ontology',
    'Databasing',
    'Semantics'
  ]
  let i = 0, j = 0, isDeleting = false

  function type() {
    const fullText = texts[i]
    let currentText = ''
    if (isDeleting) {
      currentText = fullText.substring(0, j)
      j--
    } else {
      currentText = fullText.substring(0, j)
      j++
    }
    el.textContent = currentText
    if (!isDeleting && j === fullText.length + 1) {
      isDeleting = true
      setTimeout(type, 1000)
    } else if (isDeleting && j === 0) {
      isDeleting = false
      i = (i + 1) % texts.length
      setTimeout(type, 300)
    } else {
      setTimeout(type, isDeleting ? 50 : 100)
    }
  }
  type()

  // -------------------
  // Particle Network
  // -------------------
  
})
</script>

<style scoped>
/* Fade-in Animation */
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 1s ease forwards; }
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-700 { animation-delay: 0.7s; }
</style>
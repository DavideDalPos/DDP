<template>
  <section class="relative bg-white min-h-screen flex items-center justify-center overflow-hidden px-4">
    
    <!-- Profile + Cards Container -->
    <div class="flex flex-col md:flex-row items-center w-full max-w-6xl transition-all duration-700"
         :class="{'md:justify-start gap-12': showCards, 'justify-center': !showCards}">

      <!-- Profile Image -->
      <transition name="slide-fade">
        <div v-if="!showCards || showCards" 
             class="mx-auto md:mx-0 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-md flex-shrink-0">
          <img src="/images/profile3.jpg" alt="Davide Dal Pos" class="w-full h-full object-cover" />
        </div>
      </transition>

      <!-- Info + Typewriter -->
      <div class="mt-6 md:mt-0 text-center md:text-left">
        <h1 class="text-4xl font-bold text-gray-900">Davide Dal Pos</h1>
        <p class="text-lg text-gray-700">Postdoctoral Scholar, University of Central Florida</p>
        <p class="text-md text-gray-600 italic">Morphology and Evolution of Parasitoid Wasps</p>

        <!-- Typewriter -->
        <p class="text-2xl md:text-3xl text-gray-600 mt-4">
          Hi! I work on <span class="text-indigo-600 font-semibold">{{ currentType }}</span>
        </p>

        <!-- Reveal Cards Button -->
        <button v-if="!showCards"
                @click="showCards = true"
                class="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          Explore My Work
        </button>
      </div>

      <!-- Cards -->
      <transition name="fade-slide">
        <div v-if="showCards" class="mt-12 md:mt-0 grid gap-6 md:grid-cols-1 lg:grid-cols-3 md:ml-12">
          <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">Research Interests</h3>
            <ul class="text-gray-700 space-y-1 mb-2">
              <li>Evolutionary Morphology</li>
              <li>Phenomics</li>
              <li>Comparative Anatomy</li>
            </ul>
            <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Learn More</button>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">Species I Described</h3>
            <p class="text-gray-700 mb-2">A curated list of Ichneumonidae species I have published and described.</p>
            <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">View Species</button>
          </div>

          <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">Teaching</h3>
            <p class="text-gray-700 mb-2">Courses taught, mentoring, and other educational contributions.</p>
            <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">See Teaching</button>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const showCards = ref(false)

// Simple Typewriter
const types = ['Evolutionary Morphology', 'Phenomics', 'Taxonomy & Systematics']
const currentType = ref('')
let i = 0, j = 0, deleting = false

function typeWriter() {
  const full = types[i]
  if (deleting) {
    currentType.value = full.substring(0, j)
    j--
  } else {
    currentType.value = full.substring(0, j)
    j++
  }

  if (!deleting && j === full.length + 1) {
    deleting = true
    setTimeout(typeWriter, 1000)
  } else if (deleting && j === 0) {
    deleting = false
    i = (i + 1) % types.length
    setTimeout(typeWriter, 300)
  } else {
    setTimeout(typeWriter, deleting ? 50 : 100)
  }
}

onMounted(() => typeWriter())
</script>

<style scoped>
/* Slide + Fade Animations */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.7s ease;
}
.slide-fade-enter-from {
  transform: translateX(-100px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.7s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>

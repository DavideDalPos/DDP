<template>
  <section class="relative bg-white min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Particle Network Canvas -->
    <canvas ref="networkCanvas" class="absolute inset-0 z-0"></canvas>

    <div class="text-center px-1 relative z-10">

      <!-- Profile Image -->
      <transition name="fade" appear>
        <div 
          class="mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-md opacity-0 animate-fade-in animation-delay-100 transform transition-all duration-700"
        >
          <img
            src="/images/profile3.jpg"
            alt="Davide Dal Pos"
            class="w-full h-full object-cover"
          />
        </div>
      </transition>

      <!-- Name & Title -->
      <transition name="fade" appear>
        <div class="mt-6 space-y-2 opacity-0 animate-fade-in animation-delay-300">
          <h1 class="text-4xl font-bold text-gray-900">Davide Dal Pos</h1>
          <p class="text-lg text-gray-700">Postdoctoral Scholar, University of Central Florida</p>
          <p class="text-md text-gray-600 italic">Morphology and Evolution of Parasitoid Wasps</p>
        </div>
      </transition>

      <!-- Welcome Message + Typewriter -->
      <transition name="fade" appear>
        <p class="text-2xl md:text-3xl text-gray-600 mt-8 opacity-0 animate-fade-in animation-delay-700">
          Hi! Welcome to my academic website. <br />
          I work on <span id="typewriter" class="text-indigo-600 font-semibold"></span>
        </p>
      </transition>

      <!-- Explore Button -->
      <div v-if="!showCards" class="mt-6">
        <button 
          @click="showCards = true"
          class="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Explore My Work
        </button>
      </div>

      <!-- Cards Section -->
      <transition name="fade-slide">
        <div v-if="showCards" class="mt-12 grid gap-6 md:grid-cols-3 md:justify-start">

          <!-- Card 1: Research Interests -->
          <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">Research Interests</h3>
            <ul class="text-gray-700 mb-2 space-y-1">
              <li>Evolutionary Morphology</li>
              <li>Phenomics</li>
              <li>Comparative Anatomy</li>
            </ul>
            <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Learn More
            </button>
          </div>

          <!-- Card 2: Species I Described -->
          <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">Species I Described</h3>
            <p class="text-gray-700 mb-2">
              A curated list of Ichneumonidae species I have published and described.
            </p>
            <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              View Species
            </button>
          </div>

          <!-- Card 3: Teaching -->
          <div class="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300">
            <h3 class="text-xl font-semibold text-indigo-600 mb-2">Teaching</h3>
            <p class="text-gray-700 mb-2">
              Courses taught, mentoring, and other educational contributions.
            </p>
            <button class="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              See Teaching
            </button>
          </div>

        </div>
      </transition>

    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const networkCanvas = ref(null)
const showCards = ref(false)

onMounted(() => {
  // -------------------
  // Typewriter Effect
  // -------------------
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
  const canvas = networkCanvas.value
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = []
  const particleCount = 60
  const maxDistance = 150

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw particles
    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(79,70,229,0.3)'
      ctx.fill()
    })

    // Draw lines
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDistance) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(79,70,229,${1 - dist / maxDistance})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()

  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    particles.forEach(p => {
      p.x = Math.random() * canvas.width
      p.y = Math.random() * canvas.height
    })
  })
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

/* Slide + Fade Animation for cards */
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

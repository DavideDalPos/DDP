<template>
  <div class="relative flex flex-col min-h-screen bg-gray-900 text-white">
    <!-- Particle Background -->
    <canvas ref="networkCanvas" class="absolute inset-0 z-0"></canvas>

    <!-- Page Content -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <LayoutHeader />
      <main class="flex-grow">
        <slot />
      </main>
      <LayoutFooter />
    </div>
  </div>
</template>

<script setup>
import LayoutFooter from '@/components/Layout/LayoutFooter.vue'
import LayoutHeader from '@/components/Layout/LayoutHeader.vue'
import { onMounted, ref } from 'vue'

const networkCanvas = ref(null)

onMounted(() => {
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
      ctx.fillStyle = 'rgba(255,255,255,0.8)'
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
          ctx.strokeStyle = `rgba(255,255,255,${1 - dist / maxDistance})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()

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
/* Ensure main content sits above canvas */
</style>

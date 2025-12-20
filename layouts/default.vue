<template>
  <div class="relative flex flex-col min-h-screen bg-gray-700 text-white">
    <canvas ref="networkCanvas" class="absolute inset-0 z-0"></canvas>
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

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = document.documentElement.scrollHeight
  }

  // Initial size
  resizeCanvas()

  // List of insect images
  const insectPaths = [
    '/images/wasp1.png',
    '/images/beetle.png',
    '/images/fly.png',
    '/images/dragonfly.png',
    '/images/butterfly.png',
    '/images/cicada.png',
    '/images/grasshopper.png',
    '/images/earwig.png',
    '/images/flea.png'
  ]

  const insectImages = insectPaths.map(path => {
    const img = new Image()
    img.src = path
    return img
  })

  const insects = []
  const insectCount = 40

  for (let i = 0; i < insectCount; i++) {
    const img = insectImages[Math.floor(Math.random() * insectImages.length)]
    insects.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      size: 20 + Math.random() * 15,
      img,
      rotation: Math.random() * Math.PI * 2
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    insects.forEach(ins => {
      ins.x += ins.vx
      ins.y += ins.vy
      ins.rotation += 0.01

      if (ins.x < 0 || ins.x > canvas.width) ins.vx *= -1
      if (ins.y < 0 || ins.y > canvas.height) ins.vy *= -1

      ctx.save()
      ctx.translate(ins.x, ins.y)
      ctx.rotate(ins.rotation)
      ctx.drawImage(ins.img, -ins.size / 2, -ins.size / 2, ins.size, ins.size)
      ctx.restore()
    })

    requestAnimationFrame(animate)
  }

  Promise.all(insectImages.map(img => new Promise(resolve => (img.onload = resolve))))
    .then(() => animate())

  // 🔑 KEEP CANVAS SYNCED WITH PAGE HEIGHT
  window.addEventListener('resize', () => {
    resizeCanvas()
    insects.forEach(ins => {
      ins.x = Math.random() * canvas.width
      ins.y = Math.random() * canvas.height
    })
  })
})

</script>

<style scoped>
/* canvas already covers full background */
</style>

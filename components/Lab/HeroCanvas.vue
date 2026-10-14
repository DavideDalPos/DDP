<template>
  <canvas
    ref="canvas"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>

<script setup>
// A slow, faint network of points, joined when they
// drift close — specimens becoming connected data. It leans gently toward the
// pointer, pauses when off-screen and stays still for reduced-motion users.
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  density: { type: Number, default: 1 }
})

const canvas = ref(null)
const COLORS = ['#c9a06a', '#ffffff', '#ffffff', '#ffffff']
let ctx, w, h, dpr, raf, points = [], visible = true, io
const mouse = { x: -9999, y: -9999 }

function size() {
  const el = canvas.value
  const r = el.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = r.width
  h = r.height
  el.width = w * dpr
  el.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  const n = Math.round(Math.min(70, (w * h) / 18000) * props.density)
  points = Array.from({ length: n }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.14,
    vy: (Math.random() - 0.5) * 0.14,
    r: Math.random() * 1.1 + 0.6,
    c: COLORS[Math.floor(Math.random() * COLORS.length)]
  }))
}

function draw(move = true) {
  ctx.clearRect(0, 0, w, h)
  const LINK = 120
  for (const p of points) {
    if (move) {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const d2 = dx * dx + dy * dy
      if (d2 < 160 * 160) {
        p.vx += dx * 0.000004
        p.vy += dy * 0.000004
      }
      p.vx = Math.max(-0.25, Math.min(0.25, p.vx))
      p.vy = Math.max(-0.25, Math.min(0.25, p.vy))
      p.x += p.vx
      p.y += p.vy
      if (p.x < -10) p.x = w + 10
      if (p.x > w + 10) p.x = -10
      if (p.y < -10) p.y = h + 10
      if (p.y > h + 10) p.y = -10
    }
  }
  for (let i = 0; i < points.length; i++) {
    const a = points[i]
    for (let j = i + 1; j < points.length; j++) {
      const b = points[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const d = Math.hypot(dx, dy)
      if (d < LINK) {
        ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK) * 0.09})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }
  for (const p of points) {
    ctx.fillStyle = p.c
    ctx.globalAlpha = 0.45
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function loop() {
  if (visible) draw(true)
  raf = requestAnimationFrame(loop)
}

function onMove(e) {
  const r = canvas.value.getBoundingClientRect()
  mouse.x = e.clientX - r.left
  mouse.y = e.clientY - r.top
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  size()
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (still) {
    draw(false)
  } else {
    loop()
    window.addEventListener('pointermove', onMove, { passive: true })
  }
  window.addEventListener('resize', size)
  io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(canvas.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('resize', size)
  io?.disconnect()
})
</script>

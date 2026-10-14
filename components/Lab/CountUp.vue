<template>
  <span ref="el">{{ shown }}{{ suffix }}</span>
</template>

<script setup>
// Counts up to `to` the first time it scrolls into view.
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  to: { type: Number, required: true },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 1600 }
})

const el = ref(null)
// The final number is in the HTML, so it is right without JavaScript
const shown = ref(props.to.toLocaleString('en-US'))
let io, started = false

function run() {
  started = true
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - t, 3)
    shown.value = Math.round(props.to * eased).toLocaleString('en-US')
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  shown.value = '0'
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !started) {
      run()
      io.disconnect()
    }
  })
  io.observe(el.value)
})
watch(
  () => props.to,
  (v) => {
    if (started) shown.value = v.toLocaleString('en-US')
  }
)
onBeforeUnmount(() => io?.disconnect())
</script>

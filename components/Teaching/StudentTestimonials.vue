<template>
  <div class="container mx-auto p-6 pb-10 max-w-4xl">
    <h2 class="text-2xl font-semibold mb-6 text-center text-amber-400">Student Testimonials</h2>

    <div class="overflow-hidden relative">
      <div class="flex transition-transform duration-500" :style="`transform: translateX(-${currentIndex * 100}%);`">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index" 
          class="min-w-full p-8 bg-gray-800 rounded shadow-lg"
        >
          <p class="italic text-gray-200 mb-2">"{{ testimonial.quote }}"</p>
          <p class="text-right text-sm font-medium text-gray-400">– {{ testimonial.author }}</p>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          @click="currentIndex = index"
          :class="index === currentIndex ? 'bg-amber-400' : 'bg-gray-400'"
          class="w-3 h-3 rounded-full cursor-pointer transition"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const testimonials = [
  { quote: 'Professor Dal Pos made the material engaging and accessible. I learned so much about insect systematics and taxonomy!', author: 'Former Student' },
  { quote: 'The mentorship I received in his lab gave me confidence to pursue research and get published.', author: 'Former Student' },
  { quote: 'I appreciated the hands-on guidance and support throughout the course. It made a huge difference!', author: 'Former Student' }
]

const currentIndex = ref(0)

// Autoplay
let interval = null
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}

onMounted(() => {
  interval = setInterval(next, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-16 text-center">
    <h2 class="text-3xl font-bold text-gray-900">Latest Publications</h2>
    <p class="text-gray-600 mt-2">
      A selection of my recent research contributions.
    </p>

    <transition name="fade">
      <div
        v-if="currentPub"
        class="mt-10 p-8 rounded-2xl shadow-md bg-gray-50"
      >
        <h3 class="text-2xl font-semibold text-indigo-700">
          {{ currentPub.title }}
        </h3>
        <p class="mt-2 text-gray-700">
          {{ currentPub.journal }}
        </p>
        <p class="mt-1 text-gray-500 italic">
          {{ currentPub.year }}
        </p>

        <NuxtLink
          :to="currentPub.link"
          class="inline-block mt-4 text-indigo-600 font-medium hover:underline"
        >
          Read Publication →
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const publications = [
  {
    title: "A host driven parasitoid syndrome in Ichneumonidae",
    journal: "ZooKeys",
    year: 2024,
    link: "/publications/2024-parasitoid-syndrome"
  },
  {
    title: "Convergent evolution of woodboring parasitoid traits",
    journal: "PLOS ONE",
    year: 2023,
    link: "/publications/2023-woodboring-evolution"
  },
  {
    title: "Morphological evolution of Ichneumonidae",
    journal: "Systematic Entomology",
    year: 2022,
    link: "/publications/2022-morphology-evolution"
  }
]

const currentPub = ref(null)
let index = 0

onMounted(() => {
  currentPub.value = publications[0]

  setInterval(() => {
    index = (index + 1) % publications.length
    currentPub.value = publications[index]
  }, 6000)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .6s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="container mx-auto px-6 my-16 max-w-6xl">

    <!-- Hero Intro -->
    <div class="bg-gray-50 p-12 rounded-xl shadow-lg mb-16">
      <h1 class="text-5xl text-center font-extrabold mb-6 text-gray-800">
        Phenomics – Evolutionary Morphology
      </h1>
      <p class="text-lg sm:text-xl text-gray-700 leading-relaxed text-center">
        My primary interest is to push the <strong>Phenomics era</strong> into the emerging <strong>Phylomics era</strong>, integrating large-scale morphological data with genomic frameworks to understand the evolution of form, function, and diversity in insects.
      </p>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      <!-- Left: Main Text (2/3 width) -->
      <div class="col-span-2 flex flex-col space-y-6 text-gray-800 text-justify">
        <p><strong>Phenomics</strong> is the large-scale study of organismal form, function, and variation, and how these traits evolve over time.</p>
        <p>My research focuses on understanding <strong>why insects look the way they do</strong> and <strong>how morphological traits evolve</strong> in response to ecological pressures and evolutionary history. By integrating detailed skeletomuscular anatomy, advanced imaging technologies, and phylogenetic frameworks, I explore the mechanisms that shape the extraordinary diversity of forms in parasitoid wasps.</p>
        <p>I actively <strong>generate anatomical ontologies</strong> and use them as a core component of my evolutionary studies. Ontologies provide a <strong>semantic, interoperable, and machine-readable</strong> framework for describing morphology, ensuring that anatomical terms are standardized, logically structured, and comparable across taxa and studies. By building and applying resources such as the <strong>Hymenoptera Anatomy Ontology (HAO)</strong>, I enable large-scale integration of morphological data and lay the groundwork for future <strong>AI-assisted analyses</strong>.</p>
      </div>

      <!-- Right: Info Card (1/3 width) -->
      <div class="flex flex-col space-y-6">

        <div class="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col justify-start space-y-6 text-gray-800 w-full">
          <h2 class="text-xl font-bold text-gray-700">Phenomics Highlights</h2>

          <div class="flex flex-col space-y-3">
            <div class="flex justify-between items-center">
              <span class="font-medium">Anatomical terms</span>
              <span class="text-blue-600 font-semibold">5,000+</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Ontologies used</span>
              <span class="text-blue-600 font-semibold">HAO</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Species studied</span>
              <span class="text-blue-600 font-semibold">~50</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Tools used</span>
              <span class="text-blue-600 font-semibold">Ontologies, AI, HAO</span>
            </div>
          </div>

          <a
            href="http://www.hymao.org"
            target="_blank"
            class="mt-4 inline-block text-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 rounded transition"
          >
            Explore the Hymenoptera Anatomy Ontology (HAO)
          </a>
        </div>

        <!-- Optional Image below card -->
        <div class="flex justify-center">
          <img
            src="/public/images/Phenomics.png"
            alt="Phylomics Era Diagram"
            class="rounded-xl w-full max-w-xs cursor-pointer"
            @click="openLightbox('/images/Phenomics.png')"
          />
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

/* LIGHTBOX state */
const lightboxSrc = ref(null)
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const isDragging = ref(false)
let startX = 0
let startY = 0

function openLightbox(src) {
  lightboxSrc.value = src
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

function closeLightbox() {
  lightboxSrc.value = null
}

function zoom(event) {
  const delta = event.deltaY > 0 ? -0.1 : 0.1
  scale.value = Math.min(Math.max(scale.value + delta, 1), 5)
}

function startDrag(event) {
  isDragging.value = true
  startX = event.clientX - translateX.value
  startY = event.clientY - translateY.value
}

function drag(event) {
  if (!isDragging.value) return
  translateX.value = event.clientX - startX
  translateY.value = event.clientY - startY
}

function stopDrag() {
  isDragging.value = false
}
</script>

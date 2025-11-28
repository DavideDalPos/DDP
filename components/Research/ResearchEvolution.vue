<template> <div class="container mx-auto px-6 my-16 max-w-5xl"> 
    <h1 class="text-4xl font-extrabold mb-2 text-gray-700 mb-10">Phenomics – Evolutionary Morphology</h1> 
    <div class="space-y-4 text-justify text-base sm:text-lg text-gray-800 leading-relaxed"> 
        <p><strong>Phenomics</strong> is the large-scale study of organismal form, function, and variation, and how these traits evolve over time.</p> <p>My research in phenomics focuses on understanding <strong>why insects look the way they do</strong> and <strong>how morphological traits evolve</strong> in response to ecological pressures and evolutionary history. By integrating detailed skeletomuscular anatomy, advanced imaging technologies, and phylogenetic frameworks, I explore the mechanisms that shape the extraordinary diversity of forms in parasitoid wasps. This work allows me to identify key morphological innovations, reconstruct evolutionary transformations, and link traits to behavior, ecology, and host specialization.</p> 
        <p>I actively <strong>generate anatomical ontologies</strong> and use them as a core component of my evolutionary studies. Ontologies provide a <strong>semantic, interoperable, and machine-readable</strong> framework for describing morphology, ensuring that anatomical terms are standardized, logically structured, and comparable across taxa and studies. By building and applying resources such as the <strong>Hymenoptera Anatomy Ontology (HAO)</strong>, I enable large-scale integration of morphological data and lay the groundwork for future <strong>AI-assisted analyses</strong> that can automate character extraction, annotation, and evolutionary interpretation.</p> 
        <p class="mt-6 text-base sm:text-lg text-gray-800 leading-relaxed">Below is a conceptual illustration of the emerging <strong>Phylomics era</strong>, where phenomics and genomics converge. On the left, phenomics captures large-scale morphological complexity; on the right, genomics provides the molecular framework. Together, they form an integrated approach for understanding the evolution of biodiversity.</p>

      <!-- IMAGE (click to open) -->
      <div class="flex justify-center my-6">
        <img
          src="/public/images/Phenomics.png"
          alt="Phylomics Era Diagram"
          class="rounded-xl w-full max-w-3xl cursor-pointer"
          @click="openLightbox('/images/Phenomics.png')"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#research-areas" class="px-6 py-3 bg-tertiary text-white rounded-xl text-center hover:bg-gray-800 transition shadow-lg">Other Research Areas</a>
        <a href="#teaching" class="px-6 py-3 bg-novenary text-white rounded-xl text-center hover:bg-gray-600 transition shadow-lg">Teaching</a>
      </div>
    </div>

    <!-- LIGHTBOX: zoom + drag -->
    <div
      v-if="lightboxSrc"
      class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-center p-4 z-50 select-none"
      @click.self="closeLightbox"
    >
      <div
        class="cursor-grab"
        @mousedown="startDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @mousemove="drag"
        @wheel.prevent="zoom"
      >
        <img
          :src="lightboxSrc"
          class="rounded-xl shadow-xl"
          :style="{
            maxWidth: '80vw',
            maxHeight: '80vh',
            transform: 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scale + ')'
          }"
        />
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

/* Open image */
function openLightbox(src) {
  lightboxSrc.value = src
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

/* Close */
function closeLightbox() {
  lightboxSrc.value = null
}

/* ZOOM + DRAG logic */
const isDragging = ref(false)
let startX = 0
let startY = 0

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

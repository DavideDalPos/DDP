<template> <div class="container mx-auto px-6 my-16 max-w-5xl"> 
  <h1 class="text-4xl font-extrabold mb-2 text-gray-700 mb-10">Systematics of Parasitoid Wasps</h1> 
<div class="space-y-4 text-justify text-base sm:text-lg text-gray-800 leading-relaxed"> <p>One of my primary research interests is the <strong>systematics, taxonomy, and classification</strong> of parasitoid wasps, with a particular emphasis on <strong>Ichneumonidae</strong> (Hymenoptera, Ichneumonoidea), a hyperdiverse family with approximately <strong>25,000 described species</strong> and an estimated <strong>100,000 species</strong> yet to be described.</p> 
  <p>My taxonomic work has mainly focused on the subfamily <strong>Ichneumoninae</strong>, the largest within Ichneumonidae, where I have described <strong>several new species</strong>. However, my expertise extends across the entire family and even to related groups, such as <strong>Braconidae</strong>, allowing me to contribute broadly to parasitoid wasp systematics.</p> 
  <p>My research includes the <strong>description of new species</strong>, revisions of key genera, and the development of comprehensive resources such as the <strong>World Ichneumonidae Database (WID)</strong>, which provides researchers worldwide with essential tools for studying the <strong>evolution</strong>, <strong>ecology</strong>, and <strong>diversity</strong> of these ecologically important insects.</p> 
<p>Recently, I have investigated the evolution of key <strong>trait syndromes</strong> in Ichneumonidae and produced a <strong>phylogeny combining genomic data and Sanger sequences</strong> (Dal Pos & Sharanowski, 2024). I am currently working on the <strong>first calibrated phylogeny</strong> of the group, aimed at identifying major shifts in morphological evolution.</p>
    </div>

    <!-- Two phylogenetic trees -->
    <div class="mt-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <!-- Image 1 -->
        <div
          class="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer"
          @click="openLightbox('/images/DalPos2024_1.png')"
        >
          <img src="/public/images/DalPos2024_1.png" class="w-full object-contain" />
        </div>

        <!-- Image 2 -->
        <div
          class="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer"
          @click="openLightbox('/images/DalPos2024_2.png')"
        >
          <img src="/public/images/DalPos2024_2.png" class="w-full object-contain" />
        </div>
      </div>

      <p class="text-center text-sm text-gray-600 mt-4 italic">
        Phylogenetic trees from Dal Pos &amp; Sharanowski (2024). Evolution of trait syndromes in Ichneumonidae.
      </p>
    </div>

    <!-- Lightbox with zoom + drag -->
<div
  v-if="lightboxSrc"
  class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm flex justify-center items-center p-4 z-50 select-none"
  @click.self="closeLightbox"
>

  <!-- the BIG container must scroll, not clip -->
  <div
    class="cursor-grab"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
    @mousemove="drag"
    @wheel.prevent="zoom"
  >
    <img
      ref="zoomImg"
      :src="lightboxSrc"
      class="rounded-xl shadow-xl"
      :style="{
        width: 'auto',
        height: 'auto',
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

const lightboxSrc = ref(null)

function openLightbox(src) {
  lightboxSrc.value = src
  scale.value = 1
  translateX.value = 0
  translateY.value = 0
}

function closeLightbox() {
  lightboxSrc.value = null
}

/* --- ZOOM & PAN LOGIC --- */
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

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

<template>
<section class="container mx-auto px-6 mt-12 mb-8 max-w-6xl">


    <!-- Hero Intro -->
    <div class="bg-gray-800 p-12 rounded-xl shadow-lg mb-12 text-center">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4">
        Phenomics – Evolutionary Morphology
      </h1>
      <div class="mx-auto w-24 h-1 bg-amber-400 rounded mb-6"></div>
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
        My primary interest is to push the <span class="text-amber-400 font-semibold">Phenomics era</span> into the emerging 
        <span class="text-amber-400 font-semibold">Phylomics era</span>, integrating large-scale morphological data with genomic frameworks to understand the evolution of form, function, and diversity in insects.
      </p>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      <!-- Left: Main Text (2/3 width) -->
      <div class="col-span-2 flex flex-col space-y-6 bg-gray-50 p-6 rounded-xl shadow-sm text-gray-800 text-justify">
        <p class="text-base sm:text-lg leading-relaxed">
          <span class="text-amber-400 font-semibold">Phenomics</span> is the large-scale study of organismal form, function, and variation, and how these traits evolve over time.
        </p>
        <p class="text-base sm:text-lg leading-relaxed">
          My research focuses on understanding why insects look the way they do and how morphological traits evolve in response to ecological pressures and evolutionary history. 
          By integrating detailed skeletomuscular anatomy, advanced imaging technologies, and phylogenetic frameworks, I explore the mechanisms that shape the extraordinary diversity of forms in parasitoid wasps.
        </p>
        <p class="text-base sm:text-lg leading-relaxed">
          I actively <span class="text-amber-400 font-semibold">generate anatomical ontologies</span> and use them as a core component of my evolutionary studies. Ontologies provide a semantic, interoperable, and machine-readable framework for describing morphology, ensuring that anatomical terms are standardized, logically structured, and comparable across taxa and studies. 
          By building and applying resources such as the <span class="text-amber-400 font-semibold">Hymenoptera Anatomy Ontology (HAO)</span>, I enable large-scale integration of morphological data and lay the groundwork for future AI-assisted analyses.
        </p>
      </div>

      <!-- Right: Info Card (1/3 width) -->
      <div class="flex flex-col space-y-6">
        <div class="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col justify-start space-y-6 text-gray-800 w-full">
          <h2 class="text-xl font-bold text-gray-900">Phenomics Highlights</h2>

          <div class="flex flex-col space-y-3">
            <div class="flex justify-between items-center">
              <span class="font-medium">Anatomical terms</span>
              <span class="text-amber-400 font-semibold">5,000+</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Ontologies used</span>
              <span class="text-amber-400 font-semibold">HAO</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Species studied</span>
              <span class="text-amber-400 font-semibold">~50</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Tools used</span>
              <span class="text-amber-400 font-semibold">Ontologies, AI, HAO</span>
            </div>
          </div>

          <a
            href="http://portal.hymao.org/"
            target="_blank"
            class="mt-4 inline-block text-center bg-amber-400 text-gray-900 font-medium py-2 rounded hover:bg-amber-500 transition"
          >
            Explore the Hymenoptera Anatomy Ontology (HAO)
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>

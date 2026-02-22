<template>
<section class="container mx-auto px-6 mt-12 mb-8 max-w-6xl">

  <!-- Hero Intro -->
  <div class="bg-white p-12 rounded-lg shadow-lg mb-12 text-center border-t-8 border-red-300"">
    <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-700 mb-4">
      Phenomics & Hymenoptera Anatomy Ontology
    </h1>
    <div class="mx-auto w-24 h-1 bg-amber-400 rounded mb-6"></div>
    <p class="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
      My primary interest is to advance the <span class="text-amber-400 font-semibold">Phenomics era</span> into the emerging 
      <span class="text-amber-400 font-semibold">Phylomics era</span>, integrating large-scale morphological data with genomic frameworks to understand the evolution of form, function, and diversity in insects. Ontologies like the <span class="text-indigo-400 font-semibold">Hymenoptera Anatomy Ontology (HAO)</span> are central to this effort.
    </p>
  </div>

  <!-- Two-column layout -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

    <!-- Left: Main Text (2/3 width) -->
    <div class="col-span-2 flex flex-col space-y-6 bg-gray-50 p-6 rounded-xl shadow-sm text-gray-800 text-justify">

      <p class="text-base sm:text-lg leading-relaxed">
        <span class="text-amber-400 font-semibold">Phenomics</span> is the large-scale study of organismal form, function, and variation, and how these traits evolve over time. My research focuses on understanding why insects look the way they do and how morphological traits evolve in response to ecological pressures and evolutionary history.
      </p>

      <p class="text-base sm:text-lg leading-relaxed">
        By integrating detailed skeletomuscular anatomy, advanced imaging technologies, and phylogenetic frameworks, I explore the mechanisms that shape the extraordinary diversity of forms in parasitoid wasps.
      </p>

      <p class="text-base sm:text-lg leading-relaxed">
        I actively <span class="text-amber-400 font-semibold">generate anatomical ontologies</span> and use them as a core component of my evolutionary studies. Ontologies provide a semantic, interoperable, and machine-readable framework for describing morphology, ensuring that anatomical terms are standardized, logically structured, and comparable across taxa and studies. 
        By building and applying resources such as the <span class="text-indigo-400 font-semibold">Hymenoptera Anatomy Ontology (HAO)</span>, I enable large-scale integration of morphological data and lay the groundwork for future AI-assisted analyses.
      </p>

      <p class="text-base sm:text-lg leading-relaxed">
        Integrating HAO with specimen databases and digital resources allows for consistent annotation of collections and literature, facilitating computational analyses that advance comparative morphology, evolutionary biology, and biodiversity informatics.
      </p>

    </div>

    <!-- Right: Info Card (1/3 width) -->
    <div class="flex flex-col space-y-6 items-center">
      <div class="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col justify-center space-y-4 text-gray-800 w-full max-w-xs">
        <h2 class="text-xl font-bold text-gray-900 text-center">Phenomics & HAO Resources</h2>

        <p class="text-gray-700 text-center text-sm">
          Explore the ontologies and datasets that support my research.
        </p>

        <div class="flex flex-col space-y-3">
          <!-- HAO -->
          <a
            href="http://portal.hymao.org/"
            target="_blank"
            class="text-center text-sm bg-indigo-200 text-gray-900 font-medium py-2 rounded hover:bg-indigo-300 transition transform hover:-translate-y-1"
          >
            Explore the Hymenoptera Anatomy Ontology (HAO)
          </a>

          <!-- Optional: add more buttons here in the future -->
        </div>
      </div>


    </div>

  </div>
</section>
</template>

<script setup>
</script>

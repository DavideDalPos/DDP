<template>
<section class="container mx-auto px-6 mt-12 mb-8 max-w-6xl">

    <!-- Hero Intro -->
    <div class="bg-white p-12 rounded-lg shadow-lg mb-12 text-center border-t-15 border-[#ffb86c]">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-700 mb-4">
        Collections & Biodiversity Informatics
      </h1>
      <div class="mx-auto w-24 h-1 bg-amber-400 rounded mb-6"></div>
      <p class="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
        I work with <span class="font-semibold">entomological collections</span> as dynamic research infrastructures, integrating specimen-based research with <span class="font-semibold">biodiversity informatics</span>. 
        Through the management of databases such as <a href="https://worldichneumonidae.com" 
        target="_blank" class="font-semibold text-sky-300 hover:underline hover:text-sky-400">
  World Ichneumonidae Database (WID)
</a> and <a href="https://syrphidaeitaly.com" target="_blank" 
class="font-semibold text-amber-400 hover:underline hover:text-amber-500">
  Syrphidae of Italy (SoI)
</a>, I connect specimen data, literature, and morphological information to support taxonomy, evolutionary research, and global biodiversity studies.
      </p>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      <!-- Left: Main Text (2/3 width) -->
      <div class="col-span-2 flex flex-col space-y-6 bg-gray-50 p-6 rounded-xl shadow-sm text-gray-700 text-justify">
        <p class="text-base sm:text-lg leading-relaxed">
          Collections are more than repositories of specimens—they are <span class=" font-semibold">engines of discovery</span> that preserve biodiversity, generate new scientific questions, and inform conservation and evolutionary studies.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          By combining hands-on work in entomological collections with <span class=" font-semibold">digitization and data integration</span>, I help make specimens and associated information widely accessible. High-resolution imaging, structured metadata, and interoperable databases enable global collaboration and seamless integration with <span class="font-semibold">phylogenetic</span>, ecological, and morphological datasets.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          I manage and develop databases such as the <span class="font-semibold">World Ichneumonidae Database (WID)</span> and <span class=" font-semibold">Syrphidae of Italy (SoI)</span>, supporting collaborative taxonomy, ontology-based annotation, and comprehensive biodiversity analyses. These platforms accelerate species discovery and advance integrative research.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          Through these efforts, I aim to highlight the role of collections as <span class=" font-semibold">strategic, data-driven resources</span>—essential for taxonomy, conservation, evolutionary biology, and understanding global biodiversity patterns.
        </p>
      </div>

      <!-- Right: Info Card (1/3 width) -->
      <div class="flex flex-col space-y-6 items-center">
        <div class="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col justify-center space-y-4 text-gray-800 w-full max-w-xs">
          <h2 class="text-xl font-bold text-gray-900 text-center">Databases</h2>

          <p class="text-gray-700 text-center text-sm">
            Explore the biodiversity resources I maintain and develop.
          </p>

          <div class="flex flex-col space-y-3">
            <!-- WID button: pastel amber -->
            <a
              href="https://www.worldichneumonidae.com"
              target="_blank"
              class="text-center bg-sky-300 shadow-md text-white/90 font-medium py-2 rounded hover:bg-sky-500 transition transform hover:-translate-y-1"
            >
              World Ichneumonidae Database (WID)
            </a>

            <!-- SoI button: pastel indigo -->
            <a
              href="https://syrphidaeitaly.com"
              target="_blank"
              class="text-center bg-amber-500 shadow-md text-white font-medium py-2 rounded hover:bg-amber-400 transition transform hover:-translate-y-1"
            >
              Syrphidae of Italy (SoI) 
            </a>
                        <a
              href="https://slkelly1.github.io/UCFC_Database/#/"
              target="_blank"
              class="text-center bg-indigo-300 shadow-md text-white font-medium py-2 rounded hover:bg-indigo-400 transition transform hover:-translate-y-1"
            >
              University of Central Florida Collection (UCFC) 
            </a>
          </div>
        </div>

        <!-- Image below the card -->
        <div class="flex justify-center mt-4">
          <a href="https://www.worldichneumonidae.com" target="_blank">
            <img
              src="/public/images/logoWID.png"
              alt="World Ichneumonidae Database"
              class="max-w-xs hover:scale-105 transition transform"
            />
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>

<template>
  <div class="container mx-auto px-6 my-16 max-w-6xl">

    <!-- Hero Intro -->
    <div class="bg-gray-800 p-12 rounded-xl shadow-lg mb-16">
      <h1 class="text-5xl text-center font-extrabold mb-6 text-white">
        Systematics of Parasitoid Wasps
      </h1>
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed">
        One of my primary research interests is the systematics, taxonomy, and classification of parasitoid wasps, 
        with a particular emphasis on <span class="text-amber-400 font-semibold">Ichneumonidae</span> (Hymenoptera, Ichneumonoidea), a hyperdiverse family with approximately 
        <span class="text-amber-400 font-semibold">25,000 described species</span> and an estimated 
        <span class="text-amber-400 font-semibold">100,000 species</span> yet to be described.
      </p>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      <!-- Left: Text -->
      <div class="col-span-2 flex flex-col space-y-6 text-gray-200 bg-gray-900">
        <p class="text-base sm:text-lg leading-relaxed">
          My taxonomic work has mainly focused on the subfamily <span class="text-amber-400 font-semibold">Ichneumoninae</span>, the largest within Ichneumonidae, where I have described several new species. 
          My expertise extends across the entire family and even to related groups, such as Braconidae, allowing me to contribute broadly to parasitoid wasp systematics.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          My research includes the description of new species, revisions of key genera, and the development of comprehensive resources such as the 
          <span class="text-amber-400 font-semibold">World Ichneumonidae Database (WID)</span>, which provides researchers worldwide with essential tools for studying the evolution, ecology, and diversity of these ecologically important insects.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          Recently, I have investigated the evolution of key trait syndromes in Ichneumonidae and produced a <span class="text-amber-400 font-semibold">phylogeny combining genomic data and Sanger sequences</span> (Dal Pos & Sharanowski, 2024). 
          I am currently working on the first calibrated phylogeny of the group, aimed at identifying major shifts in morphological evolution.
        </p>
      </div>

      <!-- Right: Info Card -->
      <div class="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-start space-y-6 text-gray-200 w-full">
        <h2 class="text-xl font-bold text-white">Ichneumonidae at a glance</h2>

        <div class="flex flex-col space-y-3">
          <div class="flex justify-between items-center">
            <span class="font-medium">Described species</span>
            <span class="text-amber-400 font-semibold">~25,000</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium">Estimated total species</span>
            <span class="text-amber-400 font-semibold">~100,000</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium">Subfamilies</span>
            <span class="text-amber-400 font-semibold">42+</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium">Focus of my work</span>
            <span class="text-amber-400 font-semibold">Ichneumoninae</span>
          </div>
        </div>

        <!-- Link -->
        <router-link
          to="/species"
          class="mt-4 inline-block text-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-2 rounded transition"
        >
          Explore Species I Described
        </router-link>
      </div>

    </div>

  </div>
</template>

<script setup>
</script>

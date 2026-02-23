<template>
<section class="container mx-auto px-6 mt-12 mb-8 max-w-6xl">

    <!-- Hero Intro -->
    <div class="bg-white p-12 rounded-md shadow-lg mb-12 text-center border-t-15 border-[#ffb86c]">
      <h1 class="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-700">
        Systematics of Parasitoid Wasps
      </h1>
      <div class="mx-auto w-24 h-1 bg-[#ffb86c] rounded mb-6"></div>
      <p class="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
        One of my primary research interests is the systematics, taxonomy, and classification of parasitoid wasps, 
        with a particular emphasis on <span class="font-semibold">Ichneumonidae</span> (Hymenoptera, Ichneumonoidea), a hyperdiverse family with approximately 
        <span class="font-semibold">25,000 described species</span> and an estimated 
        <span class="font-semibold">100,000 species</span> yet to be described.
      </p>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      <!-- Left: Text Content -->
      <div class="col-span-2 flex flex-col space-y-6 text-gray-700 bg-gray-50 p-6 rounded-xl shadow-sm">
        <p class="text-base sm:text-lg leading-relaxed">
          My taxonomic work has mainly focused on the subfamily <span class="font-semibold">Ichneumoninae</span>, the largest within <span class="font-semibold">Ichneumonidae</span>, where I have described several new species. 
          My expertise extends across the entire family and even to related groups, such as <span class="font-semibold">Braconidae</span>, allowing me to contribute broadly to parasitoid wasp systematics.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          My research includes the description of new species, revisions of key genera, and the development of comprehensive resources such as the 
          <a href="https://worldichneumonidae.com" target="_blank" 
          class="font-semibold text-sky-400 hover:underline hover:text-sky-300">
  World Ichneumonidae Database (WID)
</a>, which provides researchers worldwide with essential tools for studying the evolution, ecology, and diversity of these ecologically important insects.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          Recently, I have investigated the evolution of key trait syndromes in <span class="font-semibold">Ichneumonidae</span> and produced a <span class="font-semibold">phylogeny</span>. 
          I am currently working on the first calibrated phylogeny of the group, aimed at identifying major shifts in morphological evolution.
        </p>
      </div>

      <!-- Right: Info Card -->
<div class="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col justify-start space-y-6 text-gray-800 w-full">
  <!-- Updated title -->
  <h2 class="text-xl font-bold text-gray-900">Discover Ichneumonidae</h2>

  <!-- Updated description -->
<p class="text-gray-600 text-sm">
  Access the World Ichneumonidae Database (WID) or explore the species I’ve described.
</p>

  <!-- Stacked Buttons -->
  <div class="flex flex-col gap-4">
    <a
      href="https://worldichneumonidae.com"
      target="_blank"
      class="text-center bg-indigo-300 hover:bg-sky-400 text-white shadow-md font-medium py-2 rounded transition transform hover:-translate-y-1"
    >
      World Ichneumonidae Database (WID)
    </a>

    <router-link
      to="/species"
      class="text-center bg-amber-500 hover:bg-amber-400 text-white shadow-md font-medium py-2 rounded transition transform hover:-translate-y-1"
    >
      Explore Species I Described
    </router-link>
  </div>
</div>

    </div>

  </section>
</template>

<script setup>
</script>

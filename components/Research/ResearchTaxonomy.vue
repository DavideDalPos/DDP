<template>
  <div class="container mx-auto px-6 my-16 max-w-6xl">

    <!-- Hero Intro -->
    <div class="bg-gray-50 p-12 rounded-xl shadow-lg mb-16">
      <h1 class="text-5xl text-center font-extrabold mb-6 text-gray-800">Systematics of Parasitoid Wasps</h1>
      <p class="text-lg sm:text-xl text-gray-700 leading-relaxed">
        One of my primary research interests is the <strong>systematics, taxonomy, and classification</strong> of parasitoid wasps, 
        with a particular emphasis on <strong>Ichneumonidae</strong> (Hymenoptera, Ichneumonoidea), a hyperdiverse family with approximately 
        <strong>25,000 described species</strong> and an estimated <strong>100,000 species</strong> yet to be described.
      </p>
    </div>

    <!-- Two-column layout (2/3 text left, 1/3 info right) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      <!-- Left: Text (2/3 width) -->
      <div class="col-span-2 flex flex-col space-y-6 text-gray-800">
        <p class="text-base sm:text-lg leading-relaxed">
          My taxonomic work has mainly focused on the subfamily <strong>Ichneumoninae</strong>, the largest within Ichneumonidae, where I have described <strong>several new species</strong>. 
          My expertise extends across the entire family and even to related groups, such as <strong>Braconidae</strong>, allowing me to contribute broadly to parasitoid wasp systematics.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          My research includes the <strong>description of new species</strong>, revisions of key genera, and the development of comprehensive resources such as the <strong>World Ichneumonidae Database (WID)</strong>, 
          which provides researchers worldwide with essential tools for studying the <strong>evolution</strong>, <strong>ecology</strong>, and <strong>diversity</strong> of these ecologically important insects.
        </p>

        <p class="text-base sm:text-lg leading-relaxed">
          Recently, I have investigated the evolution of key <strong>trait syndromes</strong> in Ichneumonidae and produced a <strong>phylogeny combining genomic data and Sanger sequences</strong> (Dal Pos & Sharanowski, 2024). 
          I am currently working on the <strong>first calibrated phylogeny</strong> of the group, aimed at identifying major shifts in morphological evolution.
        </p>
      </div>

      <!-- Right: Info Card (1/3 width) -->
      <div class="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col justify-start space-y-6 text-gray-800 w-full">
        <h2 class="text-xl font-bold text-gray-700">Ichneumonidae at a glance</h2>

        <div class="flex flex-col space-y-3">
          <div class="flex justify-between items-center">
            <span class="font-medium">Described species</span>
            <span class="text-blue-600 font-semibold">~25,000</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium">Estimated total species</span>
            <span class="text-blue-600 font-semibold">~100,000</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium">Subfamilies</span>
            <span class="text-blue-600 font-semibold">42+</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium">Focus of my work</span>
            <span class="text-blue-600 font-semibold">Ichneumoninae</span>
          </div>
        </div>

        <!-- Link to species you described -->
        <router-link
          to="/species"
          class="mt-4 inline-block text-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 rounded transition"
        >
          Explore Species I Described
        </router-link>
      </div>

    </div>

  </div>
</template>

<script setup>
</script>

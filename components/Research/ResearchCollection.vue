<template>
  <div class="container mx-auto px-6 my-16 max-w-6xl">

    <!-- Hero Intro -->
    <div class="bg-gray-800 p-12 rounded-xl shadow-lg mb-16">
      <h1 class="text-5xl text-center font-extrabold mb-6 text-white">
        Collection-Based Research
      </h1>
      <p class="text-lg sm:text-xl text-gray-300 leading-relaxed text-center">
        I study <span class="text-amber-400 font-semibold">entomological collections</span> as dynamic research infrastructures that enable biodiversity discovery, integrate large-scale datasets, and support modern taxonomy, conservation, and evolutionary research.
      </p>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      <!-- Left: Main Text (2/3 width) -->
      <div class="col-span-2 flex flex-col space-y-6 text-gray-200 text-justify">
        <p>
          I am deeply interested in the role of <span class="text-amber-400 font-semibold">entomological collections</span> as engines of modern biodiversity research. Collections are far more than repositories of specimens—they are <span class="text-amber-400 font-semibold">dynamic research infrastructures</span> that generate new scientific questions, enable the discovery of hidden diversity, and preserve irreplaceable biological information across time and space.
        </p>

        <p>
          In the era of large-scale data integration, the <span class="text-amber-400 font-semibold">digitization of natural history collections</span> has become essential. High-resolution imaging, standardized metadata, and interoperable databases unlock the full research potential of specimens, making them accessible to scientists worldwide and allowing seamless integration with phylogenetic, ecological, and morphological datasets.
        </p>

        <p>
          I actively support and use modern cyberinfrastructure platforms such as <span class="text-amber-400 font-semibold">TaxonWorks</span>, which provide powerful tools for managing, annotating, and analyzing biodiversity data. These systems enable collaborative taxonomy, ontology-driven annotation, and the construction of comprehensive datasets that accelerate species discovery and global biodiversity assessments.
        </p>

        <p>
          Through these efforts, I aim to promote a modern vision of entomological collections as <span class="text-amber-400 font-semibold">strategic, data-driven resources</span>—crucial for taxonomy, conservation, evolutionary research, and understanding the rapidly changing biosphere.
        </p>
      </div>

      <!-- Right: Info Card (1/3 width) -->
      <div class="flex flex-col space-y-6">

        <div class="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-start space-y-6 text-gray-200 w-full">
          <h2 class="text-xl font-bold text-white">Collection Highlights</h2>

          <div class="flex flex-col space-y-3">
            <div class="flex justify-between items-center">
              <span class="font-medium">Specimens in WID</span>
              <span class="text-amber-400 font-semibold">~50,000</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Literature entries</span>
              <span class="text-amber-400 font-semibold">2,500+</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Digitization tools</span>
              <span class="text-amber-400 font-semibold">TaxonWorks</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Global reach</span>
              <span class="text-amber-400 font-semibold">16 collaborators</span>
            </div>
          </div>

          <a
            href="https://www.worldichneumonidae.com"
            target="_blank"
            class="mt-4 inline-block text-center bg-amber-400 text-gray-900 font-medium py-2 rounded hover:bg-amber-500 transition"
          >
            Explore the World Ichneumonidae Database (WID)
          </a>
        </div>

        <!-- Optional Image below card -->
        <div class="flex justify-center">
          <img
            src="/public/images/logoWID.png"
            alt="World Ichneumonidae Database"
            class="rounded-xl w-full max-w-xs"
          />
        </div>
      </div>

    </div>

  </div>
</template>

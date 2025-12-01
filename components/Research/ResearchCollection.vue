<template>
  <div class="container mx-auto px-6 my-16 max-w-6xl">

    <!-- Hero Intro -->
    <div class="bg-gray-50 p-12 rounded-xl shadow-lg mb-16">
      <h1 class="text-5xl text-center font-extrabold mb-6 text-gray-800">Collection-Based Research</h1>
      <p class="text-lg sm:text-xl text-gray-700 leading-relaxed text-center">
        I study entomological collections as dynamic research infrastructures that enable biodiversity discovery, integrate large-scale datasets, and support modern taxonomy, conservation, and evolutionary research.
      </p>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

      <!-- Left: Main Text (2/3 width) -->
      <div class="col-span-2 flex flex-col space-y-6 text-gray-800 text-justify">
        <p>I am deeply interested in the role of <strong>entomological collections</strong> as engines of modern biodiversity research. Collections are far more than repositories of specimens—they are <strong>dynamic research infrastructures</strong> that generate new scientific questions, enable the discovery of hidden diversity, and preserve irreplaceable biological information across time and space.</p>

        <p>In the era of large-scale data integration, the <strong>digitization of natural history collections</strong> has become essential. High-resolution imaging, standardized metadata, and interoperable databases unlock the full research potential of specimens, making them accessible to scientists worldwide and allowing seamless integration with phylogenetic, ecological, and morphological datasets.</p>

        <p>I actively support and use modern cyberinfrastructure platforms such as <strong>TaxonWorks</strong>, which provide powerful tools for managing, annotating, and analyzing biodiversity data. These systems enable collaborative taxonomy, ontology-driven annotation, and the construction of comprehensive datasets that accelerate species discovery and global biodiversity assessments.</p>

        <p>Through these efforts, I aim to promote a modern vision of entomological collections as <strong>strategic, data-driven resources</strong>—crucial for taxonomy, conservation, evolutionary research, and understanding the rapidly changing biosphere.</p>
      </div>

      <!-- Right: Info Card (1/3 width) -->
      <div class="flex flex-col space-y-6">

        <div class="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col justify-start space-y-6 text-gray-800 w-full">
          <h2 class="text-xl font-bold text-gray-700">Collection Highlights</h2>

          <div class="flex flex-col space-y-3">
            <div class="flex justify-between items-center">
              <span class="font-medium">Specimens in WID</span>
              <span class="text-blue-600 font-semibold">~50,000</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Literature entries</span>
              <span class="text-blue-600 font-semibold">2,500+</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Digitization tools</span>
              <span class="text-blue-600 font-semibold">TaxonWorks</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">Global reach</span>
              <span class="text-blue-600 font-semibold">16 collaborators</span>
            </div>
          </div>

          <a
            href="https://www.worldichneumonidae.com"
            target="_blank"
            class="mt-4 inline-block text-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 rounded transition"
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

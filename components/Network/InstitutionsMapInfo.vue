<template>
  <div class="map-intro p-4 rounded-xl shadow-md bg-white mb-4">
    <h2 class="text-xl font-bold mb-2 text-amber-400">Institutions</h2>
    <p class="text-gray-700 mb-2">
      This map shows all institutions associated with our projects. Each marker represents an institution, and clusters indicate multiple institutions in the same region.
    </p>
    <p class="text-gray-700 mb-2">
      Click a marker to see details such as name, acronym, location, roles, and collections.
    </p>
    <ul class="text-gray-700 list-disc ml-5">
      <li>Purple circle markers represent institutions.</li>
      <li>Clusters indicate multiple institutions in close proximity.</li>
      <li>Links in popups take you to institution collections or websites.</li>
    </ul>
  </div>
</template>

<script setup>
// Static content only
</script>

<style scoped>
.map-intro {
  margin-bottom: 1rem;
}
</style>

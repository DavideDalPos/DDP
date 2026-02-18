<template>
  <div class="map-intro p-4 rounded-xl shadow-md bg-white mb-4">
    <h2 class="text-xl font-bold mb-2 text-amber-400">Collaborators</h2>
    <p class="text-gray-700 mb-2">
      This map shows all collaborators associated with our projects. Each marker represents a collaborator, and clusters indicate multiple collaborators in the same region.
    </p>
    <p class="text-gray-700 mb-2">
      Use the checkboxes on the map's legend to filter between <strong>Current</strong> and <strong>Past</strong> collaborators. Click a marker to see details such as name, institution, and related projects.
    </p>
    <ul class="text-gray-700 list-disc ml-5">
      <li>Green circle markers: active collaborators.</li>
      <li>Clusters: multiple collaborators in the same area.</li>
      <li>Links in popups take you to project pages or publications.</li>
    </ul>
  </div>
</template>

<script setup>
// Static content, no logic needed
</script>

<style scoped>
.map-intro {
  margin-bottom: 1rem;
}
</style>

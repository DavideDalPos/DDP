<template>
  <div class="map-intro p-4 rounded-xl shadow-md bg-white mb-4 mt-10">
    <h2 class="text-xl font-bold mb-2" style="color:#FFB85C;">Institutions</h2>
    
    <p style="color:#555; margin-bottom:0.5rem;">
      This map shows all institutions associated with our projects. Each marker represents an institution, and clusters indicate multiple institutions in the same region.
    </p>
    
    <p style="color:#555; margin-bottom:0.5rem;">
      Click a marker to see details such as <strong>name</strong>, <strong>acronym</strong>, <strong>location</strong>, <strong>roles</strong>, <strong>years active</strong>, and <strong>collections</strong>. 
      Institutions that are <span style="display:inline-block; background-color:#C598F6; color:white; padding:2px 6px; border-radius:12px; font-size:10px;">Research Associates</span> are highlighted with a violet pill in the popup.
    </p>
    
    <ul style="color:#555; list-style-type:disc; margin-left:1.25rem;">
      <li>
        <span style="display:inline-block; width:12px; height:12px; background-color:#FFB85C; border-radius:50%; margin-right:6px;"></span>
        Pastel amber circle markers represent institutions.
      </li>
      <li>
        <span style="display:inline-block; width:12px; height:12px; background-color:#C598F6; border-radius:50%; margin-right:6px;"></span>
        Institutions with a <strong>Research Associate</strong> role are highlighted in violet.
      </li>
      <li>Clusters indicate multiple institutions in close proximity.</li>
      <li>Clicking the link in the popup takes you to the institution’s collection or website.</li>
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

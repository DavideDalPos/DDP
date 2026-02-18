<template>
  <div class="map-intro p-4 rounded-xl shadow-md mb-4" 
       style="background:#fdfdfd; border:1px solid #e0e0e0;">
    <h2 style="font-size:1.25rem; font-weight:bold; margin-bottom:0.5rem; color:#ffb86c;">
      Collaborators
    </h2>
    <p style="color:#555; margin-bottom:0.5rem;">
      This map shows all collaborators associated with our projects. Each marker represents a collaborator, and clusters indicate multiple collaborators in the same region.
    </p>
    <p style="color:#555; margin-bottom:0.5rem;">
      Use the checkboxes on the map's legend to filter between 
      <span style="display:inline-block; background:#ffb86c; color:white; padding:1px 6px; border-radius:12px; font-size:11px; margin-left:4px; margin-right:2px;">Active</span> 
      and 
      <span style="display:inline-block; background:#c7a0f7; color:white; padding:1px 6px; border-radius:12px; font-size:11px; margin-left:2px;">Published</span> 
      collaborators. Click a marker to see details such as name, institution, and related projects.
    </p>
    <ul style="color:#555; list-style:disc; margin-left:1.25rem; margin-top:0.5rem;">
      <li>
        <span style="display:inline-block; width:12px; height:12px; background:#ffb86c; border-radius:50%; margin-right:6px; vertical-align:middle;"></span>
        Active collaborators
      </li>
      <li>
        <span style="display:inline-block; width:12px; height:12px; background:#c7a0f7; border-radius:50%; margin-right:6px; vertical-align:middle;"></span>
        Published collaborators
      </li>
      <li>
        <span style="display:inline-block; width:12px; height:12px; background:#8cd3a3; border-radius:50%; margin-right:6px; vertical-align:middle;"></span>
        Both Active & Published
      </li>
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
  /* minimal styling for spacing and shadow */
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-radius: 0.75rem;
}
</style>

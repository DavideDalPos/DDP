<script setup>
import SpeciesMap from '~/components/Species/SpeciesMap.vue';
</script>

<template>
  <div>
    <SpeciesDescription />
    <SpeciesMap />
    <div id="species-list" class="mt-16">
   <SpeciesList /></div>
  </div>
</template>

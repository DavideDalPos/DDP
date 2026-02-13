<template>
  <div class="container mx-auto px-6 my-16 max-w-10xl">
    <client-only>
      <CollaboratorsMap />
      <InstitutionsMap />
    </client-only>
  </div>
</template>

<script setup>
import CollaboratorsMap from '~/components/Network/CollaboratorMap.vue'
import InstitutionsMap from '~/components/Network/InstitutionsMap.vue'
</script>

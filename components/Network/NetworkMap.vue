<template>
  <div class="container mx-auto px-6 my-16 max-w-10xl">
    <client-only>
      <!-- Intro / explanation -->
      <CollaboratorMapInfo />

      <!-- Collaborators map -->
      <CollaboratorsMap />

      <InstitutionsMapInfo />
      <!-- Institutions map -->
      <InstitutionsMap />
    </client-only>
  </div>
</template>

<script setup>
import CollaboratorsMap from '~/components/Network/CollaboratorMap.vue';
import CollaboratorMapInfo from '~/components/Network/CollaboratorMapInfo.vue';
import InstitutionsMap from '~/components/Network/InstitutionsMap.vue';
import InstitutionsMapInfo from '~/components/Network/InstitutionsMapInfo.vue';
</script>

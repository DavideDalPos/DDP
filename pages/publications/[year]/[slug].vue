<template>
  <main>
    <PublicationsView :publication="publication" />
  </main>
</template>

<script setup>
import PublicationsView from '~/components/Publications/PublicationsView.vue';

const route = useRoute()

const publication = await queryCollection('publications', route.params.year, route.params.slug)
  .path(route.path)
  .first()
</script>




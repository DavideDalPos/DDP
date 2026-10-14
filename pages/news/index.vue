<script setup lang="ts">
import NewsList from '~/components/News/NewsList.vue'

useHead({ title: 'News' })
</script>

<template>
  <div>
    <LabPageHero
      kicker="Keeping up"
      title="News"
      lede="New papers, new species, new data — and news from the lab and the Enns Entomology Museum."
    />
    <NewsList />
  </div>
</template>

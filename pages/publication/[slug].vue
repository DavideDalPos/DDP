<script setup>
const route = useRoute()
const data = await queryContent(
  'publication',
  route.params.slug
).findOne()
</script>

<template>
  <main>
    <h1>{{ publication.title }}</h1>
    <ContentRenderer :publication="data" />
  </main>
</template>
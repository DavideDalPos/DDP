<template>
  <main>
    <section class="container mx-auto px-4 my-10">
      <h1>{{ publication.title }}</h1>
      <ContentRenderer value="data" />
    </section>
  </main>
</template>

<script setup>
const route = useRoute()
const publication = await queryCollection('publications')
  .path(route.path)
  .first()
</script>

<script setup lang="ts">
const route = useRoute()

const { data: doc } = await useAsyncData(() =>
  queryContent('/publication')
    .where({ _path: `/publication/${route.params.slug}` })
    .findOne()
)
</script>

<template>
  <main>
    <h1>{{ doc?.title }}</h1>
    <ContentRenderer :value="doc" />
  </main>
</template>


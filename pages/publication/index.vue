<script setup>
const { data: publications } = await useAsyncData(() =>
  queryContent('/publication').find()
)
</script>

<template>
  <main>
    <h1>Alle Publications</h1>
    <ul>
      <li v-for="pub in publications" :key="pub._path" class="mb-4">
        <NuxtLink :to="pub._path" class="text-blue-600 hover:underline">
          {{ pub.title }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>






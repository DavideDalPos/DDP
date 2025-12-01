<template>
  <main>
    <NewsView :news="news" />
  </main>
</template>

<script setup>
import NewsView from '~/components/News/NewsView.vue';

const route = useRoute()

const news = await queryCollection('news', route.params.year, route.params.slug)
  .path(route.path)
  .first()
</script>
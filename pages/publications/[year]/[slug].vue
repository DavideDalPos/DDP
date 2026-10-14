<template>
  <div>
    <PublicationsView v-if="publication" :publication="publication" />
  </div>
</template>

<script setup>
import PublicationsView from '~/components/Publications/PublicationsView.vue'

const route = useRoute()

const { data: publication } = await useAsyncData(`pub-${route.path}`, () =>
  queryCollection('publications').path(route.path).first()
)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// "Page · EPIC Lab" in the browser tab; the home page gets the full lab title
useHead({
  titleTemplate: (t) => (t ? `${t} · EPIC Lab` : 'EPIC Lab — Davide Dal Pos')
})
</script>

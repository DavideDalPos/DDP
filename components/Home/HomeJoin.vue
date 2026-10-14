<template>
  <section class="border-y border-line bg-paper-2">
    <div class="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-12 lg:px-8">
      <div class="lg:col-span-7">
        <p v-reveal class="kicker">Opportunities</p>
        <h2 v-reveal="60" class="mt-5 text-4xl font-semibold leading-tight">Join the lab</h2>
        <p v-reveal="120" class="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          The lab is recruiting graduate students and undergraduate researchers, and welcomes postdoctoral and
          visiting researchers interested in taxonomy, phenomics, biodiversity informatics and collections.
        </p>
      </div>
      <div v-reveal="160" class="flex flex-col justify-end gap-3 lg:col-span-5 lg:items-end">
        <NuxtLink to="/join" class="btn btn-primary">Positions and how to apply <span class="arrow">→</span></NuxtLink>
        <a :href="`mailto:${lab.email}?subject=Joining%20the%20EPIC%20Lab`" class="text-sm font-semibold text-ink underline underline-offset-4 hover:text-accent-deep">{{ lab.email }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { lab } from '~/components/Lab/labData.js'
</script>

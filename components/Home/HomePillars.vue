<template>
  <section class="border-y border-line bg-paper-2 py-24 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p v-reveal class="kicker">Research programme</p>
          <h2 v-reveal="60" class="mt-5 text-4xl font-semibold leading-tight">Four areas of research</h2>
          <p v-reveal="120" class="mt-5 leading-relaxed text-muted">
            Each area builds on the previous one: new species call for careful anatomy, anatomy becomes data, and data
            anchored in collections document how diversity changes.
          </p>
          <NuxtLink v-reveal="160" to="/research" class="mt-7 inline-block text-sm font-semibold text-ink underline underline-offset-4 hover:text-accent-deep">
            Research overview
          </NuxtLink>
        </div>

        <ol class="divide-y divide-line border-y border-line lg:col-span-8">
          <li v-for="(p, i) in pillars" :key="p.key" v-reveal="i * 80">
            <NuxtLink :to="p.link" class="row group grid gap-4 py-7 sm:grid-cols-12 sm:gap-6">
              <span class="font-display text-sm font-semibold text-accent-deep sm:col-span-1 sm:pt-1.5">0{{ i + 1 }}</span>
              <span class="sm:col-span-4">
                <span class="block font-display text-2xl font-semibold group-hover:text-accent-deep">{{ p.name }}</span>
                <span class="mt-1 block text-sm text-muted">{{ p.tagline }}</span>
              </span>
              <span class="text-[0.95rem] leading-relaxed text-ink/75 sm:col-span-6">{{ p.summary }}</span>
              <span class="hidden text-right text-accent-deep transition-transform duration-300 group-hover:translate-x-1 sm:col-span-1 sm:block sm:pt-1">→</span>
            </NuxtLink>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup>
import { pillars } from '~/components/Lab/labData.js'
</script>

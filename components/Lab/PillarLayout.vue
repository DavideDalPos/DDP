<template>
  <div>
    <LabPageHero
      :kicker="`Research · ${p.name}`"
      :title="title"
      :lede="lede"
      :tone="p.key"
    />

    <section class="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
      <!-- Main text -->
      <article class="prose-epic lg:col-span-7" :style="{ '--c': p.hex }">
        <slot />
      </article>

      <!-- Side -->
      <aside class="lg:col-span-5">
        <div class="space-y-6 lg:sticky lg:top-24">
          <div v-reveal class="card relative overflow-hidden p-7">
            <span class="absolute inset-x-0 top-0 h-[3px] bg-accent" />
            <p class="text-xs font-bold uppercase tracking-[0.16em]" :class="p.text">What we focus on</p>
            <ul class="mt-5 space-y-4">
              <li v-for="(f, i) in focus" :key="f.title" class="flex gap-4">
                <span
                  class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  :class="[p.soft, p.text]"
                  >{{ i + 1 }}</span
                >
                <span>
                  <b class="block text-sm">{{ f.title }}</b>
                  <span v-if="f.text" class="block text-sm leading-relaxed text-muted">{{ f.text }}</span>
                </span>
              </li>
            </ul>
          </div>

          <div v-if="links.length" v-reveal="100" class="card p-7">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-muted">Resources</p>
            <div class="mt-4 flex flex-col gap-2">
              <component
                :is="l.to ? NuxtLink : 'a'"
                v-for="l in links"
                :key="l.label"
                :to="l.to"
                :href="l.href"
                :target="l.href ? '_blank' : undefined"
                :rel="l.href ? 'noopener' : undefined"
                class="res group flex items-center justify-between gap-3 rounded-md border border-line px-4 py-3 text-sm font-semibold"
              >
                <span>{{ l.label }}</span>
                <span class="transition-transform duration-300 group-hover:translate-x-1" :class="p.text">{{ l.href ? '↗' : '→' }}</span>
              </component>
            </div>
          </div>

          <figure v-if="figure" v-reveal="160" class="card overflow-hidden">
            <a :href="figure.src" target="_blank" rel="noopener" class="block overflow-hidden">
              <img :src="figure.src" :alt="figure.alt" class="w-full transition-transform duration-700 hover:scale-[1.03]" loading="lazy" />
            </a>
            <figcaption class="px-5 py-4 text-xs leading-relaxed text-muted">{{ figure.caption }}</figcaption>
          </figure>
        </div>
      </aside>
    </section>

    <slot name="after" />

    <!-- Other pillars -->
    <section class="border-t border-line bg-paper-2">
      <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p class="kicker">Other research areas</p>
        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <NuxtLink
            v-for="(o, i) in others"
            :key="o.key"
            v-reveal="i * 90"
            :to="o.link"
            class="other group relative overflow-hidden rounded-md border border-line bg-white p-6"
            :style="{ '--c': o.hex }"
          >
                        <span class="relative block text-lg font-semibold">{{ o.name }}</span>
            <span class="relative mt-1 block text-sm text-muted">{{ o.tagline }}</span>
            <span class="relative mt-4 inline-block text-sm font-semibold text-accent-deep">
              Explore <span class="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </NuxtLink>
        </div>
        <NuxtLink to="/research" class="mt-8 inline-block text-sm font-semibold text-ink underline underline-offset-4">Research overview</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, resolveComponent } from 'vue'
import { pillarByKey, pillars } from './labData.js'

const props = defineProps({
  pillar: { type: String, required: true },
  title: { type: String, required: true },
  lede: { type: String, default: '' },
  focus: { type: Array, default: () => [] },
  links: { type: Array, default: () => [] },
  figure: { type: Object, default: null }
})

const NuxtLink = resolveComponent('NuxtLink')
const p = computed(() => pillarByKey[props.pillar])
const others = computed(() => pillars.filter((o) => o.key !== props.pillar))
useHead({ title: computed(() => p.value.name) })
</script>

<style scoped>
.prose-epic :deep(h2) {
  font-size: 1.85rem;
  font-weight: 600;
  margin: 2.6rem 0 1rem;
  line-height: 1.2;
}
.prose-epic :deep(h2:first-child) {
  margin-top: 0;
}
.prose-epic :deep(h2)::before {
  content: '';
  display: block;
  width: 2.5rem;
  height: 1px;
  margin-bottom: 0.9rem;
  background: var(--color-accent);
}
.prose-epic :deep(.lead) {
  font-family: var(--font-display);
  font-size: 1.45rem;
  line-height: 1.5;
  color: var(--color-ink);
}
.res {
  transition: border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease;
}
.res:hover {
  border-color: var(--color-ink);
  background: var(--color-paper);
  transform: translateX(2px);
}
.other {
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}
.other:hover {
  border-color: var(--color-ink);
}
</style>

<template>
  <footer class="relative overflow-hidden bg-ink text-white/80">
    <div class="h-px bg-accent/60" />

    <div class="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-12 lg:px-8">
      <!-- Lab -->
      <div class="lg:col-span-5">
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
        >
          <LabMark class="h-12 w-12" />
          <span class="font-display text-2xl font-semibold text-white">EPIC Lab</span>
        </NuxtLink>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
          {{ lab.name }} — {{ lab.division }}, {{ lab.university }}, {{ lab.city }}.
        </p>
        <p class="mt-4 text-sm">
          Based at the
          <a
            :href="lab.museum.url"
            target="_blank"
            rel="noopener"
            class="font-semibold text-white underline decoration-accent-light underline-offset-4"
            >{{ lab.museum.name }}</a
          >
        </p>
      </div>

      <!-- Links -->
      <div class="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 lg:col-span-7">
        <div>
          <p class="foot-h">Research</p>
          <NuxtLink
            v-for="p in pillars"
            :key="p.key"
            :to="p.link"
            class="foot-a"
          >
{{ p.name }}
          </NuxtLink>
          <NuxtLink
            to="/species"
            class="foot-a"
            >Species described</NuxtLink
          >
        </div>
        <div>
          <p class="foot-h">Lab</p>
          <NuxtLink
            to="/people"
            class="foot-a"
            >People</NuxtLink
          >
          <NuxtLink
            to="/join"
            class="foot-a"
            >Join the lab</NuxtLink
          >
          <NuxtLink
            to="/network"
            class="foot-a"
            >Network</NuxtLink
          >
          <NuxtLink
            to="/publications"
            class="foot-a"
            >Publications</NuxtLink
          >
          <NuxtLink
            to="/teaching"
            class="foot-a"
            >Teaching</NuxtLink
          >
          <NuxtLink
            to="/news"
            class="foot-a"
            >News</NuxtLink
          >
        </div>
        <div>
          <p class="foot-h">Contact</p>
          <a
            :href="`mailto:${lab.email}`"
            class="foot-a break-all"
            >{{ lab.email }}</a
          >
          <NuxtLink
            to="/contact"
            class="foot-a"
            >Find us</NuxtLink
          >
          <NuxtLink
            to="/cv"
            class="foot-a"
            >CV</NuxtLink
          >
          <div class="mt-4 flex flex-wrap gap-1">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              :aria-label="s.label"
              class="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <component
                :is="s.icon"
                class="h-5 w-5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/45 sm:flex-row sm:justify-between lg:px-8"
      >
        <p>© {{ year }} Davide Dal Pos · EPIC Lab, University of Missouri</p>
        <p>Content licensed under CC BY 4.0</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import IconEmail from '../Icon/IconEmail.vue'
import IconGithub from '../Icon/IconGithub.vue'
import IconGoogleScholar from '../Icon/IconGoogleScholar.vue'
import IconOrcid from '../Icon/IconOrcid.vue'
import IconResearchGate from '../Icon/IconResearchGate.vue'
import { lab, pillars } from '~/components/Lab/labData.js'

const year = new Date().getFullYear()
const socials = [
  { label: 'Email', href: `mailto:${lab.email}`, icon: IconEmail },
  { label: 'ORCID', href: 'https://orcid.org/0000-0002-9122-934X', icon: IconOrcid },
  { label: 'GitHub', href: 'https://github.com/DavideDalPos', icon: IconGithub },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=wYj3d_oAAAAJ', icon: IconGoogleScholar },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Davide-Dal-Pos-2', icon: IconResearchGate }
]
</script>

<style scoped>
.foot-h {
  margin-bottom: 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.45);
}
.foot-a {
  display: block;
  padding: 0.3rem 0;
  color: rgb(255 255 255 / 0.78);
  transition: color 0.2s ease, transform 0.2s ease;
}
.foot-a:hover {
  color: #fff;
  transform: translateX(3px);
}
</style>

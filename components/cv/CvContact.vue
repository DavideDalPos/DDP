<template>
  <div>
    <LabPageHero
      kicker="Contact"
      title="Get in touch"
      lede="Questions about our research, a collaboration, a visit to the museum, or joining the lab — email is the best way to reach us."
    >
      <a :href="`mailto:${lab.email}`" class="btn btn-primary">{{ lab.email }} <span class="arrow">→</span></a>
    </LabPageHero>

    <section class="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-12 lg:px-8">
      <div class="space-y-6 lg:col-span-5">
        <div v-reveal class="card p-8">
          <p class="label">Email</p>
          <a :href="`mailto:${lab.email}`" class="mt-2 block text-lg font-semibold hover:text-lav-deep">{{ lab.email }}</a>
          <a :href="`mailto:${personal}`" class="mt-1 block text-muted hover:text-lav-deep">{{ personal }}</a>

          <p class="label mt-8">Where to find us</p>
          <address class="mt-2 not-italic leading-relaxed">
            <b>EPIC Lab · {{ lab.museum.name }}</b><br />
            {{ lab.division }}<br />
            {{ lab.university }}<br />
            Columbia, MO 65211, USA
          </address>
          <a :href="lab.museum.url" target="_blank" rel="noopener" class="mt-4 inline-block text-sm font-semibold text-lav-deep underline underline-offset-4">Plan a visit to the museum ↗</a>
        </div>

        <div v-reveal="100" class="card p-8">
          <p class="label">Online</p>
          <div class="mt-5 grid grid-cols-2 gap-3">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="social group flex items-center gap-3 rounded-md border border-line p-3"
              :style="{ '--c': s.color }"
            >
              <span class="flex h-10 w-10 items-center justify-center rounded-md bg-paper-2 transition-colors group-hover:text-white" :style="{ color: s.color }">
                <component :is="s.icon" class="h-5 w-5" />
              </span>
              <span class="text-sm font-semibold">{{ s.label }}</span>
            </a>
          </div>
        </div>
      </div>

      <div v-reveal="160" class="card overflow-hidden lg:col-span-7">
        <iframe
          class="h-full min-h-[26rem] w-full border-0"
          :src="mapUrl"
          title="Map: University of Missouri, Columbia"
          loading="lazy"
          allowfullscreen
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import IconGithub from '../Icon/IconGithub.vue'
import IconGoogleScholar from '../Icon/IconGoogleScholar.vue'
import IconOrcid from '../Icon/IconOrcid.vue'
import IconResearchGate from '../Icon/IconResearchGate.vue'
import { lab } from '~/components/Lab/labData.js'

useHead({ title: 'Contact' })

const personal = 'daveliga@gmail.com'
const socials = [
  { label: 'ORCID', href: 'https://orcid.org/0000-0002-9122-934X', icon: IconOrcid, color: '#8c5e2a' },
  { label: 'Scholar', href: 'https://scholar.google.com/citations?user=wYj3d_oAAAAJ', icon: IconGoogleScholar, color: '#8c5e2a' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Davide-Dal-Pos-2', icon: IconResearchGate, color: '#8c5e2a' },
  { label: 'GitHub', href: 'https://github.com/DavideDalPos', icon: IconGithub, color: '#6e4a22' }
]
const mapUrl = 'https://maps.google.com/maps?q=Enns+Entomology+Museum,+University+of+Missouri,+Columbia,+MO&z=15&output=embed'
</script>

<style scoped>
.label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.social {
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.social:hover {
  border-color: var(--c);
  transform: translateY(-2px);
}
.social:hover span:first-child {
  background: var(--c);
}
</style>

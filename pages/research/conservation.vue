<script setup>
// Draft text for the new pillar — review and adjust.
const focus = [
  { title: 'Collections as baselines', text: 'Historical specimens as a record of where species lived, and when.' },
  { title: 'A checklist for Missouri', text: 'Museum and open data combined into a living list of the state’s insects.' },
  { title: 'Resurveys', text: 'Returning to historically sampled sites to measure what has changed.' },
  { title: 'Names that matter', text: 'Taxonomy as the foundation for protecting species.' }
]
const links = [
  { label: 'Insects of Missouri checklist', href: 'https://enns-entomology-museum.github.io/Enns_Entomology_Museum_Database/#/missouri' },
  { label: 'Enns Entomology Museum', href: 'https://enns-entomology-museum.github.io/Enns_Entomology_Museum_Database/' },
  { label: 'Join the lab', to: '/join' }
]
const figure = {
  src: '/images/lab/odonata.jpg',
  alt: 'A drawer of dragonflies stored in envelopes',
  caption: 'Dragonflies in the Enns Entomology Museum: every envelope records a species, a place and a date.'
}
</script>

<template>
  <LabPillarLayout
    pillar="conservation"
    title="Using collections to document change"
    lede="Every specimen says a species was in a place on a date. Together, they are a baseline for measuring change."
    :focus="focus"
    :links="links"
    :figure="figure"
  >
    <p class="lead">
      Museum collections are time machines. Some of the specimens in our drawers were collected more than a century ago —
      long before anyone was asking whether insects were declining.
    </p>

    <h2>A baseline for Missouri</h2>
    <p>
      At the Enns Entomology Museum we are building that baseline for Missouri: digitizing specimens, publishing them
      openly and combining them with other records into a <strong>checklist of the state’s insects</strong>, showing
      what the museum holds and where the gaps are.
    </p>

    <h2>Going back</h2>
    <p>
      Historical series open the door to <strong>resurveys</strong>: returning to the places where insects were
      collected decades ago to see which species have stayed, which have gone and which have arrived. The museum’s
      collections of aquatic insects from Missouri streams are a natural starting point.
    </p>

    <h2>Taxonomy is conservation</h2>
    <p>
      A species without a name cannot be protected, and declines cannot be tracked in groups that nobody can identify.
      Discovering and describing species, and making the data open, is the groundwork every conservation decision needs.
    </p>

    <template #after>
      <section class="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div v-reveal class="flex flex-col items-start justify-between gap-6 rounded-md border border-line bg-paper-2 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p class="font-display text-2xl font-semibold">A developing research area</p>
            <p class="mt-1 text-muted">Students and collaborators interested in collections-based conservation are encouraged to get in touch.</p>
          </div>
          <NuxtLink to="/join" class="btn btn-primary">Join the lab <span class="arrow">→</span></NuxtLink>
        </div>
      </section>
    </template>
  </LabPillarLayout>
</template>

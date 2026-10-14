<template>
  <div>
    <TeachingIntro />

    <!-- University of Missouri courses -->
    <section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div class="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p class="kicker">University of Missouri</p>
          <h2 class="mt-4 text-3xl font-semibold sm:text-4xl">Courses</h2>
        </div>
        <p class="max-w-md text-sm text-muted">Courses in entomology for undergraduate and graduate students in the Division of Plant Science &amp; Technology.</p>
      </div>

      <div class="mt-8 grid gap-6 lg:grid-cols-3">
        <article v-for="(c, i) in muCourses" :key="c.name" v-reveal="i * 80" class="card relative flex flex-col overflow-hidden p-7">
          <span class="absolute inset-x-0 top-0 h-[3px] bg-accent" />
          <div class="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
            <span class="text-accent-deep">{{ c.code }}</span>
            <span class="rounded border border-line px-2 py-0.5 normal-case tracking-normal text-muted">{{ c.term }}</span>
          </div>
          <h3 class="mt-4 text-2xl font-semibold">{{ c.name }}</h3>
          <p class="mt-1 text-sm text-muted">{{ c.level }}</p>
          <p class="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink/85">{{ c.description }}</p>
          <dl class="mt-5 space-y-2 border-t border-line pt-4 text-sm">
            <div>
              <dt class="label">Format</dt>
              <dd class="mt-0.5 text-ink/85">{{ c.format }}</dd>
            </div>
            <div v-if="c.prerequisite">
              <dt class="label">Prerequisite</dt>
              <dd class="mt-0.5 text-ink/85">{{ c.prerequisite }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>

    <!-- Approach -->
    <section class="border-y border-line bg-paper-2">
      <div class="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8">
        <div class="lg:col-span-4">
          <p class="kicker">Approach</p>
          <h2 class="mt-4 text-3xl font-semibold sm:text-4xl">How I teach</h2>
          <p class="mt-4 leading-relaxed text-muted">
            Students learn best by observing, questioning and interpreting the natural world themselves — with specimens in hand.
          </p>
        </div>
        <ol class="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          <li v-for="(p, i) in principles" :key="p.title" v-reveal="i * 70" class="border-t border-ink/20 pt-4">
            <span class="font-display text-sm font-semibold text-accent-deep">0{{ i + 1 }}</span>
            <h3 class="mt-1 text-xl font-semibold">{{ p.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ p.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Full statement -->
    <section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <details class="statement group mx-auto max-w-3xl border-y border-line">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-5">
          <span class="font-display text-2xl font-semibold">Teaching statement</span>
          <span class="text-sm font-semibold text-accent-deep">
            <span class="group-open:hidden">Read in full ↓</span>
            <span class="hidden group-open:inline">Close ↑</span>
          </span>
        </summary>
        <div class="pb-8 pt-2">
          <TeachingPhilosophy />
        </div>
      </details>
    </section>

    <!-- Experience -->
    <section class="mx-auto grid max-w-7xl gap-12 px-5 pb-20 lg:grid-cols-12 lg:px-8">
      <div class="lg:col-span-7">
        <h2 class="border-b border-line pb-4 text-3xl font-semibold">Teaching experience</h2>
        <ol class="divide-y divide-line">
          <li v-for="c in teachingCourses" :key="c.name" class="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
            <div>
              <p class="font-semibold">{{ c.name }}</p>
              <p class="text-sm text-muted">{{ c.term }}</p>
            </div>
            <span
              class="self-start rounded border px-2 py-0.5 text-xs font-semibold"
              :class="c.role === 'Instructor of Record' ? 'border-ink text-ink' : 'border-line text-muted'"
              :title="c.role"
            >{{ c.role === 'Instructor of Record' ? 'Instructor of record' : 'Teaching assistant' }}</span>
          </li>
        </ol>
        <p class="mt-4 text-xs text-muted">
          Instructor of record: full responsibility for course design, instruction and assessment. Teaching assistant: laboratory sections.
        </p>
      </div>

      <div class="lg:col-span-5">
        <h2 class="border-b border-line pb-4 text-3xl font-semibold">Recognition</h2>
        <ol class="divide-y divide-line">
          <li v-for="a in teachingAwards" :key="a.name" class="grid grid-cols-[3.5rem_1fr] gap-3 py-4">
            <span class="text-sm tabular-nums text-muted">{{ a.year }}</span>
            <div>
              <p class="font-semibold">{{ a.name }}</p>
              <p class="text-sm text-muted">{{ a.org }}</p>
            </div>
          </li>
        </ol>

        <div class="card mt-10 p-6">
          <p class="label">Mentoring</p>
          <p class="mt-3 text-sm leading-relaxed text-ink/85">
            Undergraduates can join research projects in the lab and the Enns Entomology Museum — imaging, digitization and
            taxonomic work — for credit or as independent projects.
          </p>
          <NuxtLink to="/join" class="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:text-accent-deep">Research opportunities →</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import TeachingIntro from '~/components/Teaching/TeachingIntro.vue'
import TeachingPhilosophy from '~/components/Teaching/TeachingPhilosophy.vue'
import { muCourses, teachingCourses } from '~/components/Teaching/TeachingData.js'
import { awards } from '~/components/cv/CvAwardsData.js'

const teachingAwards = awards.filter((a) => /teach/i.test(a.name)).sort((a, b) => b.year - a.year)

const principles = [
  { title: 'Active learning', text: 'Flipped classrooms, structured peer discussion and reading the primary literature, so students do the thinking in class.' },
  { title: 'Observation and evidence', text: 'Careful observation, conceptual clarity and evidence-based reasoning — connecting structure to function with real specimens.' },
  { title: 'Access for everyone', text: 'Universal Design for Learning principles, so students with different backgrounds and learning styles can fully take part.' },
  { title: 'Modern tools', text: 'High-resolution imaging, data and AI-assisted methods, alongside the observational rigour they depend on.' }
]
</script>

<style scoped>
.label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.statement summary::-webkit-details-marker {
  display: none;
}
</style>

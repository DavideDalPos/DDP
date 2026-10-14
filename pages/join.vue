<template>
  <div>
    <LabPageHero
      kicker="Join the lab"
      title="Join the lab"
      lede="The EPIC Lab is recruiting graduate students and undergraduate researchers, and welcomes postdoctoral and visiting researchers. Projects combine specimens, imaging and data, and are built around each person’s interests."
    >
      <a href="#positions" class="btn btn-primary" @click.prevent="scrollTo('positions')">Positions <span class="arrow">↓</span></a>
      <a :href="mailto('Joining the EPIC Lab')" class="btn btn-ghost text-ink hover:bg-ink hover:text-white">Contact Davide</a>
    </LabPageHero>

    <!-- Why -->
    <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <p v-reveal class="kicker">The research environment</p>
      <h2 v-reveal="60" class="mt-4 max-w-3xl text-4xl font-semibold leading-tight">Research based in a major insect collection</h2>
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(w, i) in why" :key="w.title" v-reveal="i * 70" class="border-t border-ink/20 pt-5">
          <span class="font-display text-sm font-semibold text-accent-deep">0{{ i + 1 }}</span>
          <h3 class="mt-2 text-xl font-semibold">{{ w.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ w.text }}</p>
        </div>
      </div>
    </section>

    <!-- Positions -->
    <section id="positions" class="scroll-mt-20 bg-paper-2">
      <div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p v-reveal class="kicker">Positions</p>
        <h2 v-reveal="60" class="mt-4 text-4xl font-semibold">Open positions</h2>

        <div v-reveal="100" class="mt-10 flex flex-wrap gap-6 border-b border-line" role="tablist">
          <button
            v-for="(t, i) in tracks"
            :key="t.key"
            type="button"
            role="tab"
            :aria-selected="tab === i"
            class="tab border-b-2 px-1 pb-2 text-sm font-semibold transition-colors"
            :class="tab === i ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'"
            @click="tab = i"
          >
            {{ t.label }}
          </button>
        </div>

        <div class="relative mt-8">
          <Transition name="panel" mode="out-in">
            <div :key="tab" class="grid gap-6 lg:grid-cols-12">
              <div class="card relative overflow-hidden p-8 sm:p-10 lg:col-span-8">
                <span class="absolute inset-y-0 left-0 w-[3px] bg-accent" />
                <h3 class="text-3xl font-semibold">{{ current.title }}</h3>
                <p class="mt-4 text-lg leading-relaxed text-ink/80">{{ current.intro }}</p>
                <ul class="mt-6 space-y-3">
                  <li v-for="b in current.points" :key="b" class="flex gap-3 text-[0.97rem] leading-relaxed">
                    <svg viewBox="0 0 24 24" class="mt-1 h-4 w-4 shrink-0 text-accent-deep" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2Z" /></svg>
                    <span>{{ b }}</span>
                  </li>
                </ul>
              </div>
              <aside class="card p-8 lg:col-span-4">
                <p class="text-xs font-bold uppercase tracking-[0.16em] text-muted">How to start</p>
                <p class="mt-4 leading-relaxed">{{ current.start }}</p>
                <a :href="mailto(current.subject)" class="btn btn-primary mt-6 w-full justify-center">
                  Email Davide <span class="arrow">→</span>
                </a>
                <p class="mt-3 text-center text-xs text-muted">{{ lab.email }}</p>
              </aside>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Steps -->
    <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <p v-reveal class="kicker">Getting in touch</p>
      <h2 v-reveal="60" class="mt-4 text-4xl font-semibold">How to apply</h2>
      <ol v-reveal class="steps relative mt-12 grid gap-8 md:grid-cols-4">
        <li v-for="(s, i) in steps" :key="s.title" v-reveal="i * 120" class="relative">
          <span class="num font-display">{{ i + 1 }}</span>
          <h3 class="mt-4 text-xl font-semibold">{{ s.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ s.text }}</p>
        </li>
      </ol>
    </section>

    <!-- Values -->
    <section class="border-y border-line bg-paper-2">
      <div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p v-reveal class="kicker">Lab principles</p>
        <div class="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="(v, i) in values" :key="v.title" v-reveal="i * 90">
            <span class="block h-px w-10 bg-accent" />
            <h3 class="mt-4 text-xl font-semibold">{{ v.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ v.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-5 py-24 text-center lg:px-8">
      <h2 v-reveal class="text-3xl font-semibold">Questions?</h2>
      <p v-reveal="60" class="mx-auto mt-4 max-w-xl text-lg text-muted">A short email with your CV and research interests is the best way to start a conversation.</p>
      <a v-reveal="120" :href="mailto('Joining the EPIC Lab')" class="btn btn-primary mt-8">Email Davide <span class="arrow">→</span></a>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { lab, pillars } from '~/components/Lab/labData.js'

useHead({ title: 'Join the lab' })

const mailto = (subject) => `mailto:${lab.email}?subject=${encodeURIComponent(subject)}`
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const [E, P, I, C] = pillars

const why = [
  { title: 'Collections', text: `Direct access to the ${lab.museum.name} and its ${lab.museum.holdings} specimens.`, hex: E.hex, icon: E.icon },
  { title: 'Imaging and anatomy', text: 'Stereomicroscopy and focus-stacking imaging for comparative morphology.', hex: P.hex, icon: P.icon },
  { title: 'Data and informatics', text: 'Training in biodiversity databases, data standards, open publishing and reproducible analysis.', hex: I.hex, icon: I.icon },
  { title: 'Taxonomic expertise', text: 'Experience in species description, revisionary work and phylogenetics.', hex: C.hex, icon: C.icon }
]

// Draft text — review and adjust to current openings and programs
const tracks = [
  {
    key: 'grad',
    label: 'Graduate students',
    title: 'Ph.D. and M.S. students',
    hex: E.hex,
    intro:
      'Graduate students develop an independent project in one or more of the lab’s research areas: systematics, phenomics, biodiversity informatics or collections-based conservation.',
    points: [
      'Students join through graduate programs at the University of Missouri, such as Plant, Insect & Microbial Sciences (PIMS).',
      'Support can come from teaching and research assistantships and from fellowships; we help you apply for external fellowships such as the NSF GRFP.',
      'Projects can draw on the Enns Museum collection, fieldwork, imaging and data.',
      'Previous experience with Hymenoptera is not required.'
    ],
    start:
      'Email Davide well before application deadlines — ideally in the fall, a year before you would start. Include your CV and a short description of your research interests.',
    subject: 'Prospective graduate student'
  },
  {
    key: 'undergrad',
    label: 'Undergraduates',
    title: 'Undergraduate researchers',
    hex: P.hex,
    intro:
      'Undergraduate researchers learn how a natural history collection works and contribute to ongoing research.',
    points: [
      'Help digitize and image specimens of the Enns Entomology Museum.',
      'Learn specimen preparation, identification and databasing.',
      'Develop an independent project for research credit or an honors thesis.',
      'Open to students of any major — biology, data science, design, education and more.'
    ],
    start: 'Send Davide a short email with your year, major and what you would like to learn. A CV is helpful but not required.',
    subject: 'Undergraduate research in the EPIC Lab'
  },
  {
    key: 'postdoc',
    label: 'Postdocs',
    title: 'Postdoctoral researchers',
    hex: I.hex,
    intro:
      'We are happy to work with postdoctoral researchers on fellowship proposals that fit the lab’s research areas: systematics, phenomics, informatics or collections-based conservation.',
    points: [
      'Co-develop a proposal for independent fellowships, such as NSF Postdoctoral Research Fellowships in Biology.',
      'Bring your own questions and connect them with the Enns Museum collection and our databases.',
      'Funded positions, when available, will be announced on this page and on the News page.'
    ],
    start: 'Email Davide with your CV and a one-page outline of the project you have in mind.',
    subject: 'Postdoctoral fellowship in the EPIC Lab'
  },
  {
    key: 'visitors',
    label: 'Visitors',
    title: 'Visiting researchers and collaborators',
    hex: C.hex,
    intro:
      'Researchers are welcome to visit the lab and the Enns Entomology Museum to study specimens or to discuss collaboration.',
    points: [
      'Study specimens of the Enns Museum during a visit, or request a loan through the museum.',
      'Collaborate on taxonomy, phenomics, anatomy ontologies and biodiversity databases.',
      'Short visits by students from other institutions are welcome too.'
    ],
    start: 'Write to Davide with the groups you would like to study and approximate dates.',
    subject: 'Visiting the EPIC Lab and the Enns Museum'
  }
]
const tab = ref(0)
const current = computed(() => tracks[tab.value])

const steps = [
  { title: 'Read', text: 'Look through our research areas and recent publications.' },
  { title: 'Write', text: 'Send a short email with your CV and a paragraph on your interests and goals.' },
  { title: 'Meet', text: 'We meet by video call or at the museum to discuss possible projects.' },
  { title: 'Apply', text: 'Graduate applicants apply to a graduate program, with support on fellowship applications.' }
]

const values = [
  { title: 'Rigour', text: 'Careful observation, sound methods and well-documented data.', hex: E.hex },
  { title: 'Stewardship', text: 'Specimens and data are long-term resources, and are treated as such.', hex: P.hex },
  { title: 'Open science', text: 'Data, images and code are shared openly so that others can build on them.', hex: I.hex },
  { title: 'Inclusion', text: 'The lab welcomes people of all backgrounds and career paths.', hex: C.hex }
]
</script>

<style scoped>
.why {
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}
.why:hover {
  transform: translateY(-6px);
  border-color: var(--c);
  box-shadow: 0 26px 40px -30px var(--c);
}
.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.panel-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.panel-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
.num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background: var(--color-ink);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  position: relative;
  z-index: 1;
}
@media (min-width: 768px) {
  .steps::before {
    content: '';
    position: absolute;
    top: 1.6rem;
    left: 1.6rem;
    right: 10%;
    height: 2px;
    background: linear-gradient(90deg, #8c5e2a, #8c5e2a, #8c5e2a, #8c5e2a);
    transform-origin: left;
  }
  :global(.reveal-on) .steps::before {
    transform: scaleX(0);
  }
  :global(.reveal-on) .steps.is-visible::before {
    animation: grow 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.3s forwards;
  }
}
@keyframes grow {
  from { transform: scaleX(0) }
  to { transform: scaleX(1) }
}
</style>

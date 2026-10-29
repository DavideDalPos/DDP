<template>
  <figure class="spx mx-auto w-full max-w-2xl" :class="{ ready: labelsOn, 'has-active': !!active }">
    <svg
      viewBox="0 0 891 561"
      class="h-auto w-full overflow-visible rounded-md"
      role="group"
      aria-label="Photograph of a female Protoleptops wasp (Ichneumonidae) in side view, with labelled body parts"
    >
      <defs>
        <filter id="spx-grey" color-interpolation-filters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.55" />
            <feFuncG type="linear" slope="0.55" />
            <feFuncB type="linear" slope="0.55" />
          </feComponentTransfer>
        </filter>
        <filter id="spx-soft" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <mask id="spx-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="891" height="561">
          <rect width="891" height="561" fill="black" />
          <path v-if="current" :d="current.d" fill="white" filter="url(#spx-soft)" />
        </mask>
        <clipPath id="spx-frame">
          <rect width="891" height="561" rx="8" />
        </clipPath>
      </defs>

      <g clip-path="url(#spx-frame)">
        <!-- full-colour specimen -->
        <image :href="src" width="891" height="561" preserveAspectRatio="xMidYMid slice" class="img-color" />
        <!-- grey copy on top; it fades in when a part is chosen -->
        <image
          :href="src"
          width="891"
          height="561"
          preserveAspectRatio="xMidYMid slice"
          filter="url(#spx-grey)"
          class="img-grey"
        />
        <!-- the chosen part, back in colour -->
        <image
          v-if="current"
          :href="src"
          width="891"
          height="561"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#spx-mask)"
          class="img-part"
        />
        <!-- invisible hover areas on the specimen itself -->
        <path
          v-for="p in parts"
          :key="`h-${p.id}`"
          :d="p.d"
          class="hot"
          @mouseenter="active = p.id"
          @mouseleave="active = null"
          @click="toggle(p.id)"
        />
      </g>

      <!-- labels -->
      <g
        v-for="(p, i) in parts"
        :key="`l-${p.id}`"
        class="lbl"
        :class="{ on: active === p.id }"
        :style="{ '--ld': `${i * 0.1}s` }"
        role="button"
        tabindex="0"
        :aria-label="`${p.label}: ${p.text}`"
        :aria-pressed="active === p.id"
        @mouseenter="active = p.id"
        @mouseleave="active = null"
        @focus="active = p.id"
        @blur="active = null"
        @click="toggle(p.id)"
        @keydown.enter.prevent="toggle(p.id)"
      >
        <path :d="`M${p.dot[0]} ${p.dot[1]} L ${p.end[0]} ${p.end[1]}`" class="leader" />
        <circle :cx="p.dot[0]" :cy="p.dot[1]" r="5" class="dot" />
        <rect
          :x="p.anchor === 'middle' ? p.tx - pill(p) / 2 : p.anchor === 'end' ? p.tx - pill(p) + 12 : p.tx - 12"
          :y="p.ty - 21"
          :width="pill(p)"
          height="30"
          rx="15"
          class="pill"
        />
        <text :x="p.tx" :y="p.ty" :text-anchor="p.anchor || 'start'">{{ p.label }}</text>
      </g>
    </svg>

    <figcaption class="mt-4 flex items-start justify-between gap-4 border-t border-white/15 pt-3">
      <p class="min-h-[4.6rem] text-sm leading-relaxed text-white/70" aria-live="polite">
        <template v-if="current">
          <b class="font-semibold text-accent-light">{{ current.label }}.</b> {{ current.text }}
        </template>
        <template v-else>
          <i class="font-display text-base text-white/85">Protoleptops farquharsoni</i>, female, a Darwin wasp from
          Africa. <span class="text-white/50">Hover or tap a part to explore its anatomy.</span>
        </template>
      </p>
      <span class="shrink-0 text-right text-[0.68rem] uppercase leading-snug tracking-[0.12em] text-white/40">
        Ichneumonidae<br />Dal Pos et al. 2024
      </span>
    </figcaption>
  </figure>
</template>

<script setup>
// A real specimen photograph (Protoleptops farquharsoni, female; Dal Pos et al. 2024,
// ZooKeys 1214, fig. 2A, CC BY 4.0). Hovering, tapping or focusing a label (or the part
// itself on the photo) keeps that body part in colour and turns the rest grey.
// Outlines are traced on the 891 × 561 image and softened so the edges blend.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const src = '/images/lab/protoleptops-habitus.jpg'

const parts = [
  {
    id: 'antenna',
    label: 'Antenna',
    text: 'Long, many-segmented antennae. Darwin wasps use them to find their hosts by smell and vibration, even when the host is hidden inside a plant or in the soil.',
    d: 'M0 256 L60 258 L105 266 L128 276 L124 294 L100 288 L60 284 L0 306 Z',
    dot: [62, 270],
    end: [62, 214],
    tx: 30,
    ty: 204
  },
  {
    id: 'eye',
    label: 'Compound eye',
    text: 'Large compound eyes made of thousands of tiny lenses; their size and the hairs between the facets help to tell genera apart.',
    d: 'M128 262 L134 240 L152 230 L170 240 L176 264 L172 292 L156 306 L138 298 L128 280 Z',
    dot: [152, 252],
    end: [190, 150],
    tx: 168,
    ty: 140
  },
  {
    id: 'head',
    label: 'Head',
    text: 'The head carries the eyes, antennae and mouthparts. The shape of the face and clypeus is one of the main tools for identifying species.',
    d: 'M118 262 L124 240 L148 226 L180 232 L204 252 L214 290 L238 330 L236 356 L214 368 L190 360 L164 332 L136 312 L118 290 Z',
    dot: [206, 318],
    end: [210, 496],
    tx: 210,
    ty: 526,
    anchor: 'middle'
  },
  {
    id: 'meso',
    label: 'Mesosoma',
    text: 'The middle body region: the thorax fused with the first abdominal segment (the propodeum). It carries the wings, the legs and the powerful flight muscles.',
    d: 'M204 252 L214 232 L250 222 L296 230 L326 250 L336 292 L392 296 L418 320 L420 374 L396 396 L352 402 L318 388 L282 386 L252 372 L236 332 L214 290 Z',
    dot: [330, 340],
    end: [358, 496],
    tx: 346,
    ty: 526
  },
  {
    id: 'wing',
    label: 'Wings',
    text: 'Two pairs of wings. The pattern of veins and cells, such as the small areolet in the fore wing, is among the most useful characters for identifying genera.',
    d: 'M318 242 L380 196 L460 150 L560 100 L640 68 L720 48 L806 56 L852 116 L836 180 L724 252 L634 302 L530 328 L430 338 L372 304 L334 266 Z',
    dot: [600, 190],
    end: [520, 46],
    tx: 470,
    ty: 34
  },
  {
    id: 'meta',
    label: 'Metasoma',
    text: 'The rest of the abdomen. In Ichneumoninae, like this species, the ovipositor is short and hidden, and females attack caterpillars or pupae of butterflies and moths.',
    d: 'M420 374 L436 350 L480 340 L530 342 L620 350 L690 370 L748 400 L800 430 L826 456 L824 478 L796 474 L744 448 L686 428 L622 400 L560 388 L500 380 L452 394 Z',
    dot: [700, 400],
    end: [742, 336],
    tx: 724,
    ty: 324
  },
  {
    id: 'legs',
    label: 'Legs',
    text: 'Three pairs of legs. The hind coxae and femora are large and strongly sculptured here, characters that help to recognize Protoleptops.',
    d: 'M128 314 L146 322 L118 362 L88 412 L58 437 L-2 470 L-12 472 L-12 458 L48 424 L78 392 L106 350 Z M148 356 L193 360 L193 378 L158 378 L128 404 L98 450 L38 488 L-12 506 L-12 492 L28 474 L80 436 L108 394 Z M380 410 L400 400 L470 396 L515 392 L530 402 L612 468 L700 505 L778 540 L770 552 L690 520 L600 486 L520 420 L470 414 L400 422 Z M440 432 L470 425 L560 428 L690 440 L891 488 L891 522 L690 468 L560 462 L470 458 L440 450 Z',
    dot: [580, 452],
    end: [600, 516],
    tx: 600,
    ty: 544,
    anchor: 'middle'
  }
]

const active = ref(null)
const labelsOn = ref(false)
let timer
const current = computed(() => parts.find((p) => p.id === active.value) || null)
const pill = (p) => p.label.length * 14 + 26
const toggle = (id) => (active.value = active.value === id ? null : id)

onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  timer = setTimeout(() => (labelsOn.value = true), reduced ? 0 : 900)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.spx {
  --hi: var(--color-accent-light, #c9a06a);
}
.img-grey {
  opacity: 0;
  transition: opacity 0.35s ease;
}
.has-active .img-grey {
  opacity: 1;
}
.hot {
  fill: transparent;
  cursor: pointer;
}

/* labels */
.lbl {
  cursor: pointer;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: var(--ld, 0s);
  outline: none;
}
.ready .lbl {
  opacity: 1;
  transform: none;
}
.pill {
  fill: rgb(21 23 28 / 0.72);
  stroke: rgb(255 255 255 / 0.18);
  stroke-width: 1;
  transition: fill 0.2s, stroke 0.2s;
}
.lbl text {
  fill: #fff;
  font: 600 19px/1 var(--font-sans, system-ui, sans-serif);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  pointer-events: none;
}
.leader {
  stroke: rgb(255 255 255 / 0.7);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}
.dot {
  fill: var(--hi);
  stroke: #15171c;
  stroke-width: 2;
}
.lbl.on .pill,
.lbl:focus-visible .pill {
  fill: var(--hi);
  stroke: var(--hi);
}
.lbl.on text,
.lbl:focus-visible text {
  fill: #15171c;
}
.lbl.on .leader {
  stroke: var(--hi);
  stroke-dasharray: none;
}
/* while one part is chosen, the other labels step back */
.has-active .lbl:not(.on) {
  opacity: 0.45;
}

@media (prefers-reduced-motion: reduce) {
  .img-grey,
  .lbl {
    transition: none;
  }
}
</style>

<template>
  <!-- Cover for news without an image: dark card in the lab's colours,
       with the category, a large line of text and the EPIC mark. -->
  <div class="news-cover" role="img" :aria-label="label">
    <svg class="news-cover-veins" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <!-- wing-venation pattern, different for each news item -->
      <path
        v-for="(d, i) in veins"
        :key="i"
        :d="d"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
      />
    </svg>
    <div class="news-cover-body">
      <p class="news-cover-kicker">
        <span class="news-cover-glyph" aria-hidden="true">{{ glyph }}</span>{{ kickerText }}
      </p>
      <p class="news-cover-text" :class="{ 'news-cover-text-sm': bigText.length > 48 }" v-html="bigText" />
    </div>
    <LabMark class="news-cover-mark" body="#c9a06a" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  category: { type: String, default: '' },
  title: { type: String, default: '' },
  // the news "description", used to find the journal of a publication
  description: { type: String, default: '' },
  // optional `coverText` from the news front matter
  text: { type: String, default: '' },
  seed: { type: String, default: '' }
})

const GLYPHS = {
  publication: '❧',
  award: '✦',
  job: '➜',
  milestone: '◆',
  milestones: '◆',
  database: '▦',
  talk: '◉',
  outreach: '✿'
}

const kickerText = computed(() => props.category || 'News')
const glyph = computed(() => GLYPHS[props.category.toLowerCase()] || '•')

// Large text: coverText if given; for a publication the journal name
// (the italic part of "New publication in <i>Journal</i>!"); otherwise the title.
const bigText = computed(() => {
  if (props.text) return props.text
  if (/publication/i.test(props.category)) {
    const m = props.description.match(/<i>(.*?)<\/i>/i)
    if (m) return `<i>${m[1].replace(/<[^>]+>/g, '')}</i>`
  }
  return props.title
})

const label = computed(() => `${kickerText.value}: ${bigText.value.replace(/<[^>]+>/g, '')}`)

// A few curved "veins" whose shape depends on the news item, so covers differ
const veins = computed(() => {
  let h = 0
  const s = props.seed || props.title
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  const rnd = () => ((h = (h * 1103515245 + 12345) >>> 0) / 4294967296)
  const out = []
  for (let i = 0; i < 7; i++) {
    const y0 = 10 + rnd() * 160
    const y1 = 10 + rnd() * 160
    out.push(`M-10 ${y0.toFixed(1)} C ${(80 + rnd() * 60).toFixed(1)} ${(rnd() * 180).toFixed(1)}, ${(180 + rnd() * 60).toFixed(1)} ${(rnd() * 180).toFixed(1)}, 330 ${y1.toFixed(1)}`)
  }
  for (let i = 0; i < 5; i++) {
    const x = 30 + rnd() * 260
    out.push(`M${x.toFixed(1)} -10 Q ${(x + (rnd() - 0.5) * 80).toFixed(1)} 90, ${(x + (rnd() - 0.5) * 60).toFixed(1)} 190`)
  }
  return out
})
</script>

<style scoped>
.news-cover {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: radial-gradient(120% 120% at 0% 0%, #2a2d35 0%, #15171c 70%);
  color: #f8f7f4;
}
.news-cover-veins {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: #c9a06a;
  opacity: 0.16;
}
.news-cover-body {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.1rem 1.25rem;
}
.news-cover-kicker {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #c9a06a;
  margin: 0 0 0.4rem;
}
.news-cover-glyph {
  margin-right: 0.45em;
}
.news-cover-text {
  font-family: var(--font-display);
  font-size: 1.45rem;
  line-height: 1.15;
  font-weight: 600;
  margin: 0;
  max-width: 85%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.news-cover-text-sm {
  font-size: 1.15rem;
}
.news-cover-mark {
  position: absolute;
  top: 0.9rem;
  right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
  opacity: 0.85;
}
</style>

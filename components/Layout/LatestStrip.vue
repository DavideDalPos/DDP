<template>
  <!-- "What's new" strip under the header: the news and papers of the last
       30 days, one at a time. Replaces the dots next to News / Publications. -->
  <ClientOnly>
    <Transition name="strip">
      <div v-if="visible" class="latest-strip" role="region" aria-label="What's new">
        <div class="mx-auto flex max-w-[92rem] items-center gap-3 px-5 lg:px-8">
          <span class="latest-badge">
            <span class="latest-pulse" aria-hidden="true" />
            New
          </span>

          <div class="latest-viewport">
            <Transition name="swap" mode="out-in">
              <NuxtLink :key="current.link" :to="current.link" class="latest-item">
                <span class="latest-kind">{{ current.kind }}</span>
                <span class="latest-title" v-html="current.title" />
                <span v-if="current.where" class="latest-where" v-html="current.where" />
                <span class="latest-arrow" aria-hidden="true">→</span>
              </NuxtLink>
            </Transition>
          </div>

          <div v-if="items.length > 1" class="latest-dots" aria-hidden="true">
            <button
              v-for="(it, i) in items"
              :key="it.link"
              type="button"
              tabindex="-1"
              :class="{ on: i === index }"
              @click="go(i)"
            />
          </div>

          <button type="button" class="latest-close" aria-label="Hide what's new" @click="dismiss">×</button>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const DAYS = 30
const ROTATE_MS = 6000
const STORE_KEY = 'epic-latest-seen'

const [{ data: newsData }, { data: pubData }] = await Promise.all([
  useAsyncData('strip-news', () => queryCollection('news').all()),
  useAsyncData('strip-pubs', () => queryCollection('publications').all())
])

const stamp = (d) => {
  const t = new Date(d).getTime()
  return Number.isNaN(t) ? 0 : t
}
const clip = (s, n) => {
  const plain = String(s || '').replace(/<[^>]+>/g, '')
  return plain.length > n ? plain.slice(0, n).replace(/\s+\S*$/, '') + '…' : String(s || '')
}

const items = computed(() => {
  const since = Date.now() - DAYS * 864e5
  const news = (newsData.value || []).map((n) => ({
    kind: n.meta?.categories?.[0] === 'Publication' ? 'Paper' : n.meta?.categories?.[0] || 'News',
    title: clip(n.title || n.meta?.title, 90),
    where: '',
    link: n.path || '/news',
    t: stamp(n.meta?.date),
    pubTitle: n.meta?.categories?.[0] === 'Publication'
  }))
  const pubs = (pubData.value || []).map((p) => ({
    kind: 'Paper',
    title: clip(p.title || p.meta?.title, 90),
    where: p.meta?.journal ? `<i>${p.meta.journal}</i>` : '',
    link: p.path || '/publications',
    t: stamp(p.meta?.date)
  }))
  // a paper that also has a news story is shown once, through the paper
  const all = [...pubs, ...news.filter((n) => !n.pubTitle)]
  return all.filter((x) => x.t >= since).sort((a, b) => b.t - a.t).slice(0, 5)
})

const index = ref(0)
const current = computed(() => items.value[index.value] || items.value[0])
const seen = ref(0)
const mounted = ref(false)
const visible = computed(() => mounted.value && items.value.length > 0 && items.value[0].t > seen.value)

let timer
function start() {
  stop()
  if (items.value.length > 1) timer = setInterval(() => (index.value = (index.value + 1) % items.value.length), ROTATE_MS)
}
function stop() {
  if (timer) clearInterval(timer)
}
function go(i) {
  index.value = i
  start()
}
function dismiss() {
  seen.value = items.value[0]?.t || Date.now()
  try {
    localStorage.setItem(STORE_KEY, String(seen.value))
  } catch {
    // storage blocked: hidden for this visit only
  }
}

onMounted(() => {
  try {
    seen.value = Number(localStorage.getItem(STORE_KEY)) || 0
  } catch {
    seen.value = 0
  }
  mounted.value = true
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start()
})
onBeforeUnmount(stop)
</script>

<style scoped>
.latest-strip {
  background: var(--color-ink-2);
  color: rgb(255 255 255 / 0.85);
  border-top: 1px solid rgb(255 255 255 / 0.06);
  font-size: 0.85rem;
}
.latest-strip > div {
  min-height: 2.5rem;
}
.latest-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  flex-shrink: 0;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-light);
}
.latest-pulse {
  position: relative;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: var(--color-accent-light);
}
.latest-pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  animation: pulse 2s ease-out infinite;
}
@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 0.7;
  }
  to {
    transform: scale(3);
    opacity: 0;
  }
}
.latest-viewport {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.latest-item {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  min-width: 0;
  padding: 0.55rem 0;
  white-space: nowrap;
}
.latest-kind {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.05rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgb(255 255 255 / 0.18);
  color: rgb(255 255 255 / 0.7);
}
.latest-title {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: #fff;
}
.latest-where {
  flex-shrink: 0;
  color: rgb(255 255 255 / 0.55);
}
.latest-arrow {
  flex-shrink: 0;
  color: var(--color-accent-light);
  transition: transform 0.25s ease;
}
.latest-item:hover .latest-title {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.latest-item:hover .latest-arrow {
  transform: translateX(3px);
}
.latest-dots {
  display: flex;
  gap: 0.35rem;
  flex-shrink: 0;
}
.latest-dots button {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.25);
  transition: background 0.2s, width 0.3s;
}
.latest-dots button.on {
  width: 1.1rem;
  background: var(--color-accent-light);
}
.latest-close {
  flex-shrink: 0;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0 0.25rem;
  color: rgb(255 255 255 / 0.5);
}
.latest-close:hover {
  color: #fff;
}
@media (max-width: 640px) {
  .latest-where,
  .latest-dots {
    display: none;
  }
}
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.strip-leave-active {
  transition: opacity 0.25s ease;
}
.strip-leave-to {
  opacity: 0;
}
</style>

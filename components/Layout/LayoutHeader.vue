<template>
  <header
    class="sticky top-0 z-50 text-white transition-[background-color,box-shadow] duration-300"
    :class="scrolled ? 'bg-ink/92 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md' : 'bg-ink'"
  >
    <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
      <!-- Brand -->
      <NuxtLink
        to="/"
        class="group flex min-w-0 items-center gap-3"
        aria-label="EPIC Lab — home"
      >
        <LabMark class="h-10 w-10 shrink-0" />
        <span class="flex min-w-0 flex-col leading-none">
          <span class="font-display text-xl font-semibold tracking-tight">EPIC Lab</span>
          <span class="mt-1 truncate text-[0.7rem] tracking-wide text-white/60">Davide Dal Pos · University of Missouri</span>
        </span>
      </NuxtLink>

      <!-- Desktop -->
      <div class="hidden items-center gap-1 lg:flex">
        <div
          v-for="item in links"
          :key="item.label"
          class="relative"
          @mouseenter="item.submenu && (open = item.label)"
          @mouseleave="item.submenu && (open = null)"
        >
          <button
            v-if="item.submenu"
            type="button"
            class="nav-link flex items-center gap-1"
            :class="{ active: isActive(item) }"
            :aria-expanded="open === item.label"
            @click="open = open === item.label ? null : item.label"
          >
            {{ item.label }}
            <svg
              class="h-3 w-3 transition-transform duration-300"
              :class="{ 'rotate-180': open === item.label }"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <NuxtLink
            v-else
            :to="item.link"
            class="nav-link relative"
            :class="{ active: isActive(item) }"
          >
            {{ item.label }}
            <span
              v-if="item.dot === 'news' ? isNewNews : item.dot === 'pubs' ? isNewPublication : false"
              class="absolute right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-amber"
            >
              <span class="absolute inset-0 animate-ping rounded-full bg-amber opacity-60" />
            </span>
          </NuxtLink>

          <!-- Dropdown -->
          <Transition name="drop">
            <div
              v-if="item.submenu && open === item.label"
              class="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
            >
              <div class="w-72 overflow-hidden rounded-md border border-white/10 bg-ink-2 p-2 shadow-2xl">
                <NuxtLink
                  v-for="child in item.submenu"
                  :key="child.link"
                  :to="child.link"
                  class="group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-white/5"
                >
                  <span>
                    <span class="block text-sm font-semibold text-white">{{ child.label }}</span>
                    <span
                      v-if="child.hint"
                      class="block text-xs leading-snug text-white/55"
                      >{{ child.hint }}</span
                    >
                  </span>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <NuxtLink
          to="/join"
          class="btn btn-ghost ml-3 !px-4 !py-2 text-sm text-white/90 hover:bg-white hover:text-ink"
        >
          Join the lab
        </NuxtLink>
      </div>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="-mr-2 rounded-lg p-2 text-white/90 transition hover:bg-white/10 lg:hidden"
        :aria-expanded="menuOpen"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="relative block h-4 w-6">
          <span
            class="burger top-0"
            :class="{ 'translate-y-[7px] rotate-45': menuOpen }"
          />
          <span
            class="burger top-[7px]"
            :class="{ 'opacity-0': menuOpen }"
          />
          <span
            class="burger top-[14px]"
            :class="{ '-translate-y-[7px] -rotate-45': menuOpen }"
          />
        </span>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition name="drop">
      <div
        v-if="menuOpen"
        class="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-ink px-5 pb-6 lg:hidden"
      >
        <template
          v-for="item in links"
          :key="item.label"
        >
          <div
            v-if="item.submenu"
            class="border-b border-white/10 py-3"
          >
            <p class="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{{ item.label }}</p>
            <NuxtLink
              v-for="child in item.submenu"
              :key="child.link"
              :to="child.link"
              class="flex items-center gap-3 py-2 text-white/90"
            >
              {{ child.label }}
            </NuxtLink>
          </div>
          <NuxtLink
            v-else
            :to="item.link"
            class="block border-b border-white/10 py-3 text-white/90"
            >{{ item.label }}</NuxtLink
          >
        </template>
        <NuxtLink
          to="/join"
          class="btn mt-5 w-full justify-center bg-white text-ink"
          >Join the lab <span class="arrow">→</span></NuxtLink
        >
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { pillars } from '~/components/Lab/labData.js'

const route = useRoute()
const open = ref(null)
const menuOpen = ref(false)
const scrolled = ref(false)

const links = [
  {
    label: 'Research',
    base: '/research',
    submenu: [
      { label: 'Overview', link: '/research', hint: 'How the four areas fit together' },
      ...pillars.map((p) => ({ label: p.name, link: p.link, hint: p.tagline, color: p.hex })),
      { label: 'Species described', link: '/species', hint: 'Map and list of new taxa' }
    ]
  },
  {
    label: 'Lab',
    base: ['/people', '/join', '/network'],
    submenu: [
      { label: 'People', link: '/people', hint: 'Who we are' },
      { label: 'Join the lab', link: '/join', hint: 'Graduate, undergraduate and postdoc positions' },
      { label: 'Network', link: '/network', hint: 'Collaborators around the world' }
    ]
  },
  { label: 'Publications', link: '/publications', dot: 'pubs' },
  { label: 'Teaching', link: '/teaching' },
  { label: 'News', link: '/news', dot: 'news' },
  { label: 'CV', link: '/cv' },
  { label: 'Contact', link: '/contact' }
]

function isActive(item) {
  const p = route.path
  if (item.link) return item.link === '/' ? p === '/' : p.startsWith(item.link)
  const bases = Array.isArray(item.base) ? item.base : [item.base]
  return bases.some((b) => p.startsWith(b)) || (item.label === 'Research' && p.startsWith('/species'))
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(
  () => route.fullPath,
  () => {
    open.value = null
    menuOpen.value = false
  }
)

// Small dot next to News / Publications when something was added in the last 30 days
const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30
const [{ data: newsData }, { data: pubData }] = await Promise.all([
  useAsyncData('header-news', () => queryCollection('news').all()),
  useAsyncData('header-pubs', () => queryCollection('publications').all())
])
function hasRecent(items) {
  if (!items?.length) return false
  let latest = 0
  for (const it of items) {
    const t = new Date(it.meta?.date).getTime()
    if (!Number.isNaN(t) && t > latest) latest = t
  }
  return latest > 0 && Date.now() - latest < THIRTY_DAYS
}
const isNewNews = computed(() => hasRecent(newsData.value))
const isNewPublication = computed(() => hasRecent(pubData.value))
</script>

<style scoped>
.nav-link {
  position: relative;
  padding: 0.5rem 0.7rem;
  font-size: 0.92rem;
  font-weight: 500;
  color: rgb(255 255 255 / 0.82);
  transition: color 0.2s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0.7rem;
  right: 0.7rem;
  bottom: 0.2rem;
  height: 1px;
  background: var(--color-accent-light);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.nav-link:hover,
.nav-link.active {
  color: #fff;
}
.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}
.burger {
  position: absolute;
  left: 0;
  height: 2px;
  width: 100%;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.3s ease, opacity 0.2s ease;
}
.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

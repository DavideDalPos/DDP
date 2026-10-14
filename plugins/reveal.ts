// v-reveal: fades and lifts an element in when it scrolls into view.
//   <div v-reveal>…</div>          reveal on scroll
//   <div v-reveal="120">…</div>    …with a 120 ms delay (for staggering)
// Content stays visible when JavaScript is off: elements are only hidden
// once this plugin has switched the "reveal-on" class on <html>.
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  if (import.meta.client) {
    document.documentElement.classList.add('reveal-on')
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer?.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() {
      return { class: 'reveal', 'data-allow-mismatch': 'class' }
    },
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      observer?.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    }
  })
})

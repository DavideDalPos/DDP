// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

const title = 'EPIC Lab — Davide Dal Pos'
const description =
  'The EPIC Lab (Species Exploration, Phenomics, Informatics & Conservation) at the University of Missouri, led by Davide Dal Pos: insect systematics, phenomics, biodiversity informatics and collections-based conservation.'

export default defineNuxtConfig({
  // Pages are rendered to real HTML at build time (static site on GitHub Pages),
  // so search engines and link previews see the full content.
  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },

  modules: ['@nuxt/content', '@nuxtjs/leaflet'],

  css: ['~/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: description },
        { name: 'theme-color', content: '#15171c' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'EPIC Lab' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: 'https://davidedalpos.com/images/lab/og-card.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400..700&family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  // Old research addresses keep working
  routeRules: {
    '/research/systematics': { redirect: '/research/exploration' },
    '/research/evolution': { redirect: '/research/phenomics' },
    '/research/collection': { redirect: '/research/informatics' }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/research/systematics', '/research/evolution', '/research/collection']
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
})

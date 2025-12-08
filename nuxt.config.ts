// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: false, // ✅ disable SSR for GitHub Pages
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxtjs/leaflet'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  }
})

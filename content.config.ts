import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    publications: defineCollection({
      type: 'page',
      source: 'publications/**/*.md' 
    }),
    news: defineCollection({
      type: 'page',
      source: 'news/**/*.md' 
    })
  }
})

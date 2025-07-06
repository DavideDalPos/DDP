import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    publications: defineCollection({
      type: 'page',
      source: 'publications/*.md'
    })
  }
})

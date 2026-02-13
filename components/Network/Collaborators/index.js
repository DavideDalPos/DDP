const modules = import.meta.glob('./*.js', { eager: true })

export const collaborators = Object.values(modules)
  .filter(m => m.default)
  .map(m => m.default)

export const PUBLICATION_PAGE_URL = '/publications'


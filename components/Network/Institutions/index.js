const modules = import.meta.glob('./*.js', { eager: true })

export const institutions = Object.values(modules)
  .filter(m => m.default)
  .map(m => m.default)

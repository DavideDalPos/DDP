// Helpers shared by the publication list and the publication pages.

export const ME = 'Dal Pos'

// Research topics used for filtering, derived from each paper's `category` list
export const TOPICS = [
  { key: 'taxonomy', label: 'Taxonomy & systematics', match: ['Taxonomy', 'Phylogeny'] },
  { key: 'morphology', label: 'Morphology & evolution', match: ['Evolution', 'Morphology', 'Ontology'] },
  { key: 'collections', label: 'Collections & faunistics', match: ['Collection', 'Checklist'] },
  { key: 'ecology', label: 'Ecology', match: ['Ecology'] },
  { key: 'commentary', label: 'Commentary', match: ['Opinion'] }
]

export function topicsOf(pub) {
  const cats = pub.meta?.category || []
  return TOPICS.filter((t) => t.match.some((m) => cats.includes(m))).map((t) => t.key)
}

// Higher taxa named in the categories (shown as small tags)
const TAXA = ['Ichneumonidae', 'Braconidae', 'Stephanidae', 'Ibaliidae', 'Cynipoidea', 'Vespidae', 'Ichneumonoidea']
export function taxaOf(pub) {
  const cats = pub.meta?.category || []
  return TAXA.filter((t) => cats.includes(t))
}

export const stripHtml = (s = '') => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()

export const yearOf = (pub) => new Date(pub.meta?.date).getUTCFullYear()

export function cleanDoi(doi = '') {
  return String(doi).replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim()
}
export const doiUrl = (doi) => (doi ? `https://doi.org/${cleanDoi(doi)}` : '')

function initials(first = '') {
  return first
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((n) => n[0].toUpperCase() + '.')
    .join(' ')
}

export const isMe = (a) => a.last_name === ME && (a.first_name || '').startsWith('D')

// "Last, F., Last, F. & Last, F."  — `html` wraps the PI's name in <strong>
export function authorList(authors = [], { html = false } = {}) {
  const names = authors.map((a) => {
    const n = `${a.last_name}, ${initials(a.first_name)}`
    return html && isMe(a) ? `<strong>${n}</strong>` : n
  })
  if (names.length <= 1) return names.join('')
  return names.slice(0, -1).join(', ') + ' & ' + names.at(-1)
}

export const isFirstAuthor = (pub) => {
  const a = pub.meta?.authors?.[0]
  return a ? isMe(a) : false
}

// Volume(issue): pages
export function sourceLine(meta = {}) {
  let s = ''
  if (meta.volume) s += meta.volume
  if (meta.issue) s += `(${meta.issue})`
  if (meta.pagination) s += (s ? ': ' : '') + meta.pagination
  return s
}

// A plain-text citation, ready to paste
export function citation(pub) {
  const m = pub.meta || {}
  const doi = cleanDoi(m.doi)
  const src = sourceLine(m)
  return `${authorList(m.authors)} (${yearOf(pub)}) ${stripHtml(pub.title)}. ${m.journal}${src ? ', ' + src : ''}.${doi ? ' https://doi.org/' + doi : ''}`
}

// BibTeX entry
export function bibtex(pub) {
  const m = pub.meta || {}
  const first = (m.authors?.[0]?.last_name || 'ref').replace(/\s+/g, '')
  const key = `${first}${yearOf(pub)}${stripHtml(pub.title).split(/\s+/)[0].replace(/\W/g, '')}`
  const title = String(pub.title).replace(/<i>(.*?)<\/i>/gi, '\\textit{$1}').replace(/<[^>]+>/g, '')
  const fields = [
    ['author', (m.authors || []).map((a) => `${a.last_name}, ${a.first_name}`).join(' and ')],
    ['title', `{${title}}`],
    ['journal', m.journal],
    ['year', String(yearOf(pub))],
    ['volume', m.volume],
    ['number', m.issue],
    ['pages', (m.pagination || '').replace('–', '--')],
    ['doi', cleanDoi(m.doi)]
  ].filter(([, v]) => v)
  return `@article{${key},\n${fields.map(([k, v]) => `  ${k} = {${v}}`).join(',\n')}\n}`
}

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

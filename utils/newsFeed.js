// All news, plus an automatic news item for every publication that has no
// news story of its own. A paper becomes news just by adding its file to
// content/publications/; write a news story only when you want to say more.
// (A story "belongs" to a paper when one of its links points to the paper's page.)
// Only papers from AUTO_FROM on, so older papers don't flood the news.
const AUTO_FROM = '2026-09-01'

import { queryCollection } from '#imports'

export async function loadNewsFeed() {
    try {
    const [news, pubs] = await Promise.all([
      queryCollection('news').all(),
      queryCollection('publications').all()
    ])
    const norm = (p) => String(p || '').toLowerCase().replace(/\/$/, '')
    const covered = new Set(
      news.flatMap((n) => (n.meta?.links || []).map((l) => norm(l?.url)))
    )
    const auto = pubs
      .filter((p) => p.meta?.date && String(p.meta.date) >= AUTO_FROM && !covered.has(norm(p.path)))
      .map((p) => ({
        title: p.title || p.meta?.title || 'New publication',
        path: p.path,
        description: p.meta?.journal
          ? `New publication in <strong><i>${p.meta.journal}</i></strong>!`
          : 'New publication!',
        auto: true,
        meta: {
          date: String(p.meta.date),
          categories: ['Publication'],
          clickable: true,
          image: p.meta?.image || '',
          imageAlt: p.meta?.imageAlt || p.title || '',
          summary: ''
        }
      }))
    return [...news, ...auto]
    } catch (e) {
      console.error('[newsFeed]', e)
      return []
    }
}

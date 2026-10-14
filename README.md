# EPIC Lab — davidedalpos.com

Website of the EPIC Lab (Species Exploration, Phenomics, Informatics & Conservation),
led by Davide Dal Pos at the University of Missouri. Built with Nuxt 4, Nuxt Content and Tailwind CSS 4,
published on GitHub Pages.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Publish

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site with
`nuxt build --preset github_pages`. Every page is rendered to real HTML at build time,
so search engines and link previews (email, Slack, social media) see the full content.

To check the published version locally: `npx nuxt build --preset github_pages && npx serve .output/public`.

## Where to edit things

| What | File |
| --- | --- |
| Lab name, email, division, museum link, the four pillars, resources | `components/Lab/labData.js` |
| Lab members (People page) | `components/Lab/people.js` |
| Research pages | `pages/research/exploration.vue`, `phenomics.vue`, `informatics.vue`, `conservation.vue` |
| Positions and how to apply | `pages/join.vue` |
| Home page sections | `components/Home/` |
| News | `content/news/<year>/*.md` |
| Publications | `content/publications/<year>/*.md` |
| CV jobs, education, awards, funding | `components/cv/*Data.js` |
| Species described | `components/Species/SpeciesData.js` |
| Collaborators | `components/Network/Collaborators/*.js` |
| Colours and fonts | `assets/css/vars.css` |

The old addresses `/research/systematics`, `/research/evolution` and `/research/collection`
redirect to the new pillar pages.

## Design

- Colours: ink `#1b1726`, paper `#faf7f2`, and one colour per pillar —
  Exploration amber `#e3893b`, Phenomics lavender `#8a6fd8`,
  Informatics teal `#2f909e`, Conservation sage `#5d9259`.
- Fonts: Fraunces (headings) and Inter (text), from Google Fonts.
- Animations respect the visitor's "reduce motion" setting.
- `v-reveal` (see `plugins/reveal.ts`) fades elements in as they scroll into view.

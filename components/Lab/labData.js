// ─────────────────────────────────────────────────────────────
// EPIC Lab — the shared content of the site.
// Edit text here and it updates on every page that uses it.
// ─────────────────────────────────────────────────────────────

export const lab = {
  short: 'EPIC Lab',
  name: 'Species Exploration, Phenomics, Informatics & Conservation Lab',
  pi: 'Davide Dal Pos',
  division: 'Division of Plant Science & Technology',
  university: 'University of Missouri',
  city: 'Columbia, Missouri',
  email: 'davide.dalpos@missouri.edu',
  museum: {
    name: 'Enns Entomology Museum',
    url: 'https://enns-entomology-museum.github.io/Enns_Entomology_Museum_Database/',
    holdings: 'more than 7 million'
  }
}

// One entry per pillar. Class names are written out in full so Tailwind keeps them.
export const pillars = [
  {
    key: 'exploration',
    letter: 'E',
    name: 'Species Exploration',
    verb: 'explore',
    tagline: 'Finding, naming and classifying insect diversity.',
    summary:
      'Taxonomy and systematics of parasitoid wasps — above all Ichneumonidae — and other insects: new species, revisions, phylogenies and fieldwork.',
    link: '/research/exploration',
    hex: '#8c5e2a',
    text: 'text-amber-deep',
    bg: 'bg-amber',
    soft: 'bg-amber-soft',
    border: 'border-amber',
    icon: 'M11 4a7 7 0 1 0 4.4 12.45l4.08 4.07 1.41-1.41-4.07-4.08A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z'
  },
  {
    key: 'phenomics',
    letter: 'P',
    name: 'Phenomics',
    verb: 'measure',
    tagline: 'Why insects look the way they do.',
    summary:
      'Comparative anatomy, imaging and anatomy ontologies to measure form at scale and trace how morphological traits evolve.',
    link: '/research/phenomics',
    hex: '#8c5e2a',
    text: 'text-lav-deep',
    bg: 'bg-lav',
    soft: 'bg-lav-soft',
    border: 'border-lav',
    icon: 'M12 5C6.5 5 2.7 9.4 1.6 11.4a1.3 1.3 0 0 0 0 1.2C2.7 14.6 6.5 19 12 19s9.3-4.4 10.4-6.4a1.3 1.3 0 0 0 0-1.2C21.3 9.4 17.5 5 12 5Zm0 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z'
  },
  {
    key: 'informatics',
    letter: 'I',
    name: 'Informatics',
    verb: 'connect',
    tagline: 'Turning specimens into open, connected data.',
    summary:
      'Biodiversity databases, digitization and data standards that link specimens, names, images and literature — WID, Syrphidae of Italy and the Enns Museum.',
    link: '/research/informatics',
    hex: '#8c5e2a',
    text: 'text-teal-deep',
    bg: 'bg-teal',
    soft: 'bg-teal-soft',
    border: 'border-teal',
    icon: 'M6 3a3 3 0 0 0-1 5.83v6.34A3 3 0 1 0 8.83 19h6.34A3 3 0 1 0 19 15.17V8.83A3 3 0 1 0 15.17 5H8.83A3 3 0 0 0 6 3Zm2.83 4h6.34A3 3 0 0 0 17 8.83v6.34A3 3 0 0 0 15.17 17H8.83A3 3 0 0 0 7 15.17V8.83A3 3 0 0 0 8.83 7Z'
  },
  {
    key: 'conservation',
    letter: 'C',
    name: 'Conservation',
    verb: 'conserve',
    tagline: 'Using collections to document change.',
    summary:
      'Historical specimens as a baseline: resurveys, regional checklists and data that help track — and protect — insect diversity over time.',
    link: '/research/conservation',
    hex: '#8c5e2a',
    text: 'text-sage-deep',
    bg: 'bg-sage',
    soft: 'bg-sage-soft',
    border: 'border-sage',
    icon: 'M20 3c-7.5 0-13.6 2.6-15.3 8.6-.7 2.4-.4 4.6.6 6.2L3 20.1 4.4 21.5l2.3-2.3c1.6 1 3.8 1.3 6.2.6C18.9 18.1 21 12 21 4V3h-1Zm-2 2.05c-.3 5.98-2.3 10.2-5.65 11.15-1.6.46-3 .34-4.05-.2l5.4-5.4-1.4-1.4-5.4 5.4c-.55-1.06-.67-2.45-.2-4.05C7.6 7.3 11.7 5.3 18 5.05Z'
  }
]

export const pillarByKey = Object.fromEntries(pillars.map((p) => [p.key, p]))

// Tools and resources the lab runs or contributes to
export const resources = [
  {
    name: 'World Ichneumonidae Database',
    short: 'WID',
    url: 'https://worldichneumonidae.com',
    text: 'Names, literature and specimens for the world’s Darwin wasps.'
  },
  {
    name: 'Syrphidae of Italy',
    short: 'SoI',
    url: 'https://syrphidaeitaly.com',
    text: 'A checklist and database of Italian hoverflies, published to GBIF.'
  },
  {
    name: 'Enns Entomology Museum',
    short: 'Enns',
    url: 'https://enns-entomology-museum.github.io/Enns_Entomology_Museum_Database/',
    text: 'Missouri’s insect collection — specimens, images and data online.'
  },
  {
    name: 'Hymenoptera Anatomy Ontology',
    short: 'HAO',
    url: 'http://portal.hymao.org/',
    text: 'A shared, machine-readable vocabulary for wasp, bee and ant anatomy.'
  }
]

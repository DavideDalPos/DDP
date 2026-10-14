<script setup>
const focus = [
  { title: 'Taxonomic databases', text: 'WID and Syrphidae of Italy, built on TaxonWorks and TaxonPages.' },
  { title: 'Digitization', text: 'Specimen data, labels and images from the Enns Entomology Museum.' },
  { title: 'Open data', text: 'Publishing to GBIF so that anyone can reuse what we gather.' },
  { title: 'Linked knowledge', text: 'Connecting specimens, names, images, anatomy and literature.' }
]
const links = [
  { label: 'World Ichneumonidae Database', href: 'https://worldichneumonidae.com' },
  { label: 'Syrphidae of Italy', href: 'https://syrphidaeitaly.com' },
  { label: 'Enns Entomology Museum', href: 'https://enns-entomology-museum.github.io/Enns_Entomology_Museum_Database/' },
  { label: 'University of Central Florida Collection', href: 'https://slkelly1.github.io/UCFC_Database/#/' }
]
const figure = {
  src: '/images/lab/compactors.jpg',
  alt: 'Compactor cabinets in the Enns Entomology Museum',
  caption: 'The Enns Entomology Museum: more than 7 million specimens, now going online.'
}
</script>

<template>
  <LabPillarLayout
    pillar="informatics"
    title="Turning specimens into connected data"
    lede="Collections are research infrastructure. We digitize them, link them and open them up."
    :focus="focus"
    :links="links"
    :figure="figure"
  >
    <p class="lead">
      Collections are more than repositories of specimens — they are <strong>engines of discovery</strong> that preserve
      biodiversity, raise new questions and inform conservation and evolutionary studies.
    </p>

    <h2>Collections as data</h2>
    <p>
      We combine hands-on work in entomological collections with <strong>digitization and data integration</strong>, so
      that specimens and their information are widely accessible. High-resolution imaging, structured metadata and
      interoperable databases make global collaboration possible and connect specimens with phylogenetic, ecological and
      morphological datasets.
    </p>

    <h2>Databases we build</h2>
    <p>
      We develop and manage databases such as the
      <a href="https://worldichneumonidae.com" target="_blank" rel="noopener">World Ichneumonidae Database (WID)</a> and
      <a href="https://syrphidaeitaly.com" target="_blank" rel="noopener">Syrphidae of Italy (SoI)</a>, which supports
      collaborative taxonomy, ontology-based annotation and biodiversity analyses — and is now a publisher in GBIF.
    </p>
    <p>
      At the
      <a href="https://enns-entomology-museum.github.io/Enns_Entomology_Museum_Database/" target="_blank" rel="noopener">Enns Entomology Museum</a>
      we are digitizing Missouri’s insect collection in TaxonWorks and sharing specimens, images and data online.
    </p>

    <h2>Why it matters</h2>
    <p>
      Through this work we want to show collections for what they are: <strong>strategic, data-driven resources</strong>,
      essential for taxonomy, conservation, evolutionary biology and understanding global biodiversity patterns.
    </p>

    <template #after>
      <ResearchCollectionBib />
    </template>
  </LabPillarLayout>
</template>

<script setup>
const focus = [
  { title: 'Comparative anatomy', text: 'Skeletomuscular anatomy, including the evolution of male genitalia.' },
  { title: 'Imaging', text: 'Focus stacking, SEM and micro-CT to capture form in detail.' },
  { title: 'Anatomy ontologies', text: 'Building and using the Hymenoptera Anatomy Ontology (HAO).' },
  { title: 'Phylomics', text: 'Joining large morphological datasets with genomic frameworks.' }
]
const links = [
  { label: 'Hymenoptera Anatomy Ontology portal', href: 'http://portal.hymao.org/' },
  { label: 'HAO on the Ontology Lookup Service', href: 'https://www.ebi.ac.uk/ols4/ontologies/hao' },
  { label: 'Publications', to: '/publications' }
]
const figure = {
  src: '/images/lab/phylomics.jpg',
  alt: 'Diagram: the phylomics era bridges phenomics and genomics',
  caption: 'Phylomics: bridging comparable, quantitative morphological datasets with genomics.'
}
</script>

<template>
  <LabPillarLayout
    pillar="phenomics"
    title="Why insects look the way they do"
    lede="Phenomics is the large-scale study of organismal form, function and variation — and of how those traits evolve."
    :focus="focus"
    :links="links"
    :figure="figure"
  >
    <p class="lead">
      We want to move the <strong>phenomics era</strong> into a <strong>phylomics era</strong>: large-scale
      morphological data integrated with genomic frameworks to understand the evolution of form, function and diversity
      in insects.
    </p>

    <h2>Form, measured</h2>
    <p>
      Our research asks why insects look the way they do, and how morphological traits evolve in response to ecological
      pressures and evolutionary history. By combining detailed <strong>skeletomuscular anatomy</strong>, advanced
      <strong>imaging</strong> and phylogenetic frameworks, we explore the mechanisms that shape the extraordinary
      diversity of forms in parasitoid wasps.
    </p>

    <figure class="not-prose my-8 overflow-hidden rounded-md border border-line bg-white">
      <img src="/images/lab/misetus.jpg" alt="Three frontal views of Misetus heads" class="w-full" loading="lazy" />
      <figcaption class="px-5 py-3 text-xs text-muted">Heads of <i>Misetus</i> in frontal view — comparable images are the raw material of phenomics.</figcaption>
    </figure>

    <h2>Ontologies: a shared language for anatomy</h2>
    <p>
      We actively <strong>build anatomy ontologies</strong> and use them at the core of our evolutionary studies.
      Ontologies provide a semantic, interoperable and machine-readable framework for describing morphology, so that
      anatomical terms are standardized, logically structured and comparable across taxa and studies.
    </p>
    <p>
      Resources such as the
      <a href="https://www.ebi.ac.uk/ols4/ontologies/hao" target="_blank" rel="noopener">Hymenoptera Anatomy Ontology (HAO)</a>
      make large-scale integration of morphological data possible and lay the groundwork for AI-assisted analyses.
    </p>
    <p>
      Linking HAO with specimen databases and digital resources allows consistent annotation of collections and
      literature, opening the door to computational analyses in comparative morphology, evolutionary biology and
      biodiversity informatics.
    </p>

    <template #after>
      <ResearchEvolutionBib />
    </template>
  </LabPillarLayout>
</template>

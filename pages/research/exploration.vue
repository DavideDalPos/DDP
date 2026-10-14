<script setup>
const focus = [
  { title: 'New species and revisions', text: 'Describing species and revising genera, with keys and rich imaging.' },
  { title: 'Darwin wasps and relatives', text: 'Ichneumonidae — especially Ichneumoninae — and Braconidae.' },
  { title: 'Phylogeny and trait evolution', text: 'Trees that show how key traits arose, and a first calibrated phylogeny of the family.' },
  { title: 'Faunistics', text: 'Regional inventories, from Sicilian nature reserves to Missouri.' }
]
const links = [
  { label: 'World Ichneumonidae Database', href: 'https://worldichneumonidae.com' },
  { label: 'Species we have described', to: '/species' },
  { label: 'Publications', to: '/publications' }
]
const figure = {
  src: '/images/lab/phylogeny.jpg',
  alt: 'Phylogeny of Ichneumonidae with morphological traits mapped on the tips',
  caption: 'Key trait syndromes mapped on a phylogeny of Ichneumonidae (Dal Pos et al., 2024).'
}
</script>

<template>
  <LabPillarLayout
    pillar="exploration"
    title="Exploring the diversity of parasitoid wasps"
    lede="Finding, naming and classifying insects — starting with one of the most species-rich families of animals on Earth."
    :focus="focus"
    :links="links"
    :figure="figure"
  >
    <p class="lead">
      Species exploration is where everything starts: recognising that an organism is distinct, giving it a name and
      placing it on the tree of life.
    </p>

    <h2>Darwin wasps</h2>
    <p>
      Much of our work focuses on the systematics, taxonomy and classification of parasitoid wasps, with a particular
      emphasis on <strong>Ichneumonidae</strong> (Hymenoptera, Ichneumonoidea) — a hyperdiverse family with about
      <strong>25,000 described species</strong> and an estimated <strong>100,000 species</strong> still waiting to be
      described.
    </p>
    <p>
      Our taxonomic work has centred on the subfamily <strong>Ichneumoninae</strong>, the largest in the family, where
      we have described several new species. It extends across the whole family and to related groups such as
      <strong>Braconidae</strong>.
    </p>

    <h2>From descriptions to the tree of life</h2>
    <p>
      We describe new species, revise key genera and build resources such as the
      <a href="https://worldichneumonidae.com" target="_blank" rel="noopener">World Ichneumonidae Database (WID)</a>,
      which gives researchers worldwide the tools to study the evolution, ecology and diversity of these ecologically
      important insects.
    </p>
    <p>
      We have investigated the evolution of key trait syndromes in Ichneumonidae and produced a
      <strong>phylogeny</strong> of the family. We are now working on the first <strong>calibrated phylogeny</strong> of
      the group, to identify the major shifts in its morphological evolution.
    </p>

    <h2>Beyond wasps</h2>
    <p>
      Exploration also means knowing what lives around us. Through
      <a href="https://syrphidaeitaly.com" target="_blank" rel="noopener">Syrphidae of Italy</a> we document the
      hoverflies of Italy, and through the Enns Entomology Museum we are building a picture of Missouri’s insect fauna,
      drawer by drawer.
    </p>

    <template #after>
      <ResearchTaxonomyBib />
    </template>
  </LabPillarLayout>
</template>

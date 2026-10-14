<template>
  <div>
    <div v-if="pdf" class="overflow-hidden rounded-md border border-line bg-white">
      <div class="flex items-center justify-between border-b border-line px-4 py-2.5 text-sm">
        <span class="font-semibold">Full text (PDF)</span>
        <a :href="pdf" target="_blank" rel="noopener" class="font-semibold underline underline-offset-4 hover:text-accent-deep">Open in a new tab ↗</a>
      </div>
      <iframe :src="pdf" title="PDF of the article" class="h-[720px] w-full" loading="lazy" />
    </div>

    <div v-else class="rounded-md border border-dashed border-line px-6 py-8 text-center text-sm text-muted">
      <p>The PDF is not hosted on this site.</p>
      <div class="mt-4 flex flex-wrap justify-center gap-3">
        <a v-if="doi" :href="doi" target="_blank" rel="noopener" class="btn btn-ghost !py-2 text-ink hover:bg-ink hover:text-white">Journal page ↗</a>
        <a v-if="researchgate" :href="researchgate" target="_blank" rel="noopener" class="btn btn-ghost !py-2 text-ink hover:bg-ink hover:text-white">Request on ResearchGate ↗</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pdf: String,
  researchgate: String,
  doi: String
})
</script>

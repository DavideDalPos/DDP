<template>
<footer class="bg-[#26333b] text-[#eae7dd] text-sm py-8 border-t-[3px] border-[#3a4b56]">
  <div class="container mx-auto px-4 flex flex-col items-center gap-4">
    <div class="text-center space-y-3">
      <!-- TODO: update affiliation once your MU appointment is finalized -->
      <p class="opacity-90 leading-relaxed">
        © {{ currentYear }} Davide Dal Pos, Ph.D.
        <span class="block sm:inline">
          <span class="hidden sm:inline"> · </span>University of Central Florida
        </span>
      </p>

      <div class="flex flex-wrap justify-center gap-1 sm:gap-2 text-[#eae7dd]/80">
        <a href="mailto:daveliga@gmail.com" aria-label="Email" class="p-2 hover:text-[#c07a4b] transition-colors duration-200">
          <IconEmail class="w-6 h-6" />
        </a>
        <a href="https://orcid.org/0000-0002-9122-934X" target="_blank" rel="noopener" aria-label="ORCID" class="p-2 hover:text-[#c07a4b] transition-colors duration-200">
          <IconOrcid class="w-6 h-6" />
        </a>
        <a href="https://github.com/DavideDalPos" target="_blank" rel="noopener" aria-label="GitHub" class="p-2 hover:text-[#c07a4b] transition-colors duration-200">
          <IconGithub class="w-6 h-6" />
        </a>
        <a href="https://scholar.google.com/citations?user=wYj3d_oAAAAJ" target="_blank" rel="noopener" aria-label="Google Scholar" class="p-2 hover:text-[#c07a4b] transition-colors duration-200">
          <IconGoogleScholar class="w-6 h-6" />
        </a>
        <a href="https://www.researchgate.net/profile/Davide-Dal-Pos-2?ev=hdr_xprf" target="_blank" rel="noopener" aria-label="ResearchGate" class="p-2 hover:text-[#c07a4b] transition-colors duration-200">
          <IconResearchGate class="w-6 h-6" />
        </a>
      </div>

      <p class="text-xs text-[#eae7dd]/60">
        Content licensed under CC BY 4.0
      </p>
    </div>
  </div>
</footer>

</template>

<script setup>
import IconEmail from '../Icon/IconEmail.vue'
import IconGithub from '../Icon/IconGithub.vue'
import IconGoogleScholar from '../Icon/IconGoogleScholar.vue'
import IconOrcid from '../Icon/IconOrcid.vue'
import IconResearchGate from '../Icon/IconResearchGate.vue'

const currentYear = new Date().getFullYear()
</script>
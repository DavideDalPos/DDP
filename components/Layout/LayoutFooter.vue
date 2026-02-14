<template>
<footer class="bg-[#3f5a59] text-[#e9e6d9] text-sm py-8 border-t-[3px] border-[#5a8a88]">
  <div class="container mx-auto flex flex-col items-center gap-4">
    <div class="text-center space-y-3">
      <p class="opacity-90">
        © {{ currentYear }} Davide Dal Pos, Ph.D. · University of Central Florida
      </p>

      <div class="flex justify-center gap-5 text-[#e9e6d9]/80">
        <a href="mailto:daveliga@gmail.com" aria-label="Email" class="hover:text-[#ffc857] transition-colors duration-200">
          <IconEmail class="w-6 h-6" />
        </a>
        <a href="https://orcid.org/0000-0002-9122-934X" target="_blank" rel="noopener" aria-label="ORCID" class="hover:text-[#ffc857] transition-colors duration-200">
          <IconOrcid class="w-6 h-6" />
        </a>
        <a href="https://github.com/DavideDalPos" target="_blank" rel="noopener" aria-label="GitHub" class="hover:text-[#ffc857] transition-colors duration-200">
          <IconGithub class="w-6 h-6" />
        </a>
        <a href="https://scholar.google.com/citations?user=wYj3d_oAAAAJ" target="_blank" rel="noopener" aria-label="Google Scholar" class="hover:text-[#ffc857] transition-colors duration-200">
          <IconGoogleScholar class="w-6 h-6" />
        </a>
        <a href="https://www.researchgate.net/profile/Davide-Dal-Pos-2?ev=hdr_xprf" target="_blank" rel="noopener" aria-label="ResearchGate" class="hover:text-[#ffc857] transition-colors duration-200">
          <IconResearchGate class="w-6 h-6" />
        </a>
      </div>

      <p class="text-xs text-[#e9e6d9]/60">
        Content licensed under CC BY 4.0
      </p>
    </div>
  </div>
</footer>

</template>

<script setup>
import { IconEmail } from '#components'
import IconGithub from '../Icon/IconGithub.vue'
import IconGoogleScholar from '../Icon/IconGoogleScholar.vue'
import IconOrcid from '../Icon/IconOrcid.vue'
import IconResearchGate from '../Icon/IconResearchGate.vue'

const currentYear = new Date().getFullYear()
</script>

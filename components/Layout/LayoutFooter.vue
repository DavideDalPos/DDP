<template>
  <footer class="bg-white text-gray-600 text-sm py-6 border-t">
    <div class="container mx-auto text-center space-y-3">
      <!-- Name and affiliation -->
      <p>© {{ currentYear }} Davide Dal Pos, Ph.D. · University of Central Florida</p>

      <!-- Icon links -->
      <div class="flex justify-center gap-4 text-gray-600">
        <a href="mailto:daveliga@gmail.com" title="Email" aria-label="Email">
          <IconEmail class="w-6 h-6 hover:text-black" />
        </a>
        <a href="https://orcid.org/0000-0002-9122-934X" target="_blank" rel="noopener" title="ORCID" aria-label="ORCID">
          <IconOrcid class="w-6 h-6 hover:text-black" />
        </a>
        <a href="https://github.com/DavideDalPos" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
          <IconGithub class="w-6 h-6 hover:text-black" />
        </a>
        <a href="https://scholar.google.com/citations?user=wYj3d_oAAAAJ" target="_blank" rel="noopener" title="Google Scholar" aria-label="Google Scholar">
          <IconGoogleScholar class="w-6 h-6 hover:text-black" />
        </a>
        <a href="https://www.researchgate.net/profile/Davide-Dal-Pos-2?ev=hdr_xprf" target="_blank" rel="noopener" title="ResearchGate" aria-label="Google Scholar">
          <IconResearchGate class="w-6 h-6 hover:text-black" />
        </a>
      </div>

      <!-- License -->
      <p class="text-xs text-gray-400">Content licensed under CC BY 4.0</p>
    </div>
  </footer>
</template>

<script setup>
import { IconEmail } from '#components';
import IconGoogleScholar from '../Icon/IconGoogleScholar.vue';
import IconOrcid from '../Icon/IconOrcid.vue';
import IconResearchGate from '../Icon/IconResearchGate.vue';

const currentYear = new Date().getFullYear()
</script>



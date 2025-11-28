<template>
  <footer class="bg-white text-gray-600 text-sm py-6 border-t">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
      
      <!-- Left: WID logo -->
      <div class="flex items-center">
        <a href="https://worldichneumonidae.com" target="_blank" rel="noopener" title="World Ichneumonidae Database">
          <img src="/images/LogoWID.png" alt="World Ichneumonidae Database" class="h-20 md:h-22 hover:opacity-80 transition-opacity" />
        </a>
      </div>

      <!-- Center: Text + Social icons -->
      <div class="text-center space-y-2">
        <p>© {{ currentYear }} Davide Dal Pos, Ph.D. · University of Central Florida</p>
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
          <a href="https://www.researchgate.net/profile/Davide-Dal-Pos-2?ev=hdr_xprf" target="_blank" rel="noopener" title="ResearchGate" aria-label="ResearchGate">
            <IconResearchGate class="w-6 h-6 hover:text-black" />
          </a>
        </div>
        <p class="text-xs text-gray-400">Content licensed under CC BY 4.0</p>
      </div>

      <!-- Right: UCF logo -->
      <div class="flex items-center">
        <a href="https://www.ucf.edu" target="_blank" rel="noopener" title="University of Central Florida">
          <img src="/images/LogoUCF.png" alt="University of Central Florida" class="h-20 md:h-22 hover:opacity-80 transition-opacity" />
        </a>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { IconEmail } from '#components';
import IconGoogleScholar from '../Icon/IconGoogleScholar.vue';
import IconOrcid from '../Icon/IconOrcid.vue';
import IconResearchGate from '../Icon/IconResearchGate.vue';
import IconGithub from '../Icon/IconGithub.vue';

const currentYear = new Date().getFullYear()
</script>

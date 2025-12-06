<template>
  <footer class="bg-gray-900 text-white text-sm py-6 border-t">
    <div class="container mx-auto flex flex-col items-center gap-4">
      
      <!-- Center: Text + Social icons -->
      <div class="text-center space-y-2">
        <p>
          © {{ currentYear }} Davide Dal Pos, Ph.D. · University of Central
          Florida
        </p>
        <div class="flex justify-center gap-4 text-gray-400">
          <a href="mailto:daveliga@gmail.com" title="Email" aria-label="Email">
            <IconEmail class="w-6 h-6 hover:text-amber-400" />
          </a>
          <a href="https://orcid.org/0000-0002-9122-934X" target="_blank" rel="noopener" title="ORCID" aria-label="ORCID">
            <IconOrcid class="w-6 h-6 hover:text-amber-400" />
          </a>
          <a href="https://github.com/DavideDalPos" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub">
            <IconGithub class="w-6 h-6 hover:text-amber-400" />
          </a>
          <a href="https://scholar.google.com/citations?user=wYj3d_oAAAAJ" target="_blank" rel="noopener" title="Google Scholar" aria-label="Google Scholar">
            <IconGoogleScholar class="w-6 h-6 hover:text-amber-400" />
          </a>
          <a href="https://www.researchgate.net/profile/Davide-Dal-Pos-2?ev=hdr_xprf" target="_blank" rel="noopener" title="ResearchGate" aria-label="ResearchGate">
            <IconResearchGate class="w-6 h-6 hover:text-amber-400" />
          </a>
        </div>
        <p class="text-xs text-gray-400">Content licensed under CC BY 4.0</p>
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

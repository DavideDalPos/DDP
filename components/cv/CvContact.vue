<template>
  <section class="py-16 text-gray-200 min-h-screen">
    <div class="max-w-4xl mx-auto px-6">

      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-amber-400 mb-2">Contact Me</h1>
        <p class="text-gray-700 text-lg md:text-xl">
          I’d love to hear from you — feel free to reach out via email, visit my office, or connect online.
        </p>
      </div>

      <!-- Contact Info Cards -->
      <div class="grid md:grid-cols-2 gap-8">

        <!-- Contact Information Card -->
<div class="bg-gray-100 border border-gray-400 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300 text-gray-700">
  <h2 class="text-2xl font-semibold text-amber-400 mb-6">Contact Information</h2>
  <ul class="space-y-4">
    <li class="flex items-center gap-3">
      <span class="text-amber-400">
        <i class="fas fa-envelope"></i>
      </span>
      <a :href="'mailto:' + email" class="hover:underline">{{ email }}</a>
    </li>
    <li class="flex items-center gap-3">
      <span class="text-amber-400">
        <i class="fas fa-university"></i>
      </span>
      {{ institution }}, {{ college }}, {{ department }}
    </li>
    <li class="flex items-center gap-3">
      <span class="text-amber-400">
        <i class="fas fa-map-marker-alt"></i>
      </span>
      {{ address }}<br>{{ location }}
    </li>
  </ul>
  <div class="mt-6 flex justify-center">
  <img 
    src="/images/logoWid_wasp.png" 
    alt="University of Central Florida Campus" 
    class=" w-full max-w-[250px]"
  />
</div>

</div>


        <!-- Map / Quick Info Card -->
        <div class="bg-gray-100 border border-gray-400 rounded-xl p-8 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center">
          <h2 class="text-2xl font-semibold text-amber-400 mb-6">Office Location</h2>
          <p class="text-gray-700 mb-4 text-center">Visit the campus or see the location on the map below.</p>
          <!-- Simple embedded Google Map -->
          <iframe
            class="w-full h-64 rounded-lg border-0"
            :src="mapUrl"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>

      </div>

      <!-- Social Media / Connect Online Section -->
      <div class="mt-20">
        <div class="bg-gray-100 backdrop-blur-sm border border-gray-400 rounded-2xl p-10 shadow-xl">

          <h2 class="text-2xl font-semibold text-amber-400 text-center mb-10">
            Connect Online
          </h2>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-12 justify-items-center">

            <!-- ORCID -->
            <a :href="orcid" target="_blank" rel="noopener"
               class="group flex flex-col items-center transition-all duration-300">
              <div class="w-24 h-24 flex items-center justify-center
                          bg-gray-300/20 backdrop-blur-sm
                          rounded-2xl border border-gray-400
                          shadow-md
                          transition-all duration-300 ease-out
                          group-hover:-translate-y-1 group-hover:scale-105
                          group-hover:border-amber-400">
                <IconOrcid class="w-14 h-14 text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span class="mt-3 text-sm text-gray-600 group-hover:text-amber-400 transition">
                ORCID
              </span>
            </a>

            <!-- ResearchGate -->
            <a :href="researchgate" target="_blank" rel="noopener"
               class="group flex flex-col items-center transition-all duration-300">
              <div class="w-24 h-24 flex items-center justify-center
                          bg-gray-300/20 backdrop-blur-sm
                          rounded-2xl border border-gray-400
                          shadow-md
                          transition-all duration-300 ease-out
                          group-hover:-translate-y-1 group-hover:scale-105
                          group-hover:border-green-400">
                <IconResearchGate class="w-14 h-14 text-green-500 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span class="mt-3 text-sm text-gray-600 group-hover:text-green-400 transition">
                ResearchGate
              </span>
            </a>

            <!-- GitHub -->
            <a :href="github" target="_blank" rel="noopener"
               class="group flex flex-col items-center transition-all duration-300">
              <div class="w-24 h-24 flex items-center justify-center
                          bg-gray-300/20 backdrop-blur-sm
                          rounded-2xl border border-gray-400
                          shadow-md
                          transition-all duration-300 ease-out
                          group-hover:-translate-y-1 group-hover:scale-105
                          group-hover:border-gray-600">
                <IconGithub class="w-14 h-14 text-gray-700 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span class="mt-3 text-sm text-gray-600 group-hover:text-gray-800 transition">
                GitHub
              </span>
            </a>

            <!-- Google Scholar -->
            <a :href="googleScholar" target="_blank" rel="noopener"
               class="group flex flex-col items-center transition-all duration-300">
              <div class="w-24 h-24 flex items-center justify-center
                          bg-gray-300/20 backdrop-blur-sm
                          rounded-2xl border border-gray-400
                          shadow-md
                          transition-all duration-300 ease-out
                          group-hover:-translate-y-1 group-hover:scale-105
                          group-hover:border-blue-400">
                <IconGoogleScholar class="w-14 h-14 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span class="mt-3 text-sm text-gray-600 group-hover:text-blue-400 transition">
                Scholar
              </span>
            </a>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  email: { type: String, default: 'daveliga@gmail.com' },
  institution: { type: String, default: 'University of Central Florida' },
  college: { type: String, default: 'College of Sciences' },
  department: { type: String, default: 'Department of Biology' },
  address: { type: String, default: '4000 Central Florida Blvd, Orlando, FL 32816, USA' },
  location: { type: String, default: 'Orlando, FL, USA' },
  orcid: { type: String, default: 'https://orcid.org/0000-0002-9122-934X' },
  researchgate: { type: String, default: 'https://www.researchgate.net/profile/Davide-Dal-Pos-2' },
  linkedin: { type: String, default: 'https://www.linkedin.com/' },
  twitter: { type: String, default: 'https://twitter.com/' },
  github: { type: String, default: 'https://github.com/DavideDalPos' },
  googleScholar: { type: String, default: 'https://scholar.google.com/citations?user=wYj3d_oAAAAJ' }
})

const mapUrl = "https://maps.google.com/maps?q=4000+Central+Florida+Blvd,+Orlando,+FL+32816&output=embed"
</script>

<style scoped>
/* Fade-in animation */
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 1s ease forwards; }
</style>

<template>
  <div class="bg-gray-100 p-5 rounded-md">
    <!-- Heading with amber accent -->
    <h3 class="font-bold mb-4 text-amber-600 text-lg">Skills</h3>

    <!-- Skills list as smaller pills -->
    <ul class="flex flex-wrap gap-2">
      <li 
        v-for="(skill, index) in skills" 
        :key="index" 
        :class="getSkillColor(skill)"
        class="px-3 py-1 rounded-full text-xs font-medium hover:brightness-95 transition"
      >
        {{ skill }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const skills = [
  // Entomology & Research
  'Morphology',
  'Taxonomy',
  'Systematics',
  'Ichneumonidae specialization',
  'Parasitoid ecology',
  'Host-parasitoid interactions',
  'Skeleto-muscular anatomy',
  'Convergent evolution analysis',
  'Micro-CT scanning',
  'Specimen preparation & dissection',
  'Collection management',
  'Biodiversity informatics',

  // Technical & Web
  'Vue.js',
  'Web design',
  'Database management',
  'SCSS/Tailwind CSS',

  // General skills
  'Data visualization',
  'Scientific publishing',
  'Collaboration & mentoring'
]

// Function to assign colors based on skill category
const getSkillColor = (skill) => {
  const entomology = [
    'Morphology',
    'Taxonomy',
    'Systematics',
    'Ichneumonidae specialization',
    'Parasitoid ecology',
    'Host-parasitoid interactions',
    'Skeleto-muscular anatomy',
    'Convergent evolution analysis',
    'Micro-CT scanning',
    'Specimen preparation & dissection',
    'Collection management',
    'Biodiversity informatics'
  ]
  const technical = ['Vue.js', 'Web design', 'Database management', 'SCSS/Tailwind CSS']
  const general = ['Data visualization', 'Scientific publishing', 'Collaboration & mentoring']

if (entomology.includes(skill)) return 'bg-purple-200 text-gray-600'
  if (technical.includes(skill)) return 'bg-green-200 text-gray-600'
  if (general.includes(skill)) return 'bg-red-200 text-gray-600'
  
  return 'bg-gray-200 text-gray-800'
}
</script>
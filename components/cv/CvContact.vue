<template>
  <div class="bg-white border border-gray-300 p-6 rounded shadow-sm mb-10 mt-10 max-w-[70rem] mx-auto">
    <h2 class="text-3xl font-bold text-gray-800 mb-4">Contact Information</h2>

    <p class="text-gray-700 mb-2">
      <strong>Email: </strong>
      <a :href="'mailto:' + email" class="text-novenary hover:underline"> {{ email }}</a>
    </p>

    <p class="text-gray-700">
      {{ institution }}
    </p>

    <p class="text-gray-700">
       {{ college }}
    </p>

    <p class="text-gray-700 ">
       {{ department }}
    </p>

    <p class="text-gray-700">
       {{ address }}
    </p>

    <p class="text-gray-700">
       {{ location }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  email: {
    type: String,
    default: 'daveliga@gmail.com'
  },
  institution: {
    type: String,
    default: 'University of Central Florida'
  },
  college: {
    type: String,
    default: 'College of Sciences'
  },
  department: {
    type: String,
    default: 'Department of Biology'
  },
  address: {
    type: String,
    default: '4000 Central Florida Blvd, Orlando, FL 32816, USA'
  },
  location: {
    type: String,
    default: 'Orlando, FL, USA'
  }
})
</script>

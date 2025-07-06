<template>
  <section class="bg-white min-h-screen flex items-center justify-center">
    <div class="text-center px-1">
      <!-- Image -->
      <transition name="fade" appear>
        <div class="mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-md opacity-0 animate-fade-in animation-delay-100">
          <img
            src="/images/profile3.jpg"
            alt="Davide Dal Pos"
            class="w-full h-full object-cover"
          />
        </div>
      </transition>

      <!-- Name & Title -->
      <transition name="fade" appear>
        <div class="mt-6 space-y-2 opacity-0 animate-fade-in animation-delay-300">
          <h1 class="text-4xl font-bold text-gray-900">Davide Dal Pos</h1>
          <p class="text-lg text-gray-700">Postdoctoral Scholar, University of Central Florida</p>
          <p class="text-md text-gray-600 italic">Morphology and Evolution of Parasitoid Wasps</p>
        </div>
      </transition>

      <!-- Welcome Message -->
      <transition name="fade" appear>
        <p class="text-xl text-gray-600 mt-8 opacity-0 animate-fade-in animation-delay-700">
          Hi! Welcome to my academic website. <br />
          I'm a postdoctoral scholar at the University of Central Florida exploring the fascinating evolution, taxonomy, and morphology of parasitoid wasps.
        </p>
      </transition>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease forwards;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}
.animation-delay-300 {
  animation-delay: 0.3s;
}
.animation-delay-700 {
  animation-delay: 0.7s;
}
</style>

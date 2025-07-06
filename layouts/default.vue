<template>
  <div class="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
    <LayoutHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

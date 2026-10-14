<template>
  <div class="flex min-h-screen flex-col bg-paper text-ink">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >Skip to content</a
    >
    <LayoutHeader />
    <main
      id="main"
      class="flex-grow"
    >
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

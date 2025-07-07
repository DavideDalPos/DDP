<template>
  <section>
    <div class="container mx-auto px-4 my-10">
      <h1 class="text-4xl font-black">Publications</h1>
      <div class="my-4">
        <ul>
          <li
            v-for="publication in data"
            :key="publication._path"
            class="py-4"
          >
            <NuxtLink :to="publication.path">
              <h2
                class="text-sm font-bold"
                v-html="publication.title"
              ></h2>
              <VTag
                v-for="category in publication.categories"
                :key="category"
                class="bg-secondary text-white inline-block"
              >
                {{ category }}
              </VTag>
            </NuxtLink>
            <p>
              {{
                publication.authors
                  ?.map(
                    ({ first_name, last_name }) => `${first_name} ${last_name}`
                  )
                  .join('; ')
              }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()

const { data } = await useAsyncData(route.path, () => {
  return queryCollection('news').all()
})
</script>

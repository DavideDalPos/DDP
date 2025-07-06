<template>
  <section>
    <div class="container mx-auto px-8 my-10">
      <h1 class="text-4xl font-black">Publications</h1>
      <div class="my-4">
        <ContentList :query="query">
            <ul>
              <li
                v-for="publication in list"
                :key="publication._path"
                class="py-4"
              >
                <NuxtLink :to="publication._path">
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
                        ({ first_name, last_name }) =>
                          `${first_name} ${last_name}`
                      )
                      .join('; ')
                  }}
                </p>
              </li>
            </ul>
          <template #not-found>
            <p>No articles found.</p>
          </template>
        </ContentList>
      </div>
    </div>
  </section>
</template>

<script setup>
const route = useRoute()

const query = {
  path: `/publication/`
}
</script>
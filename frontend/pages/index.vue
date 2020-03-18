<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <articles>
        <banner/>
        </articles>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Banner from '~/components/home/Banner.vue'
import Articles from '~/components/home/Articles.vue'
import categoriesQuery from '~/apollo/queries/categories/categories'



export default {
  components: {
    Banner,
    Articles
  },
    data() {
    return {
      categories: [],
    }
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery,
      update (data) {
      this.$store.dispatch('fetchCategories', data.categories)
    },
    }
  }
}
</script>

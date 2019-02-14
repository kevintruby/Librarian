<template>
  <div class="container">
    <div>
      <div class="logo my-3 mx-auto">
        <nuxt-link to="/">
          <logo/>
        </nuxt-link>
      </div>
      <h1>{{ book.title }}</h1>
      <h2 v-for="author in book.authors" :key="author">{{ author }}</h2>
      <h3><strong>Published:</strong> {{ book.publishedDate }}</h3>
      <h3><strong>Pages:</strong> {{ book.pageCount }}</h3>
      <h3 class="underlined"><strong>Categories:</strong></h3>
      <ul>
        <li v-for="category in book.categories" :key="category">{{ category }}</li>
      </ul>
      <p class="jumbotron">{{ book.description }}</p>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  export default {
    name: 'ISBN Detail',
    components: { Logo },
    props: {},
    data() {
      return {
        book: {},
      }
    },
    async asyncData({ $axios, params }) {
      const book = await $axios.$get(`/api/books/isbn/${params.isbn}`);
      return { book }
    },
    mounted() {},
    computed: {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .underlined {
    text-decoration: underline;
  }
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>

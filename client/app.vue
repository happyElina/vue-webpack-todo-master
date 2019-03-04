<template>
  <div id="app">
    <div id="cover" />
    <Header />
    <!-- <Todo /> -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.vue'
// import Todo from './views/todo/todo.vue'

export default {
    components: {
        Header,
        Footer
    },
    mounted() {
      console.log(this.$store)
    },
    computed() {
      count () {
        return this.$store.state.count
      }
    }
}
</script>

<style lang="stylus" scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity 0.2
        z-index -1

</style>

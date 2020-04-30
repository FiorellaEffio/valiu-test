<template>
  <div id="app">
    <Tags/>
  </div>
</template>

<script>
import Tags from './components/Tags.vue'

export default {
  name: 'App',
  components: {
    Tags
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>

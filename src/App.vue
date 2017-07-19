<template>
  <div id="app">
    <vue-data></vue-data>
  </div>
</template>

<script>
import VueData from './components/VueData'

export default {
  name: 'app',
  components: {
    VueData
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div v-if="isDrizzleInitialized" id="app">
    <div>
      <Header/>
      <router-view/>
      <Footer/>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import {mapGetters} from "vuex";

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  computed: mapGetters('drizzle', ['isDrizzleInitialized'])
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #103B1D;
}
</style>

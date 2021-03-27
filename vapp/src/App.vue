<template>
  <div v-if="isDrizzleInitialized" id="app">
    <Header/>
    <router-view/>

    <!--    <img alt="Vue logo" src="./assets/logo.png"/>-->

    <!--    <div class="section">-->
    <!--      <h2>Show the Accounts</h2>-->
    <!--      <drizzle-account units="Ether" :precision="2"/>-->
    <!--    </div>-->

    <!--    <div class="section">-->
    <!--      <h2>Tutorial Token</h2>-->
    <!--      <TutorialToken/>-->
    <!--    </div>-->

    <!--    <div class="section">-->
    <!--      <h2>Simple Storage</h2>-->
    <!--      <SimpleStorage/>-->
    <!--    </div>-->

    <!--    <div class="section">-->
    <!--      <h2>Complex Storage</h2>-->
    <!--      <ComplexStorage/>-->
    <!--    </div>-->

    <Footer/>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import SimpleStorage from "@/components/SimpleStorage";

import {mapGetters} from 'vuex';

export default {
  name: 'app',
  components: {
    SimpleStorage,
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

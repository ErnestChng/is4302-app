<template>
  <div v-if="isDrizzleInitialized" id="allocateCredits">
    <h1>Allocate Credits</h1>
    <form @submit.prevent="allocateCredit">
      <label class="required">Generator ID:</label>
      <input required v-model="genId" name="genId" type="text">
      <br>
      <label class="required">Credits to allocate:</label>
      <input required v-model="genCredits" name="genCredits" type="text">
      <br>
      <input type="submit">
    </form>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'AllocateCredits',
  data() {
    return {
      genId: '',
      genCredits: ''
    };
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"])
  },
  methods: {
    async allocateCredit() {
      if (this.isDrizzleInitialized) {
        window.console.log('genId: ', this.genId);
        window.console.log('genCredits: ', this.genCredits);

        // await this.drizzleInstance.contracts['CarbonCredit'].methods.allocateCredit(this.genId, this.genCredits).call();
        // const contractmethod = await this.drizzleInstance.contracts['CarbonCredit'].methods['allocateCredit'];
        // contractmethod.cacheSend(this.genId, this.genCredits, {gas: 1000000});

        const genCredits = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorCredits(this.genId).call();
        window.console.log('current gen credits: ', genCredits);
      } else {
        alert("Drizzle doesn't seem to be initialised / ready");
      }
    }
  }
};

</script>

<style scoped>
#allocateCredits {
  margin: 200px;
}
</style>
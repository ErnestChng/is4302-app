<template>
  <div v-if="isDrizzleInitialized" id="getCredits">
    <!--    <button v-on:click="test">Test</button>-->
    <!--    <hr>-->
    <h1>Get Generator Credits</h1>
    <form @submit.prevent="getGenCredits">
      <label class="required">ID:</label>
      <input required v-model="genId" name="genId" type="text">
      <input type="submit">
    </form>
    <div>
      Credits: {{ genCredits }}
    </div>
    <hr>
    <h1>Get Consumer Credits</h1>
    <form @submit.prevent="getConCredits">
      <label class="required">ID:</label>
      <input required v-model="conId" name="conId" type="text">
      <input type="submit">
    </form>
    <div>
      Credits: {{ conCredits }}
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'GetCredits',
  data() {
    return {
      genId: '',
      conId: '',
      genCredits: 0,
      conCredits: 0
    };
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"])
  },
  methods: {
    // async test() { // Testing purposes
    //   if (this.isDrizzleInitialized) {
    //     const contractOwner = await this.drizzleInstance.contracts.CarbonCredit.methods.getContractOwner().call();
    //     window.console.log('contractOwner: ', contractOwner);
    //
    //     const test = await this.drizzleInstance.contracts['CarbonCredit'].methods.contractOwner().call();
    //     window.console.log('test: ', test);
    //
    //     const genList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorList().call();
    //     window.console.log('genList: ', genList);
    //   } else {
    //     alert("Drizzle doesn't seem to be initialised / ready");
    //   }
    // },
    async getGenCredits() {
      if (this.isDrizzleInitialized) {
        const genList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorList().call();
        window.console.log('genId: ', this.genId.toString());
        window.console.log('genList: ', genList);

        if (genList.includes(this.genId.toString())) {
          const genCredits = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorCredits(this.genId).call();
          window.console.log('genCredits: ', genCredits);
          this.genCredits = genCredits;
        } else {
          // alert('ID is not in genList!');
          const display = "ID is not in genList!";

          const subOptions = {
            theme: "bubble",
            // position: "top-center",
            duration: 1000,
            type: "error",
          };

          this.$toasted.show(display, subOptions);
        }
      } else {
        alert("Drizzle doesn't seem to be initialised / ready");
      }
    },
    async getConCredits() {
      if (this.isDrizzleInitialized) {
        const conCredits = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerCredits(this.conId).call();
        window.console.log('conCredits: ', conCredits);
        this.conCredits = conCredits;
      } else {
        alert("Drizzle doesn't seem to be initialised / ready");
      }
    }
  }
};
</script>

<style scoped>
#getCredits {
  margin: 200px;
}
</style>

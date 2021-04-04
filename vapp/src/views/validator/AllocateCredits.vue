<template>
  <div v-if="isDrizzleInitialized" id="wrapper">
    <div id="title">
      <h2>Allocate Credits</h2>
      <BackButton/>
    </div>
    <hr style="margin: 0">
    <div id="content">
      <form @submit.prevent="allocateCredit">
        <label for="genId" class="required">Generator ID:</label>
        <input id="genId" required v-model="genId" name="genId" type="text">
        <br>
        <label for="credits" class="required">Credits to allocate:</label>
        <input id="credits" required v-model="genCredits" name="genCredits" type="text">
        <br>
        <br>
        <input type="submit">
      </form>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import {mapGetters} from "vuex";
import BackButton from "@/components/BackButton";

export default {
  name: 'AllocateCredits',
  components: {BackButton},
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

        const genList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorList().call();
        if (genList.includes(this.genId.toString())) {
          const allocateCredit = await this.drizzleInstance.contracts['CarbonCredit'].methods['allocateCredit'];
          allocateCredit.cacheSend(this.genId, this.genCredits, {gas: 1000000});
          const display = `ID ${this.genId} has been allocated ${this.genCredits} credits.`;
          const options = {
            title: 'Successful',
            autoHideDelay: 3000,
            variant: 'success'
          };
          this.$bvToast.toast(display, options);
        } else {
          const display = `ID ${this.genId} has not been created. Please specify an ID that exists.`;
          const options = {
            title: 'Unsuccessful',
            autoHideDelay: 3000,
            variant: 'danger'
          };
          this.$bvToast.toast(display, options);
        }
      } else {
        alert("Drizzle doesn't seem to be initialised / ready");
      }
    }
  }
};
</script>

<style scoped>
#wrapper {
  height: calc(100vh - 100px - 80px);
}

#title {
  display: flex;
  align-items: center;
  height: 10%;
}

#title h2 {
  margin-bottom: 0;
  margin-left: 40px;
  margin-right: auto;
}

#content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
}

form {
  padding: 20px;
}

span {
  padding: 20px;
}

label {
  margin-right: 10px;
}

input {
  margin-right: 10px;
}
</style>
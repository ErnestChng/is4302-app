<template>
  <div v-if="isDrizzleInitialized" id="wrapper">
    <div id="title">
      <h2>Get Credits</h2>
      <BackButton/>
    </div>
    <hr style="margin: 0">
    <div id="content">
      <div id="generator">
        <h4>Get Generator Credits</h4>
        <form @submit.prevent="getGenCredits">
          <label for="genId" class="required">ID:</label>
          <input id="genId" required v-model="genId" name="genId" type="text">
          <input type="submit">
        </form>
        <span>Credits: {{ genCredits }}</span>
      </div>
      <hr style="width: 90%">
      <div id="consumer">
        <h4>Get Consumer Credits</h4>
        <form @submit.prevent="getConCredits">
          <label for="conId" class="required">ID:</label>
          <input id="conId" required v-model="conId" name="conId" type="text">
          <input type="submit">
        </form>
        <span>Credits: {{ conCredits }}</span>
      </div>

    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import {mapGetters} from "vuex";
import BackButton from "@/components/BackButton";

export default {
  name: 'GetCredits',
  components: {BackButton},
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
  height: 80%;
}

#generator {
  height: 50%;
}

#consumer {
  height: 50%;
}

h4 {
  padding: 20px;
  margin: 0;
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

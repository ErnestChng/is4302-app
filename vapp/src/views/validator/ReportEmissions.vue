<template>
  <div v-if="isDrizzleInitialized" id="wrapper">
    <div id="title">
      <h2>Report Emissions</h2>
      <BackButton/>
    </div>
    <hr style="margin: 0">
    <div id="content">
      <form @submit.prevent="reportEmissions">
        <label for="conId" class="required">Consumer ID:</label>
        <input id="conId" required v-model="conId" name="conId" type="text">
        <br>
        <label for="conEmissions" class="required">Emissions to report:</label>
        <input id="conEmissions" required v-model="conEmissions" name="conEmissions" type="text">
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
  name: 'ReportEmissions',
  components: {BackButton},
  data() {
    return {
      conId: '',
      conEmissions: ''
    };
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"])
  },
  methods: {
    async reportEmissions() {
      if (this.isDrizzleInitialized) {
        window.console.log('conIds: ', this.conId);
        window.console.log('conEmissions: ', this.conEmissions);

        const conList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerList().call();
        if (conList.includes(this.conId.toString())) {
          const reportEmissions = await this.drizzleInstance.contracts['CarbonCredit'].methods['reportEmissions'];
          await reportEmissions.cacheSend(this.conId, this.conEmissions, {gas: 1000000});
          const display = `Consumer ID ${this.conId} was reported with ${this.conEmissions} emissions.`;
          const options = {
            title: 'Successful',
            autoHideDelay: 3000,
            variant: 'success'
          };
          this.$bvToast.toast(display, options);
        } else {
          const display = `Consumer ID ${this.id} has not been created. Please specify an ID that exists.`;
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

div {
  padding: 20px;
}
</style>
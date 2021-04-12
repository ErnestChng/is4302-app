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
        <br><br>
        <label></label>
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
          this.$bvToast.toast(display, {
            title: 'Successful',
            autoHideDelay: 5000,
            variant: 'success'
          });
        } else {
          const display = `Consumer ID ${this.conId} has not been created. Please specify an ID that exists.`;
          this.$bvToast.toast(display, {
            title: 'Unsuccessful',
            autoHideDelay: 5000,
            variant: 'danger'
          });
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
  align-items: center;
  justify-content: center;
  height: 80%;
}

form {
  padding: 20px;
}

label {
  padding: 8px;
  display: inline-block;
  margin: 20px 0 10px;
  width: 15%;
  text-align: left;
  font-weight: bold;
}

input[type="text"], input[type="submit"], select {
  display: inline-block;
  padding: 8px;
  width: 30%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 15px;
}

input[type="submit"] {
  cursor: pointer;
}

input[type="submit"]:hover {
  background: #103B1D;
  border: solid 1px #2d3f55;
  color: white;
}

div {
  padding: 20px;
}
</style>
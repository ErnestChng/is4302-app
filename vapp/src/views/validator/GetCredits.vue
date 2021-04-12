<template>
  <div v-if="isDrizzleInitialized" id="wrapper">
    <div id="title">
      <h2>Get Credits</h2>
      <BackButton/>
    </div>
    <hr style="margin: 0">
    <div id="content">
      <div class="column " id="generator">
        <h4>Get Generator Credits</h4>
        <form @submit.prevent="getGenCredits">
          <label for="genId" class="required">ID:</label>
          <input id="genId" required v-model="genId" name="genId" type="text">
          <input type="submit">
        </form>
        <div class="card">
          <span>Generator has:</span>
          <div class="credits">{{ genCredits }}</div>
          <span>credits!</span>
        </div>
      </div>
      <hr style="width: 1px; height: 100%; background: #103B1D; border: none;"/>
      <div class="column " id="consumer">
        <h4>Get Consumer Credits</h4>
        <form @submit.prevent="getConCredits">
          <label for="conId" class="required">ID:</label>
          <input id="conId" required v-model="conId" name="conId" type="text">
          <input type="submit">
        </form>
        <div class="card">
          <span>Consumer has:</span>
          <div class="credits">{{ conCredits }}</div>
          <span>credits!</span>
        </div>
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

          const display = `Successfully retrieved. Generator ID ${this.genId} has ${this.genCredits} credits`;
          this.$bvToast.toast(display, {
            title: 'Successful',
            autoHideDelay: 5000,
            variant: 'success'
          });
        } else {
          const display = `ID ${this.genId} has not been created. Please specify an ID that exists.`;
          this.$bvToast.toast(display, {
            title: 'Unsuccessful',
            autoHideDelay: 5000,
            variant: 'danger'
          });
        }
      } else {
        alert("Drizzle doesn't seem to be initialised / ready");
      }
    },
    async getConCredits() {
      if (this.isDrizzleInitialized) {
        const conList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerList().call();
        window.console.log('conId: ', this.conId.toString());
        window.console.log('conList: ', conList);

        if (conList.includes(this.conId.toString())) {
          const conCredits = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerCredits(this.conId).call();
          window.console.log('conCredits: ', conCredits);
          this.conCredits = conCredits;

          const display = `Successfully retrieved. Consumer ID ${this.conId} has ${this.conCredits} credits.`;
          this.$bvToast.toast(display, {
            title: 'Successful',
            autoHideDelay: 5000,
            variant: 'success'
          });
        } else {
          const display = `ID ${this.conId} has not been created. Please specify an ID that exists.`;
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
  height: 80%;
  display: flex;
}

.card {
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 1px 1px 8px 0 grey;
  height: 250px;
  width: 340px;
  margin-bottom: 20px;
  margin-left: 130px;
  padding: 10px;
}

.column {
  flex: 50%;
  margin: 20px;
  padding: 20px;
  text-align: center;
}

.credits {
  font-size: 40px;
  padding-top: 20px;
}

h4 {
  padding: 20px;
  padding-top: 5px;
  margin: 0;
}

form {
  padding: 20px;
}

span {
  padding: 20px;
}

label {
  display: inline-block;
  width: 10%;
  text-align: left;
  font-weight: bold;
}

input {
  margin-right: 10px;
}

input[type="text"] {
  display: inline-block;
  padding: 8px;
  width: 30%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

input[type="submit"] {
  display: inline-block;
  padding: 8px;
  width: 15%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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

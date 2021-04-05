<template>
  <div v-if="isDrizzleInitialized" id="wrapper">
    <div id="title">
      <h2>Check Violators</h2>
      <BackButton/>
    </div>
    <hr style="margin: 0">
    <div id="content">
      <form @submit.prevent="printViolators">
        <input type="submit" value="Retrieve violators">
      </form>

      <table class="table">
        <thead style="background: #103B1D; color: white;">
        <tr style='width:18%'>
          <td class="border"><strong>Consumers</strong></td>
          <td class="border"><strong>Credit Balance</strong></td>
          <td class="border"><strong>Actual Emissions</strong></td>
          <td class="border"><strong>Exceeded Amount</strong></td>
        </tr>
        </thead>

        <tbody>
        <tr v-for="item in itemsList" :key="item.user">
          <td class="border" style="width:18%">{{ item.user }}</td>
          <td class="border" style="width:18%">{{ item.balance }}</td>
          <td class="border" style="width:18%">{{ item.emissions }}</td>
          <td class="border" style="width:18%; color:red">{{ item.diff }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import {mapGetters} from "vuex";
import BackButton from "@/components/BackButton";

export default {
  name: 'checkViolators',
  components: {BackButton},
  computed: {
    ...mapGetters('drizzle', ['isDrizzleInitialized', 'drizzleInstance']),
  },
  data() {
    return {
      itemsList: [],
    };
  },
  methods: {
    async printViolators() {
      if (this.isDrizzleInitialized) {
        const violators = await this.drizzleInstance.contracts['CarbonCredit'].methods.getViolators().call();
        window.console.log('violators: ', violators);
        window.console.log(violators.length);
        for (let i = 0; i < violators.length; i++) {
          const id = violators[i];
          const consumer1 = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerName(id).call();
          window.console.log('violator name: ', consumer1);
          const balance1 = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerCredits(id).call();
          window.console.log('violator balance: ', balance1);
          const emissions1 = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerEmission(id).call();
          window.console.log('violator emissions: ', emissions1);
          const diff1 = await balance1 - emissions1;
          window.console.log('violator diff: ', diff1);
          let data = {
            user: consumer1,
            balance: balance1,
            emissions: emissions1,
            diff: diff1
          };
          this.itemsList.push(data);
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

.table {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.border {
  border: solid 1px lightgrey
}

input[type="submit"] {
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
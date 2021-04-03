<template>
  <div v-if="isDrizzleInitialized">
    <h1>Check Violators</h1>
    <hr>
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
        <td class="border" style="width:18%; color:red" >{{ item.diff }}</td>
      </tr>
      </tbody>
    </table>

  </div>
  <div v-else>Not initialized</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'checkViolators',
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
          const diff1 = await balance1-emissions1;
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
  /*display: inline-block;*/
  padding: 8px;
  width: 30%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

</style>
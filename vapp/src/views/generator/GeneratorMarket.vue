<template>
  <div v-if="isDrizzleInitialized" id="wrapper" ref="foo">
    <div id="title">
      <h2>Generator Market Place</h2>
      <BackButton/>
    </div>
    <hr style="margin: 0">
    <div id="content">
      <div id="market">
        <h4>Market</h4>
        <table class="table">
          <thead style="background: #103B1D; color: white;">
          <tr style='width:18%'>
            <td class="border"><strong>Quantity</strong></td>
            <td class="border"><strong>Offer</strong></td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in itemsList" :key="item.user">
            <td class="border" style="width:18%">{{ item.qty }}</td>
            <td class="border" style="width:18%">{{ item.price }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <hr style="width: 1px; height: 100%; background: #103B1D; margin: 30px;"/>
      <div id="order">
        <h4>Order</h4>
        <button v-on:click="listCredit" style="margin: 20px;">Test</button>
        <div class="card">
          <form @submit.prevent="listCredit">
            <label for="id" class="required">Generator ID:</label>
            <input id="id" required v-model="id" name="id" type="text">
            <br>
            <label for="price" class="required">Price:</label>
            <input id="price" required v-model="price" name="price" type="text">
            <br>
            <label for="qty" class="required">Quantity:</label>
            <input id="qty" required v-model="qty" name="qty" type="text">
            <br><br>
            <label></label>
            <input type="submit" value="List Credit">
          </form>
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
  name: 'GeneratorMarket',
  components: {BackButton},
  data() {
    return {
      id: '',
      price: '',
      qty: '',
      itemsList: []
    };
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"]),
    ...mapGetters('accounts', ['activeAccount', 'activeBalance'])
  },
  methods: {
    async setUp() {
      const prices = await this.drizzleInstance.contracts['MarketPlace'].methods.getPrices().call();
      window.console.log('prices', prices);

      for (let i = 0; i < prices.length; i++) {
        this.itemsList.push({
          price: prices[i],
          qty: 'qty'
        });
      }
    },
    async listCredit() {
      const marketaddress = await this.drizzleInstance.contracts['MarketPlace'].address;

      const approval = await this.drizzleInstance.contracts['CarbonCredit'].methods['approve'];
      await approval.cacheSend(marketaddress, this.qty);

      const listCredit = await this.drizzleInstance.contracts['MarketPlace'].methods['listCredit'];
      await listCredit.cacheSend(this.id, parseInt(this.price), this.qty, {gas: 1000000});

      const creditsForSale = await this.drizzleInstance.contracts['MarketPlace'].methods.creditsForSale(parseInt(this.price)).call();
      window.console.log('creditsForSale', creditsForSale);

      this.itemsList.push({
        price: parseInt(this.price),
        qty: 'qty'
      });
    },
  },
  mounted() {
    if (this.$refs.foo) {
      if (this.isDrizzleInitialized) {
        window.console.log('initialized');
        this.setUp();
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
  height: 90%;
}

#market {
  height: 100%;
  width: 60%;
}

#order {
  height: 100%;
  width: 40%;
}

h4 {
  margin-bottom: 30px;
}

.card {
  border-radius: 18px;
  box-shadow: 1px 1px 8px 0 grey;
  height: 80%;
  display: flex;
}

div {
  padding: 20px;
}

form {
  padding: 20px;
}

label {
  display: inline-block;
  margin: 20px 0 10px;
  width: 25%;
  text-align: left;
  font-weight: bold;
}

input[type="text"], input[type="submit"], select {
  display: inline-block;
  padding: 8px;
  width: 40%;
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
</style>
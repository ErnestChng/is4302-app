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

      const quantity = await this.drizzleInstance.contracts['MarketPlace'].methods.getQty().call();
      window.console.log('quantity', quantity);

      for (let i = 0; i < prices.length; i++) {
        this.itemsList.push({
          price: prices[i],
          qty: quantity[i]
        });
      }

      this.itemsList.sort((a, b) => b.price - a.price);
    },
    async listCredit() {
      // check if prices is already listed
      const prices = await this.drizzleInstance.contracts['MarketPlace'].methods.getPrices().call();
      window.console.log('prices', prices);
      const genList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorList().call();
      window.console.log('genList', genList);
      if (prices.includes(this.price.toString()) || !(genList.includes(this.id.toString()))) {
        const display = `Price ${this.price} has already been listed. Please list another price!`;
        const options = {
          title: 'Unsuccessful',
          autoHideDelay: 3000,
          variant: 'danger'
        };
        this.$bvToast.toast(display, options);
      } else {
        const marketAddress = await this.drizzleInstance.contracts['MarketPlace'].address;
        // approve credits to be listed
        const approval = await this.drizzleInstance.contracts['CarbonCredit'].methods['approve'];
        await approval.cacheSend(marketAddress, this.qty);

        // list credits
        const listCredit = await this.drizzleInstance.contracts['MarketPlace'].methods['listCredit'];
        await listCredit.cacheSend(this.id, this.price, this.qty, {gas: 1000000});

        this.itemsList.push({
          price: this.price,
          qty: this.qty
        });

        this.itemsList.sort((a, b) => b.price - a.price);

        const display = `Generator ${this.id} successfully listed ${this.qty} credit(s) for ${this.price}`;
        const options = {
          title: 'Successful',
          autoHideDelay: 3000,
          variant: 'success'
        };
        this.$bvToast.toast(display, options);
      }
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
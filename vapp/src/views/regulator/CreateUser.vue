<template>
  <div v-if="isDrizzleInitialized">
    <h1>Create User</h1>
    <hr>

    <form class="form" @submit.prevent="onSubmit">
      <label class="required drop">User Type:</label>
      <select id="dropdown" v-model="userType" name="'userType">
        <option value="consumer">Consumer</option>
        <option value="generator">Generator</option>
      </select><br>

      <label class="required">ID:</label>
      <input required v-model="id" name='id' type="text"/><br>
      <label class="required">Name:</label>
      <input required v-model='name' name='name' type="text"/><br><br>

      <label></label>
      <input style='font-weight: bold;' type="submit" value="Send">
    </form>
    <drizzle-contract
        contractName="CarbonCredit"
        method="carbondata"
        label="new Value"
    />
    <drizzle-contract contractName="CarbonCredit" method="getGeneratorlist" label="Generator List"/>

  </div>
  <div v-else>Not initialized</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'getCredits',
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['isDrizzleInitialized', 'drizzleInstance']),

    userAccount() {
      return this.activeAccount;
    },
    getEthBalance() {
      return this.drizzleInstance.web3.utils.fromWei(this.activeBalance, 'ether');
    },
    getGeneratorlist() {
      return this.getContractData({
        contract: 'CarbonCredit',
        method: 'getGeneratorlist'
      });
    },
  },
  data() {
    return {
      userType: '',
      id: '',
      name: ''
    };
  },
  methods: {
    onSubmit() {
      if (this.isDrizzleInitialized) {
        window.console.log('creating generator')
        window.console.log(this.id)
        window.console.log(this.name)
        window.console.log(this.activeAccount)
        const contractmethod = this.drizzleInstance.contracts['CarbonCredit'].methods['changechange'];
        //contractmethod.cacheSend(this.id, this.name, this.activeAccount);
        contractmethod.cacheSend(this.id, this.activeAccount, {gas:1000000});
      } else {
        alert("Drizzle doesn't seem to be initialised / ready");
      }
    }
  },
};

</script>

<style scoped>
label {
  padding: 8px;
  display: inline-block;
  margin: 20px 0 10px;
  width: 15%;
  align-content: left;
  text-align: left;
  font-weight: bold;
}

input[type="text"], input[type="submit"], select {
  display: inline-block;
  padding: 8px;
  width: 30%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 15px;
}

select {
  height: 30px;
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
  padding: 30px;
}

</style>
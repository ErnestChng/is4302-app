<template>
  <div v-if="isDrizzleInitialized" id="getCredits">
    <div>Active Account: {{ userAccount }}</div>
    <div>Active Ether Balance: {{ getEthBalance }}</div>
    <drizzle-account units="Ether" :precision="2"/>
    <drizzle-contract
        contractName="SimpleStorage"
        method="storedData"
        label="Value"
    />
    <drizzle-contract-form
        contractName="SimpleStorage"
        method="set"
        :placeholders="['Value']"
    />
    <ComplexStorage/>
    <br>
    <!--        <drizzle-contract-->
    <!--            contract-name="CarbonCredit"-->
    <!--            method="contractOwner"-->
    <!--            label="Contract owner"-->
    <!--        />-->
  </div>
  <div v-else>
    Not initialized
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ComplexStorage from "@/components/ComplexStorage";

export default {
  name: 'getCredits',
  components: {ComplexStorage},
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['isDrizzleInitialized', 'drizzleInstance']),

    userAccount() {
      return this.activeAccount;
    },
    getEthBalance() {
      return this.drizzleInstance.web3.utils.fromWei(this.activeBalance, 'ether');
    }
  }
};
</script>

<style scoped>
#getCredits {
  margin: 200px;
}
</style>
<template>
  <div v-if="isDrizzleInitialized">
    <h1>Create User</h1>
    <hr>
    <form class="form" @submit.prevent="onSubmit">
      <label for="dropdown" class="required drop">User Type:</label>
      <select id="dropdown" v-model="userType" name="'userType">
        <option value="consumer">Consumer</option>
        <option value="generator">Generator</option>
      </select>
      <br>
      <label for="id" class="required">ID:</label>
      <input id="id" required v-model="id" name='id' type="text"/>
      <br>
      <label for="name" class="required">Name:</label>
      <input id="name" required v-model='name' name='name' type="text"/>
      <br>
      <br>
      <label></label>
      <input style='font-weight: bold;' type="submit" value="Send">
    </form>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'createUser',
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['isDrizzleInitialized', 'drizzleInstance']),
    ...mapGetters("contracts", ["getContractData"]),
  },
  data() {
    return {
      userType: '',
      id: '',
      name: '',
    };
  },
  methods: {
    async onSubmit() {
      if (this.isDrizzleInitialized) {
        window.console.log('creating user...');
        window.console.log('ID: ', this.id);
        window.console.log('Name: ', this.name);
        window.console.log('User type: ', this.userType);
        window.console.log('Active account: ', this.activeAccount);

        if (this.userType === 'generator') {
          window.console.log('creating generator...');
          const genList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorList().call();
          if (!(genList.includes(this.id.toString()))) {
            const createGenerator = await this.drizzleInstance.contracts['CarbonCredit'].methods['createGenerator'];
            await createGenerator.cacheSend(this.id, this.name, this.activeAccount, {gas: 1000000});

            const display = `Generator ID ${this.id} has been created and was allocated 0 credits.`;
            const options = {
              title: 'Successful',
              autoHideDelay: 3000,
              variant: 'success'
            };
            this.$bvToast.toast(display, options);
          } else {
            const display = `Generator ID ${this.id} has already been created. Please specify a unique ID.`;
            const options = {
              title: 'Unsuccessful',
              autoHideDelay: 3000,
              variant: 'danger'
            };
            this.$bvToast.toast(display, options);
          }
        } else {
          window.console.log('creating consumer...');
          const conList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerList().call();
          if (!(conList.includes(this.id.toString()))) {
            const createConsumer = await this.drizzleInstance.contracts['CarbonCredit'].methods['createConsumer'];
            await createConsumer.cacheSend(this.id, this.name, this.activeAccount, {gas: 1000000});

            const display = `Consumer ID ${this.id} has been created and was allocated 100 credits.`;
            const options = {
              title: 'Successful',
              autoHideDelay: 3000,
              variant: 'success'
            };
            this.$bvToast.toast(display, options);
          } else {
            const display = `Consumer ID ${this.id} has already been created. Please specify a unique ID.`;
            const options = {
              title: 'Unsuccessful',
              autoHideDelay: 3000,
              variant: 'danger'
            };
            this.$bvToast.toast(display, options);
          }
        }
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
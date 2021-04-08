<template>
  <div v-if="isDrizzleInitialized">
    <!-- Sidenav -->
    <div class="row" ref="foo">
      <div class="profile left">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""
             width="130" height="130">
        <div class="name">{{ this.name }}</div>
        <div class="userType">Consumer</div>
      </div>

      <!-- Main -->
      <div class="main right">
        <h2>Personal Details</h2><br>

        <form class="form" @submit.prevent="getConsumerData">
          <label for="id" class="required drop">Consumer ID:</label>
          <select id="id" v-model="id" name="id" required>
            <option v-for="id in conList" v-bind:value="id" v-bind:key="id">
              {{ id }}
            </option>
          </select>
          <input type="submit" value="Retrieve Details">
        </form>

        <div class="card">
          <div class="card-body">
            <table>
              <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{{ this.name }}</td>
              </tr>
              <tr>
                <td>Token Balance</td>
                <td>:</td>
                <td>{{ this.balance }}</td>
              </tr>
              <tr>
                <td>Emissions</td>
                <td>:</td>
                <td>{{ this.emissions }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'ConsumerProfile',
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['isDrizzleInitialized', 'drizzleInstance']),
  },
  data() {
    return {
      id: 'NIL',
      name: 'NIL',
      balance: 'NIL',
      emissions: 'NIL',
      conList: []
    };
  },
  methods: {
    async setUp() {
      const accounts = this.$store.state.accounts;
      window.console.log('accounts', accounts);

      const conList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerList().call();
      window.console.log('conList', conList);
      this.conList = conList;
    },
    async getConsumerData() {
      const isConsumer = await this.drizzleInstance.contracts['CarbonCredit'].methods.isConsumer(this.id).call();
      window.console.log('isConsumer', isConsumer);

      if (isConsumer) {
        const name = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerName(this.id).call();
        const balance = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerCredits(this.id).call();
        const emissions = await this.drizzleInstance.contracts['CarbonCredit'].methods.getConsumerEmissions(this.id).call();

        window.console.log('name', name);
        window.console.log('balance', balance);
        window.console.log('emissions', emissions);

        this.name = name;
        this.balance = balance;
        this.emissions = emissions;

        const display = `Successfully retrieved Consumer ${this.id}'s details`;
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
/* Sidenav */
.profile {
  margin-bottom: 20px;
  margin-top: -12px;
  text-align: center;
}

.profile img {
  border-radius: 50%;
  box-shadow: 0 0 5px 1px grey;
}

.name {
  font-size: 20px;
  font-weight: bold;
  padding-top: 20px;
}

.userType {
  font-size: 16px;
  font-weight: bold;
  padding-top: 10px;
}

/* Main */
.main .card {
  background-color: #fff;
  border-radius: 18px;
  box-shadow: 1px 1px 8px 0 grey;
  height: auto;
  margin-bottom: 20px;
  padding: 20px 0 20px 50px;
}

.main .card table {
  border: none;
  font-size: 18px;
  height: 270px;
  width: 40%;
}

.row {
  display: flex;
  height: calc(100vh - 100px - 80px)
}

.left {
  background-color: #fff;
  color: #333;
  text-align: center;
  padding: 50px 30px 30px;
  flex: 30%;
  margin-top: 30px;
}

.right {
  padding: 80px 50px;
  flex: 65%;
  text-align: left;
  margin-right: 40px;
}

.form {
  margin: 40px 0;
}

.form label {
  margin-right: 10px;
}

.form select {
  width: 120px;
  margin-right: 20px;
}

</style>
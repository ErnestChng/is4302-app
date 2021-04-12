<template>
  <div v-if="isDrizzleInitialized" id="wrapper">
    <!-- Sidenav -->
    <div class="row" ref="foo">
      <div class="profile left">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt=""
             width="130" height="130">
        <div class="name">{{ this.name }}</div>
        <div class="userType">Generator</div>
      </div>

      <!-- Main -->
      <div class="main right">
        <div id="title">
          <h2>Personal Details</h2>
          <BackButton/>
        </div>

        <form class="form" @submit.prevent="getGeneratorData">
          <label for="id" class="required drop">Generator ID:</label>
          <select id="id" v-model="id" name="id" required>
            <option v-for="id in genList" v-bind:value="id" v-bind:key="id">
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
import BackButton from "@/components/BackButton";

export default {
  name: 'GeneratorProfile',
  components: {BackButton},
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['isDrizzleInitialized', 'drizzleInstance']),
  },
  data() {
    return {
      id: 'NIL',
      name: 'NIL',
      balance: 'NIL',
      genList: []
    };
  },
  methods: {
    async setUp() {
      const accounts = this.$store.state.accounts;
      window.console.log('accounts', accounts);

      const genList = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorList().call();
      window.console.log('genList', genList);
      this.genList = genList;
    },
    async getGeneratorData() {
      const isGenerator = await this.drizzleInstance.contracts['CarbonCredit'].methods.isGenerator(this.id).call();
      window.console.log('isGenerator', isGenerator);

      if (isGenerator) {
        const name = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorName(this.id).call();
        const balance = await this.drizzleInstance.contracts['CarbonCredit'].methods.getGeneratorCredits(this.id).call();

        window.console.log('name', name);
        window.console.log('balance', balance);

        this.name = name;
        this.balance = balance;

        const display = `Successfully retrieved Generator ${this.id}'s details`;
        this.$bvToast.toast(display, {
          title: 'Successful',
          autoHideDelay: 5000,
          variant: 'success'
        });
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
  padding: 40px;
  flex: 65%;
  text-align: left;
  margin-right: 40px;
}

#title {
  display: flex;
  align-items: center;
  height: 10%;
}

#title h2 {
  margin-bottom: 0;
  margin-right: auto;
}

.form {
  margin: 20px 0;
}

.form label {
  margin-right: 10px;
  font-weight: bold;
}

.form select {
  width: 120px;
  margin-right: 20px;
}

input[type="submit"] {
  padding: 5px;
  width: 15%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

input[type="submit"]:hover {
  background: #103B1D;
  border: solid 1px #2d3f55;
  color: white;
}

</style>
<template>
  <div v-if="isDrizzleInitialized">
    <!-- Sidenav -->
    <div class="row" ref="foo">
      <div class="profile left">
        <div>{{msg}}</div>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" width="130" height="130">
          <div class="name">{{ this.name }}</div>
          <div class="userType">Consumer</div>
      </div>

      <!-- Main -->
      <div class="main right">
        <h2>Personal Details</h2><br>
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
                <td>ID</td>
                <td>:</td>
                <td>{{ this.id }}</td>
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
  <div v-else>Not initialized</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'ConsumerProfile',
  computed: {
    ...mapGetters('accounts', ['activeAccount', 'activeBalance']),
    ...mapGetters('drizzle', ['isDrizzleInitialized', 'drizzleInstance']),
    ...mapGetters("contracts", ["getContractData"]),
  },
  data() {
    return {
      userType: '',
      id: '1',
      name: 'jojo',
      balance: 100,
      emissions: 130,
    };
  },
  methods: {
  },
  mounted() {
    if (this.$refs.foo) {
      if (this.isDrizzleInitialized) {
        window.console.log('initalized');
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
  box-shadow: 0px 0px 5px 1px grey;
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
}

.left {
  background-color: #fff;
  color: #333;
  text-align: center;
  padding: 30px;
  padding-top: 50px;
  flex: 30%;
  margin-top: 30px;
}

.right {
  padding: 30px;
  flex: 65%;
  text-align: left;
  margin-right: 40px;
}

</style>
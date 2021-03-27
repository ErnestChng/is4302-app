<template>
  <header>
    <nav id="main">
      <div id="main-left">
        <router-link id="header-title" to="/" exact>
          <span>Carbon Portal</span>
        </router-link>
      </div>
      <div id="main-right-if">
        <span>Ernest</span>
        <a @click.prevent="signOut">Sign Out</a>
      </div>
      <div id="main-right-else">
        <router-link to="login">Login</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import {mapGetters} from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({
              path: "/"
            }).catch(() => {
            });
          });
    }
  }
};


</script>

<style scoped>
header {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
}

#main {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #103B1D;
  color: #FFFFFF;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 100px;
}

#main-left {
  width: fit-content;
  margin-left: 10px;
  margin-right: auto;
}

#main-right-if {
  display: flex;
  list-style-type: none;
  margin-left: auto;
  margin-right: 10px;
}

#main-right-if a {
  padding: 0 20px;
}

#main-right-else {
  display: flex;
  list-style-type: none;
  margin-left: auto;
  margin-right: 10px;
}

#main-right-else a {
  color: white;
  padding: 0 20px;
}

#main-left span {
  font-size: 32px;
  margin-left: 16px;
  font-weight: bold;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #FFFFFF;
}

a {
  text-decoration: none;
  cursor: pointer;
}
</style>
<template>
  <div>
    <router-link to="/regulator/create-user"><button>Create User</button></router-link>
    <router-link to="/regulator/check-violators"><button>Check Violators</button></router-link>
  </div>
</template>

<script>
</script>

<style scoped>
div {
  margin: 70px;
}

button {
  display: inline-block;
  padding: 150px 100px;
  margin: 40px;
  font-size: 25px;
  color: #103B1D;
  font-weight: bold;
}

button a {
  text-decoration: none;
  color: #103B1D;
}

button:hover {
  background: #103B1D;
  text-decoration: none;
  color: white;
  cursor: pointer;
}
</style>
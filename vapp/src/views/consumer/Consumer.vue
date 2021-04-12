<template>
  <div id="wrapper" :style="{backgroundImage: `url(${image})`}">
    <div id="title">
      <h1 style="margin: 0">Welcome Consumer...</h1>
    </div>
    <hr style="margin: 0">
    <div id="buttons">
      <router-link to="/consumer/consumer-profile">
        <button>Consumer Profile</button>
      </router-link>
      <router-link to="/consumer/consumer-market">
        <button>Consumer Market</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import con from "@/assets/consumer.jpeg";

export default {
  data() {
    return {
      image: con
    };
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
  padding-left: 40px;
  height: 10%;
}

#buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
}

button {
  padding: 150px 100px;
  margin: 40px;
  font-size: 25px;
  color: #103B1D;
  font-weight: bold;
  border-radius: 15px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

div {
  padding: 20px;
}
</style>
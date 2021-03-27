<template>
  <header>
    <nav id="main">
      <div id="main-left">
        <router-link id="header-title" to="/" exact>
          <span>Carbon Portal</span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>

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
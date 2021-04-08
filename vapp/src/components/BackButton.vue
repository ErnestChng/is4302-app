<template>
  <button onclick="history.go(-1)"><span>Go Back</span></button>
</template>

<script></script>

<style scoped>
button {
  margin-left: auto;
  margin-right: 40px;

  text-align: center;
  padding: 15px;
  transition: all 0.5s;
  cursor: pointer;
}

button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

button span:after {
  content: '\00ab';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

button:hover span {
  padding-right: 25px;
}

button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
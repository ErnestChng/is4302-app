<template>
  <div class="wrapper">
    <div id="description">
      <div class="divider"></div>
      <h1>CARBON TRADING</h1>
      <div class="divider"></div>
    </div>
<!--    <video id="video" autoplay muted loop>-->
<!--      <source :src="image" type="video/mp4">-->
<!--    </video>-->
  </div>
</template>

<script>

</script>

<style scoped>
.wrapper {
  height: calc(100vh - 100px - 80px - 40px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

#description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  color: #103B1D
}

.divider {
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 20px;
  height: 5px;
  width: 80%;
}
</style>
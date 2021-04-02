<template>
  <div class="wrapper">
    <div id="description">
      <div class="divider"></div>
      <h1>CARBON TRADING</h1>
      <div class="divider"></div>
    </div>
    <video id="video" autoplay muted loop>
      <source :src="image" type="video/mp4">
    </video>
  </div>
</template>

<script>
import homevid from "@/assets/homevid.mp4";

export default {
  data() {
    return {
      image: homevid
    };
  }
};
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 100px - 80px);
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
  width: 20%;
  color: #FFFFFF;
}

.divider {
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 40px;
  height: 8px;
  width: 100%;
}
</style>
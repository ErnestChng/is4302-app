<template>
  <div v-if="isDrizzleInitialized" id="wrapper">
    <div id="title">
      <h2>Consumer Market Place</h2>
      <BackButton/>
    </div>
    <hr style="margin: 0">
    <div id="content">
      content
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import {mapGetters} from "vuex";
import BackButton from "@/components/BackButton";

export default {
  name: 'ConsumerMarket',
  components: {BackButton},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("drizzle", ["isDrizzleInitialized", "drizzleInstance"])
  },
  methods: {}
};
</script>

<style scoped>
#wrapper {
  height: calc(100vh - 100px - 80px);
}

#title {
  display: flex;
  align-items: center;
  height: 10%;
}

#title h2 {
  margin-bottom: 0;
  margin-left: 40px;
  margin-right: auto;
}

#content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
}

div {
  padding: 20px;
}
</style>
<template>
  <div id="app">
    <landing-screen class="screen" :style="{ height: minHeight + 'px' }" />
  </div>
</template>

<script>
import LandingScreen from "@/components/LandingScreen/LandingScreen.vue";

export default {
  name: "app",
  components: {
    LandingScreen
  },
  computed: {
    minHeight: () => {
      return window.innerHeight;
    }
  }
};
</script>

<style lang="scss">
body {
  overflow: hidden;
  margin: 0;
}
</style>

<template>
  <div id="app">
    <the-nav :minScreenHeight="minScreenHeight" />
    <landing-screen
      id="home"
      class="screen"
      :style="{ height: minScreenHeight + 'px' }"
    />
    <div id="test" class="screen" :style="{ height: '2000px' }"></div>
    <div id="test2" class="screen" :style="{ height: '3000px' }"></div>
    <div id="test3" class="screen" :style="{ height: '4000px' }"></div>
  </div>
</template>

<script>
import LandingScreen from "@/components/LandingScreen/LandingScreen.vue";
import TheNav from "@/components/TheNav.vue";

export default {
  name: "app",
  components: {
    LandingScreen,
    TheNav
  },
  computed: {
    minScreenHeight: () => window.innerHeight
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>

<template>
  <div id="app">
    <the-nav :minScreenHeight="minScreenHeight" />
    <landing-screen
      id="home"
      class="screen"
      :style="{ height: minScreenHeight + 'px' }"
    />
    <projects-screen id="projects" class="screen" />
    <div id="test2" class="screen" :style="{ height: '3000px' }"></div>
    <div id="test3" class="screen" :style="{ height: '4000px' }"></div>
  </div>
</template>

<script>
import LandingScreen from "@/components/LandingScreen/LandingScreen.vue";
import ProjectsScreen from "@/components/ProjectsScreen/ProjectsScreen.vue";
import TheNav from "@/components/TheNav.vue";

export default {
  name: "app",
  components: {
    LandingScreen,
    ProjectsScreen,
    TheNav
  },
  computed: {
    minScreenHeight: () => window.innerHeight
  }
};
</script>

<style lang="scss">
body {
  background-color: $primary-color;
  animation: backgroundshift 15s 3s infinite;

  .screen:not(#home) {
    padding: 2rem;
  }

  h1,
  h2 {
    font-family: "sintony", sans-serif;
  }

  h3 {
    font-family: "opensans", sans-serif;
  }
}
</style>

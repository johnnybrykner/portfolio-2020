<template>
  <div id="app">
    <the-nav :minScreenHeight="minScreenHeight" />
    <landing-screen
      id="home"
      class="screen"
      :style="{ minHeight: minScreenHeight + 'px' }"
    />
    <projects-screen
      id="projects"
      class="screen"
      :minScreenHeight="minScreenHeight"
    />
    <div id="test2" class="screen" :style="{ height: '3000px' }"></div>
    <contact-screen id="contact" class="screen" />
  </div>
</template>

<script>
import LandingScreen from "@/components/LandingScreen/LandingScreen.vue";
import ProjectsScreen from "@/components/ProjectsScreen/ProjectsScreen.vue";
import ContactScreen from "@/components/ContactScreen/ContactScreen.vue";
import TheNav from "@/components/TheNav.vue";

export default {
  name: "app",
  components: {
    LandingScreen,
    ProjectsScreen,
    ContactScreen,
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

    &#projects {
      padding-right: 0;
    }
  }

  a {
    color: inherit;
  }

  h1,
  h2,
  h3,
  figcaption {
    font-family: "sintony", sans-serif;
  }

  h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  p {
    font-family: "opensans", sans-serif;
  }
}
</style>

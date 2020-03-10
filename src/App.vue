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
    <about-screen
      id="about"
      class="screen"
      :minScreenHeight="minScreenHeight"
      :style="{ minHeight: minScreenHeight + 'px' }"
    />
    <contact-screen
      id="contact"
      class="screen"
      :style="{ minHeight: minScreenHeight + 'px' }"
    />
  </div>
</template>

<script>
import LandingScreen from "@/components/LandingScreen/LandingScreen.vue";
import ProjectsScreen from "@/components/ProjectsScreen/ProjectsScreen.vue";
import AboutScreen from "@/components/AboutScreen/AboutScreen.vue";
import ContactScreen from "@/components/ContactScreen/ContactScreen.vue";
import TheNav from "@/components/TheNav.vue";

export default {
  name: "app",
  components: {
    LandingScreen,
    ProjectsScreen,
    AboutScreen,
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

  .screen {
    overflow: hidden;

    &:not(#home) {
      padding: 2rem;
    }

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

<template>
  <div id="app">
    <the-nav :minScreenHeight="minScreenHeight" />
    <landing-screen
      id="home"
      class="screen"
      :style="{ height: minScreenHeight + 'px' }"
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
    />
    <contact-screen id="contact" class="screen" />
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
  color: $black-ish;
  background-color: $primary-color;
  animation: backgroundshift 15s 3s infinite;

  .screen {
    overflow: hidden;
    padding: 2rem;

    &#home {
      padding-top: 0;
      padding-bottom: 0;
    }

    @include when-screen-is(md) {
      padding: 4rem;
    }
    @include when-screen-is(lg) {
      padding: 8rem;

      &#about {
        padding: 8rem 0 0 0;
      }

      &#contact {
        padding-bottom: 0;
      }
    }
    @include when-screen-is(xl) {
      padding: 12rem;

      &#about {
        padding: 12rem 0 0 0;
      }
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
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    padding-right: 1.5rem;
    @include when-screen-is(md) {
      font-size: 2.25rem;
      text-align: center;
      padding-right: 0;
    }
    @include when-screen-is(lg) {
      font-size: 3.5rem;
      margin-bottom: 4rem;
    }
    @include when-screen-is(xl) {
      font-size: 6rem;
      margin-bottom: 9rem;
    }
  }

  h2 {
    font-size: 1.25rem;
    @include when-screen-is(md) {
      font-size: 1.5rem;
    }
    @include when-screen-is(lg) {
      font-size: 2rem;
    }
    @include when-screen-is(xl) {
      font-size: 3rem;
    }
  }

  p {
    font-family: "opensans", sans-serif;
  }

  p,
  figcaption,
  h3 {
    @include when-screen-is(md) {
      font-size: 1.1rem;
    }
    @include when-screen-is(lg) {
      font-size: 1.25rem;
    }
    @include when-screen-is(lg) {
      font-size: 1.7rem;
    }
  }

  em {
    font-weight: bold;
  }
}
</style>

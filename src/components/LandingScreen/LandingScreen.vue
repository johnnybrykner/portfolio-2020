<template>
  <section class="landing">
    <h1>My name is Vít Brykner and I</h1>
    <the-heart withBackground class="landing__heart" />
    <transition name="fade">
      <h1>{{ loves[currentLove] }}</h1>
    </transition>
  </section>
</template>

<script>
import TheHeart from "@/components/LandingScreen/TheHeart.vue";

export default {
  name: "landing-screen",
  components: {
    TheHeart
  },
  data: () => {
    return {
      loves: [
        "Web Development",
        "Learning New Technologies",
        "Clean and Efficient Code",
        "Elma Harmsen"
      ],
      currentLove: 0
    };
  },
  mounted: function() {
    setInterval(() => {
      if (this.currentLove < this.loves.length - 1) {
        this.currentLove++;
      } else {
        this.currentLove = 0;
      }
    }, 3000);
  }
};
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  background-color: $primary-color;
  animation: backgroundshift 15s 3s infinite;

  h1 {
    font-family: "sintony", sans-serif;
    font-size: 1.5rem;

    &.fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
    &.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }

  .landing__heart {
    align-self: center;
    margin-bottom: -100px;
  }
}
</style>

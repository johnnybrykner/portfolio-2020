<template>
  <section class="landing">
    <h1>My name is Vít Brykner</h1>
    <span class="landing__loves">and I</span>
    <the-heart withBackground class="landing__heart" />
    <span class="landing__loves">{{ loves[currentLove] }}</span>
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

  .landing__loves {
    text-align: center;
    font-family: "sintony", sans-serif;
  }
}
</style>

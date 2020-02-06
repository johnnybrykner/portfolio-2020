<template>
  <section class="landing">
    <the-heart withBackground class="landing__heart" />
  </section>
</template>

<script>
import TheHeart from "@/components/LandingScreen/TheHeart.vue";

export default {
  name: "landing-screen",
  components: {
    TheHeart
  }
};
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  background-color: $primary-color;
  animation: backgroundshift 15s 3s infinite;

  .landing__heart {
    margin: 0 auto;
  }
}
</style>

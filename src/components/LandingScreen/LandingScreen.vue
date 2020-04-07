<template>
  <section class="landing">
    <h1>My name is Vít Brykner</h1>
    <span>and I</span>
    <the-heart withBackground class="landing__heart" />
    <div class="landing__loves">
      <span class="landing__love">{{ loves[currentLove] }}</span>
    </div>
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
        "Web development",
        "Learning new technologies",
        "Clean and efficient code",
        "Electronic music",
        "A good collective"
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

  span {
    text-align: center;
    font-family: "sintony", sans-serif;

    @include when-screen-is(md) {
      font-size: 1.5rem;
    }
    @include when-screen-is(lg) {
      font-size: 2rem;
    }
  }

  .landing__loves {
    perspective: 200px;
    perspective-origin: 125%;
    transform-style: preserve-3d;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;

    @include when-screen-is(md) {
      width: 400px;
    }

    @include when-screen-is(lg) {
      width: 550px;
    }

    .landing__love {
      display: block;
      width: 100%;
      background-color: $heart-color;
      padding: 1rem;
      animation: illusion 3s infinite none;
    }
  }
}
</style>

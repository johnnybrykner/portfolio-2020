<template>
  <section class="landing">
    <h1>My name is Vít Brykner</h1>
    <span>and I</span>
    <the-heart withBackground />
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
        "A good collective",
        "Electronic music",
        "Good headphones",
        "Driving a car",
        "Oldschool RuneScape",
        "Speaking foreign languages"
      ],
      currentLove: 0
    };
  },
  mounted: function() {
    setTimeout(() => {
      this.currentLove++;
      setInterval(() => {
        if (this.currentLove < this.loves.length - 1) {
          this.currentLove++;
        } else {
          this.currentLove = 0;
        }
      }, 3000);
    }, 750);
  }
};
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;

  h1 {
    text-align: center;
    padding: 0;
    margin: 0;
  }

  span {
    text-align: center;
    font-family: "sintony", sans-serif;

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

  .landing__loves {
    width: 275px;
    display: flex;
    justify-content: center;
    align-items: center;

    @include when-screen-is(md) {
      width: 400px;
    }
    @include when-screen-is(lg) {
      width: 550px;
    }
    @include when-screen-is(xl) {
      width: 850px;
    }

    .landing__love {
      display: block;
      width: 100%;
      background-color: $heart-color;
      padding: 1rem;
      box-shadow: 0.5rem 0.5rem $black-ish;
      animation: illusion 3s infinite none;

      @include when-screen-is(xl) {
        padding: 1.5rem;
      }
    }
  }
}
</style>

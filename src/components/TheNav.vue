<template>
  <div class="the-nav" :style="{ pointerEvents: collapsed ? 'none' : 'auto' }">
    <transition name="fade" mode="out-in">
      <span class="the-nav__toggle" v-if="collapsed" @click="toggleNav"
        >Open up!</span
      >
      <div class="the-nav__drawer" v-else @click="toggleNav">
        <ol class="drawer__links">
          <li
            v-for="link in navLinks"
            :key="link.title"
            :class="{
              completed: link.position < currentSubPage,
              'in-progress': link.position === currentSubPage
            }"
            @click="goToScreen(link.position)"
          >
            <div class="top">{{ link.title }}</div>
            <div
              class="bottom"
              :style="{
                background: `linear-gradient(90deg, white ${currentSubPageProgress}%, black ${currentSubPageProgress}%)`
              }"
            ></div>
          </li>
        </ol>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "the-nav",
  data: function() {
    return {
      collapsed: true,
      currentSubPage: 0,
      navLinks: [],
      howDeepIntoCurrentSubPage: this.minScreenHeight
    };
  },
  props: {
    minScreenHeight: {
      required: true,
      type: Number
    }
  },
  computed: {
    individualScreenHeights() {
      return this.navLinks.map(link => link.height);
    },
    currentSubPageProgress() {
      return (
        (this.howDeepIntoCurrentSubPage /
          this.navLinks[this.currentSubPage].height) *
        100
      );
    },
    currentSubPageViewportPercentage() {
      return (
        (this.minScreenHeight /
          this.individualScreenHeights[this.currentSubPage]) *
        100
      );
    }
  },
  mounted: function() {
    let scrollingTimeout = null;

    this.getScreensDetails();

    window.addEventListener("scroll", () => {
      window.clearTimeout(scrollingTimeout);
      scrollingTimeout = setTimeout(() => {
        this.$store.commit(
          "setCurrentSreenScrollProgress",
          this.currentSubPageProgress
        );
      }, 100);
      let position = window.scrollY + this.minScreenHeight;
      let i = 0;
      do {
        position = position - this.individualScreenHeights[i];
        i++;
        this.currentSubPage = i - 1;
        this.howDeepIntoCurrentSubPage =
          position + this.individualScreenHeights[this.currentSubPage];
      } while (position > 0);
    });

    window.addEventListener("resize", () => this.getScreensDetails());
  },
  methods: {
    toggleNav() {
      this.collapsed = !this.collapsed;
    },
    goToScreen(screenNumber) {
      let pixelAmount = 0;
      for (let i = 0; i < screenNumber; i++) {
        pixelAmount += this.individualScreenHeights[i];
      }
      console.log(pixelAmount);
      window.scrollTo({
        top: pixelAmount,
        behavior: "smooth"
      });
    },
    getScreensDetails() {
      this.navLinks = [];
      document.querySelectorAll(".screen").forEach((screen, position) => {
        this.navLinks.push({
          position,
          title: screen.id[0].toUpperCase() + screen.id.slice(1),
          height: screen.clientHeight
        });
      });
    }
  },
  watch: {
    currentSubPage: function(newValue) {
      this.$store.commit("setCurrentScreen", newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.the-nav {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;

  .the-nav__toggle {
    font-family: "sintony", sans-serif;
    align-self: flex-end;
    padding: 1rem;
    pointer-events: auto;
    cursor: pointer;
  }
  .the-nav__drawer {
    height: 100%;
    text-align: center;
    background-color: $black-ish;

    .drawer__links {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;

      li {
        flex-basis: 25%;
        font-family: "sintony", sans-serif;
        color: black;
        transition: all 0.5s;
        perspective: 200px;
        perspective-origin: 125%;
        transform-style: preserve-3d;
        transform: translateY(-55px);

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          transition: all 0.5s;

          &.bottom {
            height: 50px;
            display: none;
          }
        }

        &.in-progress {
          color: white;
          transform: translateX(42px) translateY(-55px);

          .top {
            background-color: blue;
            transform: rotateX(4deg);
          }

          .bottom {
            background-color: red;
            width: 100%;
            transform: rotateX(-4deg) translateZ(6px);
            display: block;
          }
        }

        &.completed {
          color: white;
          background-color: blue;
          transform: none;

          .top {
            transform: none;
          }

          .bottom {
            display: none;
          }
        }
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>

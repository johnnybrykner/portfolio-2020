<template>
  <div class="the-nav">
    <transition name="fade" mode="out-in">
      <span class="the-nav__toggle" v-if="collapsed" @click="toggleNav"
        >Open up!</span
      >
      <div
        class="the-nav__drawer"
        :style="{ height: minScreenHeight + 'px' }"
        v-else
        @click="toggleNav"
      >
        <ol class="drawer__links">
          <li
            v-for="link in navLinks"
            :key="link.title"
            :class="{
              completed: link.position < currentSubPage,
              'in-progress': link.position === currentSubPage
            }"
          >
            <div class="top">{{ link.title }}</div>
            <div
              class="bottom"
              :style="{
                background: `linear-gradient(90deg, yellow ${currentSubPageProgress}%, red ${currentSubPageProgress}%)`
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
      howDeepIntoCurrentSubPage: 0
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
    document.querySelectorAll(".screen").forEach((screen, position) => {
      this.navLinks.push({
        position,
        title: screen.id[0].toUpperCase() + screen.id.slice(1),
        height: screen.scrollHeight
      });
    });

    window.addEventListener("scroll", () => {
      let position = window.scrollY;
      let i = 0;
      do {
        position = position - this.individualScreenHeights[i];
        i++;
        this.currentSubPage = i - 1;
        this.howDeepIntoCurrentSubPage =
          position + this.individualScreenHeights[this.currentSubPage];
      } while (position >= 0);
    });
  },
  methods: {
    toggleNav() {
      this.collapsed = !this.collapsed;
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
  width: 100%;
  display: flex;
  flex-flow: column nowrap;

  .the-nav__toggle {
    font-family: "sintony", sans-serif;
    align-self: flex-end;
    padding: 1rem;
  }
  .the-nav__drawer {
    text-align: center;
    background-color: #222;

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
    transition: opacity 0.2s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
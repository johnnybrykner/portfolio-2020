<template>
  <div class="the-nav" :style="{ pointerEvents: collapsed ? 'none' : 'auto' }">
    <transition name="fade" mode="out-in">
      <span class="the-nav__toggle" v-if="collapsed" @click="toggleNav">
        <span class="toggle__line"></span>
        <span class="toggle__line"></span>
        <span class="toggle__line"></span>
      </span>
      <div class="the-nav__drawer" v-else @click="toggleNav">
        <span class="drawer__close"></span>
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
                background: `linear-gradient(90deg, #e8ebe4 ${currentSubPageProgress}%, #222 ${currentSubPageProgress}%)`
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
        this.getScreensDetails();
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
      } while (position > 0 && i < this.navLinks.length);
    });

    document.addEventListener("click", event => {
      if (
        !event.target.closest(".the-nav__drawer") &&
        !event.target.closest(".the-nav__toggle")
      )
        this.collapsed = true;
    });
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
    align-self: flex-end;
    padding: 2rem 1.5rem 1rem 1rem;
    pointer-events: auto;
    cursor: pointer;

    &:hover {
      .toggle__line {
        height: 3px;
      }
    }

    .toggle__line {
      display: block;
      width: 2rem;
      height: 2px;
      background-color: $highlight-color;
      transition: height 0.2s ease;

      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }

    @include when-screen-is(md) {
      padding-right: 2.5rem;
    }
  }
  .the-nav__drawer {
    height: 100%;
    text-align: center;
    background-color: $primary-color;

    .drawer__close {
      position: absolute;
      z-index: 2;
      width: 2rem;
      height: 2rem;
      top: 0;
      right: 0;
      cursor: pointer;
      padding: 1rem;

      &:hover {
        &::before,
        &::after {
          width: 3px;
        }
      }

      &::before,
      &::after {
        position: absolute;
        content: "";
        height: 2rem;
        width: 2px;
        background-color: $black-ish;
        transition: width 0.2s ease;
      }

      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }

    .drawer__links {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;

      li {
        flex-basis: 25%;
        font-family: "sintony", sans-serif;
        color: $white-ish;
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
          font-size: 3rem;

          &.bottom {
            height: 50px;
            display: none;
          }
        }

        &.in-progress {
          color: $black-ish;
          transform: translateX(16px) translateY(-55px);
          margin-top: 3rem;

          @include when-screen-is(md) {
            transform: translateX(42px) translateY(-55px);
          }
          @include when-screen-is(lg) {
            transform: translateX(42px) translateY(-75px);
          }

          .top {
            background-color: $highlight-color;
            transform: rotateX(4deg);
          }

          .bottom {
            width: 100%;
            transform: rotateX(-4deg) translateZ(4px) translateX(1px);
            display: block;

            @include when-screen-is(md) {
              transform: rotateX(-4deg) translateZ(6px);
            }
            @include when-screen-is(lg) {
              transform: rotateX(-5deg) translateZ(8px);
            }
          }

          & + li {
            margin-top: 3rem;
          }
        }

        &.completed {
          color: $black-ish;
          background-color: $heart-color;
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

  @include when-screen-is(lg) {
    width: 550px;

    .the-nav__drawer {
      .top {
        cursor: pointer;

        &:hover {
          color: $black-ish;
        }
      }
    }
  }
}
</style>

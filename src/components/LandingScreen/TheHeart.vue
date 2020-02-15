<template>
  <div>
    <div class="heart heart--main"></div>
    <div class="heart heart--background" v-if="withBackground"></div>
  </div>
</template>

<script>
export default {
  name: "the-heart",
  props: {
    withBackground: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.heart {
  position: relative;
  width: 100px;
  height: 90px;

  &.heart--main {
    animation: heartbeat 3s infinite;
  }

  &.heart--background {
    position: relative;
    bottom: 50%;
    animation: backgroundheart 3s infinite;

    &::before,
    &::after {
      animation: backgroundshift 15s infinite;
    }
  }

  &::before,
  &::after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: $heart-color;
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }

  &::after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }
}
</style>

<template>
  <div class="heart__container">
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
$width: 150px;
$height: $width * 0.9;

.heart__container {
  height: $height;

  @include when-screen-is(md) {
    height: unset;
  }

  .heart {
    width: $width;
    height: $height;
    position: relative;

    &.heart--main {
      animation: heartbeat 3s infinite;
    }

    &.heart--background {
      bottom: $height;
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
      left: $width / 2;
      top: 0;
      width: $width / 2;
      height: $height * 0.9;
      background: $heart-color;
      border-radius: $width / 2 $width / 2 0 0;
      transform: rotate(-45deg);
      transform-origin: 0 100%;
    }

    &::after {
      left: 0;
      transform: rotate(45deg);
      transform-origin: 100% 100%;
    }
  }
}
</style>

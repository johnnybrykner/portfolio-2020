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
@include when-screen-is(sm) {
  @include heart-style(125px);
}
@include when-screen-is(md) {
  @include heart-style(150px);
}
@include when-screen-is(lg) {
  @include heart-style(200px);
}
@include when-screen-is(xl) {
  @include heart-style(300px);
}
</style>

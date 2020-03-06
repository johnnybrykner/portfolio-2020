<template>
  <section>
    <h1>Who am I exactly?</h1>
    <div class="about">
      <img
        :src="require('@/assets/czech-republic.svg')"
        class="about__circle about__circle--left"
      />
      <span
        class="about__line"
        :style="{
          height: lineLength - 148 + 'px',
          transform: `rotate(-${lineRotation}deg)`
        }"
      ></span>
      <img
        :src="require('@/assets/denmark.svg')"
        class="about__circle about__circle--right"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "about-screen",
  data: function() {
    return {
      lineLength: 0,
      lineRotation: 0,
      milestones: [
        {
          title: "Born",
          date: "23.4.1998",
          place: "Jičín, Czech Republic",
          land: "czech-republic"
        },
        {
          title: "Kicked off my bachelor degree in web development",
          date: "28.8.2017",
          place: "Aarhus, Denmark",
          land: "denmark"
        },
        {
          title: "Started my internship at Salling Group",
          date: "7.1.2019",
          place: "Aarhus, Denmark",
          land: "denmark"
        },
        {
          title: "The first day of my internship at your company?",
          date: "August 2020",
          place: "???, ???",
          land: "europe"
        }
      ]
    };
  },
  methods: {
    calculateLineProperties() {
      const layoutDimensions = document
        .querySelector(".about")
        .getBoundingClientRect();
      this.lineLength = Math.sqrt(
        Math.pow(layoutDimensions.width, 2) +
          Math.pow(layoutDimensions.height, 2)
      );
      this.lineRotation =
        (Math.atan(
          (layoutDimensions.width - 33) / (layoutDimensions.height - 33)
        ) *
          180) /
        Math.PI;
    }
  },
  mounted: function() {
    this.calculateLineProperties();
    window.addEventListener("resize", this.calculateLineProperties);
  }
};
</script>

<style lang="scss" scoped>
.about {
  display: grid;
  grid-template-rows: 50px 400px 50px;
  grid-template-columns: 50px 1fr 50px;

  .about__circle {
    animation: slimey 1s forwards ease-out;
    width: 50px;
    height: 50px;

    &.about__circle--left {
      justify-self: baseline;
      grid-column: 1;
      grid-row: 1;
    }

    &.about__circle--right {
      justify-self: end;
      grid-column: 3;
      grid-row: 3;
    }
  }

  .about__line {
    display: block;
    justify-self: center;
    align-self: center;
    width: 0.5rem;
    background-color: $black-ish;
    grid-row: 2;
    grid-column: 2;
  }
}
</style>

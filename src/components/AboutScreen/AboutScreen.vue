<template>
  <section>
    <h1>Who am I exactly?</h1>
    <div class="about">
      <article
        class="about__milestone"
        v-for="(milestone, index) in milestones"
        :key="milestone.date"
      >
        <figure class="milestone__properties">
          <figcaption class="milestone__info">
            <h3>{{ milestone.title }}</h3>
            <span>{{ milestone.date }}</span>
            <span>{{ milestone.place }}</span>
          </figcaption>
          <img
            :src="require('@/assets/' + milestone.land)"
            class="milestone__circle"
          />
        </figure>
        <span
          class="about__line"
          :style="{
            height: lineLength - 160 + 'px',
            transform:
              index % 2 === 0
                ? `rotate(-${lineRotation}deg)`
                : `rotate(${lineRotation}deg)`
          }"
        ></span>
      </article>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

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
          land: "czech-republic.svg"
        },
        {
          title: "Kicked off my bachelor degree in web development",
          date: "28.8.2017",
          place: "Aarhus, Denmark",
          land: "denmark.svg"
        },
        {
          title: "Started my internship at Salling Group",
          date: "7.1.2019",
          place: "Aarhus, Denmark",
          land: "denmark.svg"
        },
        {
          title: "The first day of my internship at your company?",
          date: "August 2020",
          place: "???, ???",
          land: "europe.svg"
        }
      ]
    };
  },
  props: {
    minScreenHeight: {
      required: true,
      type: Number
    }
  },
  computed: {
    ...mapGetters(["getCurrentScreenScrollProgress"])
  },
  methods: {
    calculateLineProperties() {
      const layoutDimensions = document
        .querySelector(".about__milestone")
        .getBoundingClientRect();
      this.lineLength = Math.sqrt(
        Math.pow(layoutDimensions.width, 2) +
          Math.pow(layoutDimensions.height, 2)
      );
      this.lineRotation =
        (Math.atan((layoutDimensions.width - 40) / layoutDimensions.height) *
          180) /
        Math.PI;
    }
  },
  mounted: function() {
    this.calculateLineProperties();
    window.addEventListener("resize", this.calculateLineProperties);
  },
  watch: {
    getCurrentScreenScrollProgress: function() {
      document.querySelectorAll(".milestone__properties").forEach(milestone => {
        if (milestone.getBoundingClientRect().y <= this.minScreenHeight)
          milestone.classList.add("slimey");
        else milestone.classList.remove("slimey");
      });
      document.querySelectorAll(".about__line").forEach(line => {
        const placement = line.getBoundingClientRect();
        if (placement.y <= this.minScreenHeight - placement.height)
          line.classList.remove("hidden");
        else line.classList.add("hidden");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-flow: column nowrap;

  .about__milestone {
    display: grid;
    grid-template-rows: 64px 400px;
    grid-template-columns: 64px 1fr 64px;

    &:last-of-type {
      grid-template-rows: 64px;
    }

    .milestone__properties {
      display: flex;
      grid-row: 1;
      grid-column: 1/4;
      opacity: 0;

      &.slimey {
        opacity: 1;
        animation: slimey 1s forwards ease-out;
      }

      .milestone__info {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: baseline;
        padding: 0 1rem;

        span {
          font-size: 0.75rem;
        }

        h3,
        span:not(:last-child) {
          padding-bottom: 0.1rem;
        }
      }

      .milestone__circle {
        width: 64px;
        height: 64px;
      }
    }

    .about__line {
      display: block;
      justify-self: center;
      align-self: center;
      width: 0.5rem;
      background-color: $grey;
      grid-row: 2;
      grid-column: 2;
      border-radius: 10px;
      transition: height 1s ease;

      &.hidden {
        height: 0px !important;
      }
    }

    &:nth-of-type(odd) {
      .milestone__properties {
        justify-self: baseline;
        flex-direction: row-reverse;
      }
    }

    &:nth-of-type(even) {
      .milestone__properties {
        justify-self: end;
      }
    }

    &:last-of-type {
      .about__line {
        display: none;
      }
    }
  }
}
</style>

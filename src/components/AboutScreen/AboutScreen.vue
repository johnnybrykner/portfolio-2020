<template>
  <section class="about__container">
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
    ...mapGetters(["getCurrentScreenScrollProgress", "getCurrentScreen"])
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
    },
    mapInView(entries) {
      entries[0].isIntersecting && entries[0].intersectionRatio >= 0.1
        ? document.querySelector(".about").classList.add("in-view")
        : document.querySelector(".about").classList.remove("in-view");
    }
  },
  mounted: function() {
    const scrollObserver = new IntersectionObserver(this.mapInView, {
      threshold: [0, 0.05, 0.1, 0.15]
    });
    scrollObserver.observe(document.querySelector(".about"));
    this.calculateLineProperties();
    window.addEventListener("resize", this.calculateLineProperties);
  },
  watch: {
    getCurrentScreenScrollProgress: function(newValue) {
      document.querySelectorAll(".about__milestone").forEach(milestone => {
        if (
          milestone.getBoundingClientRect().y <= this.minScreenHeight &&
          milestone.getBoundingClientRect().y >= -this.minScreenHeight / 2 + 64
        )
          milestone.classList.add("slimey");
        else milestone.classList.remove("slimey");
      });
      document.querySelectorAll(".about__line").forEach(line => {
        const placement = line.getBoundingClientRect();
        if (
          placement.y <= this.minScreenHeight - placement.height &&
          placement.y >= placement.height / -2
        )
          line.classList.remove("hidden");
        else line.classList.add("hidden");
      });

      if (this.getCurrentScreen === 2) {
        const headerPercentage =
          56 / document.querySelector(".about__container").clientHeight;
        const currentMilestone = Math.floor(
          ((newValue / 100 - headerPercentage) *
            document.querySelector(".about").clientHeight) /
            (this.minScreenHeight * 1.5)
        );
        const mapContainer = document.querySelector(".about");

        if (currentMilestone === 0) {
          mapContainer.classList.add("cz");
          mapContainer.classList.remove("dk");
        } else if (currentMilestone === 1 || currentMilestone === 2) {
          mapContainer.classList.add("dk");
          mapContainer.classList.remove("cz");
        } else {
          mapContainer.classList.remove("cz", "dk");
        }
      }
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

    &.slimey {
      .milestone__properties {
        opacity: 1;
        animation: slimey 1s forwards ease-out;
      }
    }

    .milestone__properties {
      display: flex;
      grid-row: 1;
      grid-column: 1/4;
      opacity: 0;

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
      background-color: $heart-color;
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

  @include when-screen-is(lg) {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 6000px;
    background-position: bottom 36.5% right 63%;
    background-image: url(../../assets/map-europe.svg);
    transition-timing-function: ease;
    transition-property: background-position, background-size;
    transition-duration: 1s;

    .about__milestone {
      height: 150vh;
      display: block;

      &.slimey {
        .milestone__properties {
          opacity: 0;
          animation: none;

          .milestone__info {
            padding: 0;
          }

          .milestone__circle {
            padding-bottom: 1rem;
          }
        }
      }

      .milestone__properties {
        flex-direction: column-reverse !important;
        align-items: baseline;
      }

      .about__line {
        display: none;
      }
    }

    &.in-view {
      .slimey .milestone__properties {
        opacity: 1;
        animation: slimey 1s forwards ease-out;
        position: fixed;
        left: 50%;
        top: 50%;
        background-color: $highlight-color;
        box-shadow: 0.5rem 0.5rem $black-ish;
        padding: 1rem;
      }

      &.cz {
        background-position: bottom 33% right 49%;
      }
      &.dk {
        background-position: bottom 50% right 57.5%;
      }
    }
  }
}
</style>

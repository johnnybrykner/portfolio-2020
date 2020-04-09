<template>
  <section class="contact">
    <h1>
      I would love you to become part of my journey!
    </h1>
    <p class="contact__text">
      For my upcoming internship starting in August 2020 I am seeking a company
      which could provide an awesome environment for further professional and
      personal growth! Are you looking for a new frontend reinforcement?
      <em>Let's have a talk!</em>
    </p>
    <div class="contact__media">
      <a
        v-for="medium in media"
        :key="medium.name"
        :href="medium.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <figure class="contact__medium">
          <img
            :src="require('@/assets/' + medium.name)"
            :alt="medium.name.split('.')[0]"
          />
          <figcaption>{{ medium.handle }}</figcaption>
        </figure>
      </a>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "contact-screen",
  data: function() {
    return {
      media: [
        {
          name: "linkedin.svg",
          handle: "Vít Brykner",
          link: "https://www.linkedin.com/in/v%C3%ADt-brykner-55869414b"
        },
        {
          name: "mail.svg",
          handle: "johnny.brykner@gmail.com",
          link: "mailto:johnny.brykner@gmail.com"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getCurrentScreen"])
  },
  watch: {
    getCurrentScreen(newValue) {
      newValue === 3
        ? document.querySelector(".contact__text").classList.add("highlighted")
        : document
            .querySelector(".contact__text")
            .classList.remove("highlighted");
    }
  }
};
</script>

<style lang="scss" scoped>
.contact {
  .contact__text {
    padding: 1.5rem;
    transition-timing-function: ease;
    transition-property: background-color, box-shadow;
    transition-duration: 1s;
    margin-bottom: 6rem;
    line-height: 1.3rem;

    &.highlighted {
      background-color: $heart-color;
      box-shadow: 0.5rem 0.5rem $black-ish;
    }
  }

  a {
    text-decoration: none;
  }

  .contact__media {
    display: flex;
    justify-content: space-evenly;

    .contact__medium {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      img {
        height: 64px;
        margin-bottom: 0.5rem;
      }

      figcaption {
        font-size: 0.75rem;
        color: $heart-color;
      }
    }
  }

  @include when-screen-is(md) {
    .contact__text {
      width: 50%;
      margin: 3rem auto;
    }

    .contact__media {
      width: 50%;
      padding: 1.5rem;
      margin: 0 auto;
    }
  }
}
</style>

<template>
  <section class="contact">
    <h1>My journey has only begun...</h1>
    <p class="contact__text">
      The upcoming internship starting in September 2020 is the next step on the
      infinite road of professional and personal growth. I cannot wait to see
      what the future has in store!
      <em>Is there anything on your mind? Feel free to reach out!</em>
    </p>
    <div class="contact__media">
      <a
        v-for="medium in media"
        :key="medium.name"
        :href="medium.link"
        target="_blank"
        rel="noopener noreferrer"
        :class="medium.className"
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
  data: function () {
    return {
      media: [
        {
          name: "linkedin.svg",
          handle: "My LinkedIn",
          link: "https://www.linkedin.com/in/v%C3%ADt-brykner-55869414b",
          className: "contact__linkedin",
        },
        {
          name: "mail.svg",
          handle: "My Mail",
          link: "mailto:johnny.brykner@gmail.com",
          className: "contact__mail",
        },
        {
          name: "resume.svg",
          handle: "My Resume",
          link:
            "https://drive.google.com/file/d/1j4dBkEmr6MhOoKb5b_GGmBMZLkmC7Iga/view",
          className: "contact__resume",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getCurrentScreen"]),
  },
  watch: {
    getCurrentScreen(newValue) {
      newValue === 3
        ? document.querySelector(".contact__text").classList.add("highlighted")
        : document
            .querySelector(".contact__text")
            .classList.remove("highlighted");
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  .contact__text {
    padding: 1.5rem;
    transition-timing-function: ease;
    transition-property: background-color, box-shadow;
    transition-duration: 1s;
    line-height: 1.5rem;
    margin-bottom: 1.5rem;

    &.highlighted {
      background-color: $highlight-color;
      box-shadow: 0.5rem 0.5rem $black-ish;
    }
  }

  a {
    text-decoration: none;

    & > * {
      pointer-events: none;
    }
  }

  .contact__media {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;

    .contact__medium {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      padding: 1rem;

      img {
        height: 64px;
        margin-bottom: 0.5rem;

        @include when-screen-is(md) {
          margin-bottom: 1rem;
        }
        @include when-screen-is(lg) {
          height: 96px;
        }
        @include when-screen-is(xl) {
          height: 112px;
          margin-bottom: 1.5rem;
        }
      }

      figcaption {
        font-size: 0.75rem;
        color: $white-ish;
        text-align: center;

        @include when-screen-is(md) {
          font-size: 1.1rem;
        }
        @include when-screen-is(lg) {
          font-size: 1.25rem;
        }
        @include when-screen-is(xl) {
          font-size: 1.7rem;
        }
      }
    }
  }

  @include when-screen-is(md) {
    .contact__text {
      width: 70%;
      margin: 3rem auto;
    }

    .contact__media {
      width: 70%;
      padding-top: 0.5rem;
      margin: 0 auto;
      flex-flow: row nowrap;
    }
  }
  @include when-screen-is(lg) {
    .contact__text {
      margin: 0 auto 3rem auto;
      padding: 2rem;
      line-height: 2rem;
    }
  }
  @include when-screen-is(xl) {
    .contact__text {
      padding: 3rem;
      line-height: 2.25rem;
    }
  }
}
</style>

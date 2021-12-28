<template>
  <section
    class="projects__container"
    :style="{ backgroundColor: getCurrentColor }"
  >
    <h1>Some of the projects I took part in:</h1>
    <article
      class="projects__project"
      v-for="project in projects"
      :key="project.title"
    >
      <div class="project__details">
        <div class="project__header">
          <a
            class="project__title"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>{{ project.title }}</h2>
            <img
              class="project__logo"
              :src="require('@/assets/' + project.logo)"
              :alt="project.title"
            />
          </a>
          <h3 class="project__subtitle">{{ project.subtitle }}</h3>
          <p class="project__description">{{ project.description }}</p>
        </div>
        <figure class="project__about">
          <figcaption>Technologies used:</figcaption>
          <div class="project__technologies">
            <div
              class="project__technology"
              v-for="technology in project.technologies"
              :key="technology.image"
            >
              <img
                :src="require('@/assets/' + technology.image)"
                :alt="technology.image.split('.')[0]"
              />
              <p>{{ technology.text }}</p>
            </div>
          </div>
        </figure>
      </div>
      <div class="timeline__fragment">
        <span class="timeline__start">{{ project.start }}</span>
        <span class="timeline__divider"></span>
        <span class="timeline__end">{{ project.end }}</span>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "projects-screen",
  data: function () {
    return {
      currentProject: null,
      projects: [
        {
          title: "bilka.dk",
          url: "https://bilka.dk",
          subtitle:
            "New e-commere platform for one of the oldest players in the Danish retail game.",
          description:
            "Bilka is the biggest Danish hypermarket chain offering wide range of product categories from bikes through furniture all the way to electronics. With its original e-commerce platform being built more than ten years ago, the time was ripe for a new representative platform to drive the business in today's online world. As part of the frontend team, since the very beginning of the project in March 2019 to its official launch in May 2020, I took part in developing the user interface of the platform.",
          logo: "bilka.svg",
          color: "#00aeef",
          technologies: [
            {
              image: "vue.png",
              text:
                "The stack revolves around Vue.js, a JavaScript framework encapsulating all HTML, CSS, and JavaScript",
            },
            {
              image: "nuxt.png",
              text:
                "Nuxt's main role in the project is that of a static site generator, allowing for an accessible and very performant frontend with small load times",
            },
            {
              image: "ts.png",
              text:
                "TypeScript is the main language used within the codebase, bringing type safety and JavaScript powers together",
            },
            {
              image: "vuetify.webp",
              text:
                "Vuetify is the UI framework of choice, offering Google's material design to the project through a plethora of UI components",
            },
            {
              image: "jest.png",
              text:
                "The Bilka codebase is thoroughly tested with a vast suite of unit tests ensuring all the components' functionality",
            },
          ],
          start: "Mar 2019",
          end: "Sep 2020",
        },
        {
          title: "feum-ticketing.dk",
          url: "https://feum-ticketing.dk",
          subtitle:
            "New platform for a non-profit underground electronic music movement from Aarhus, Denmark.",
          description:
            "FEUM's mission is to bring together electronic music fans from all over Denmark, and with the help of Aarhus municipality they organize culturally rich events. As my bachelor project I helped bring their new platform to life, which allows for online ticket presale and seamless content maintenance through a CMS.",
          logo: "feum.svg",
          color: "#658be5",
          technologies: [
            {
              image: "vue.png",
              text:
                "The stack revolves around Vue.js, a JavaScript framework encapsulating all HTML, CSS, and JavaScript",
            },
            {
              image: "gridsome.png",
              text:
                "On build Gridsome generates a static page for every view, which get dynamically hydrated when the browser loads them, making the frontend blazing fast and accessible",
            },
            {
              image: "js.png",
              text:
                "The behavioral layer of the website is controlled by Vue through JavaScript",
            },
            {
              image: "netlify-functions.svg",
              text:
                "The site's ticketing backend is serverless, and utilizes the Netlify-operated serverless functions to communicate with third party services and the database",
            },
            {
              image: "netlify-cms.svg",
              text:
                "Netlify CMS is headless, and allows the organization's members to manage the events' content easily without the need to alter any code",
            },
          ],
          start: "Dec 2020",
          end: "Now",
        },
      ],
    };
  },
  props: {
    minScreenHeight: {
      required: true,
      type: Number,
    },
  },
  computed: {
    ...mapGetters(["getCurrentScreenScrollProgress", "getCurrentScreen"]),
    getCurrentColor() {
      return this.currentProject !== null
        ? this.projects[this.currentProject].color
        : "#f8f9fa";
    },
  },
  watch: {
    getCurrentScreenScrollProgress(newValue) {
      if (this.getCurrentScreen === 0) {
        this.currentProject = null;
        return;
      }
      if (this.getCurrentScreen === 2) {
        this.currentProject = this.projects.length - 1;
        return;
      }
      let percentages = [0.1];
      let containerHeight = document.querySelector(".projects__container")
        .clientHeight;
      let projects = document.querySelectorAll(".projects__project");
      projects.forEach((project, index) =>
        percentages.push(
          project.clientHeight / containerHeight + percentages[index]
        )
      );
      for (let i = 0; i < projects.length; i++) {
        if (percentages[i] * 100 <= newValue) this.currentProject = i;
      }
    },
    currentProject(newValue) {
      for (let i = 0; i < this.projects.length; i++) {
        document
          .querySelectorAll(".projects__project")
          [i].classList.remove("active");
      }
      if (newValue !== null) {
        document
          .querySelectorAll(".projects__project")
          [newValue].classList.add("active");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.projects__container {
  display: flex;
  flex-flow: column nowrap;
  transition: background-color 1s ease;

  .projects__project {
    display: flex;
    padding-bottom: 4rem;

    .project__details {
      .project__header {
        display: flex;
        flex-flow: column nowrap;

        .project__title {
          display: flex;
          flex-flow: column nowrap;
          align-items: baseline;
          width: max-content;

          .project__logo {
            margin-top: 0.5rem;
            height: 32px;
            max-width: 100%;

            @include when-screen-is(lg) {
              height: 48px;
            }
            @include when-screen-is(xl) {
              height: 64px;
            }
          }

          @include when-screen-is(md) {
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;

            .project__logo {
              margin-top: 0;
            }
          }
        }

        .project__subtitle {
          margin: 1.5rem 0 0.5rem 0;
        }

        .project__description {
          line-height: 1.5rem;

          @include when-screen-is(lg) {
            line-height: 2rem;
          }
        }
      }

      .project__about {
        display: flex;
        flex-flow: column nowrap;
        margin-top: 2rem;

        figcaption {
          margin-bottom: 1rem;
        }

        .project__technologies {
          display: flex;
          flex-flow: column nowrap;

          .project__technology {
            display: block;
            margin-bottom: 1.5rem;
            padding: 1rem;

            @include when-screen-is(md) {
              margin-bottom: 3rem;
              padding: 1.5rem;
              align-items: center;
              display: flex;
            }
            @include when-screen-is(lg) {
              margin: 0rem;
              padding: 2.25rem;
            }
            @include when-screen-is(xl) {
              padding: 3.75rem;
            }

            &:last-of-type {
              margin-bottom: 2rem;

              @include when-screen-is(lg) {
                margin: 0rem;
              }
            }

            img {
              margin-bottom: 0.5rem;
              min-width: 64px;
              height: 64px;
              max-width: 128px;

              @include when-screen-is(md) {
                margin-right: 1.5rem;
                margin-bottom: 0;
              }
              @include when-screen-is(lg) {
                margin-right: 2.25rem;
                min-width: 96px;
                height: 96px;
              }
              @include when-screen-is(lg) {
                margin-right: 3.75rem;
                min-width: 112px;
                height: 112px;
              }
            }

            p {
              line-height: 1.5rem;

              @include when-screen-is(lg) {
                line-height: 2rem;
              }
            }
          }

          @include when-screen-is(lg) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3.25rem;
          }
          @include when-screen-is(xl) {
            gap: 4.75rem;
          }
        }
      }
    }

    .timeline__fragment {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: center;
      margin-right: -2rem;
      padding-right: 1rem;
      padding-left: 2rem;

      .timeline__start,
      .timeline__end {
        padding: 0.5rem;
        writing-mode: vertical-rl;
        text-orientation: upright;
        font-family: "sintony", sans-serif;

        @include when-screen-is(lg) {
          padding: 0.75rem;
          font-size: 1.25rem;
        }
        @include when-screen-is(xl) {
          padding: 1.25rem;
          font-size: 1.7rem;
        }
      }

      .timeline__end {
        margin-bottom: 2rem;
      }

      .timeline__divider {
        flex: 1 0 auto;
        width: 2px;
        display: block;
        background-color: $black-ish;
        margin: 1rem 0;
      }

      @include when-screen-is(md) {
        padding-left: 7.5rem;
        padding-right: 2rem;
        margin-right: -4rem;
      }
    }

    &.active {
      .project__technology {
        background-color: $heart-color;
        box-shadow: 0.5rem 0.5rem $black-ish;
      }

      .timeline__start,
      .timeline__divider,
      .timeline__end,
      .project__technology {
        transition-timing-function: ease;
        transition-property: background-color, box-shadow;
        transition-duration: 0.5s;
      }

      .timeline__start,
      .timeline__end {
        background-color: $heart-color;
        box-shadow: 0.5rem 0.5rem $black-ish;
      }

      .timeline__start {
        transition-delay: 0.25s;
      }

      .timeline__divider {
        width: 5px;

        @include when-screen-is(lg) {
          width: 6px;
        }
        @include when-screen-is(xl) {
          width: 8px;
        }
      }

      .timeline__end {
        transition-delay: 0.75s;
      }
    }

    @include when-screen-is(lg) {
      &:not(:last-of-type) {
        padding-bottom: 8rem;
      }
    }
    @include when-screen-is(lg) {
      &:not(:last-of-type) {
        padding-bottom: 12rem;
      }
    }
  }
}
</style>

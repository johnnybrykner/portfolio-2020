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
  data: function() {
    return {
      timeline: false,
      currentProject: null,
      projects: [
        {
          title: "skif-patria.pl",
          url: "https://skif-patria.pl",
          subtitle: "Web presence for a Polish non-profit organization.",
          description:
            "Patria is a Polish cultural movement based in the southern city of Katowice. Their goal is to promote the region's rich music and dance traditions. As our school project, two Polish classmates and I helped the organization advertise themselves by creating a web presence with its content easily manageable using a headless version of the user-friendly WordPress CMS.",
          logo: "patria.png",
          technologies: [
            {
              image: "html.png",
              text:
                "The site's markup consists of multiple html files linked together"
            },
            {
              image: "sass.png",
              text:
                "Styling is done with a CSS extension - SCSS - allowing for more efficient syntax and stylesheets"
            },
            {
              image: "js.png",
              text:
                "The behavioral layer of the website is controlled by vanilla JavaScript"
            },
            {
              image: "bootstrap.png",
              text:
                "Bootstrap is used as the UI framework of this project, scaffolding layouts and adding helpful style classes"
            },
            {
              image: "wordpress.png",
              text:
                "WordPress CMS is used headlessly to allow the organization's members to manage content easily without touching the code"
            }
          ],
          start: "Nov 2018",
          end: "Mar 2019"
        },
        {
          title: "bilkatogo.dk",
          url: "https://bilkatogo.dk",
          subtitle:
            "Convenient way of grocery shopping in the biggest Danish hypermarket chain.",
          description:
            "BilkaToGo has been a hit of the Danish food e-commerce, with the monthly revenue exceeding anyone's expectations. During my internship at Salling Group, the mother company of the Bilka chain, I helped mantain the online service in its post-launch phase, addressing the users' feedback and small feature requests given to us through Jira.",
          logo: "togo.svg",
          technologies: [
            {
              image: "vue.png",
              text:
                "The stack revolves around Vue.js, a JavaScript framework encapsulating all html, css, and JavaScript"
            },
            {
              image: "nuxt.png",
              text:
                "Vue framework Nuxt is used to make the development process more efficient, providing a helpful layer of abstraction"
            },
            {
              image: "js.png",
              text:
                "BilkaToGo is made with the JavaScript, as the project began before the popularity growth of TypeScript"
            },
            {
              image: "bootstrap.png",
              text:
                "Bootstrap is used as UI framework for consistent layout and spacing helpers across the codebase"
            },
            {
              image: "jest.png",
              text:
                "A set of unit tests using the Jest testing framework makes sure the core functionality can be trusted not to break"
            }
          ],
          start: "Jan 2019",
          end: "Mar 2019"
        },
        {
          title: "bilka.dk",
          url: "https://ny.bilka.dk",
          subtitle:
            "New e-commere platform for one of the oldest players in the Danish retail game.",
          description:
            "Bilka is the biggest Danish hypermarket chain offering wide range of product categories from bikes through furniture all the way to electronics. With its original e-commerce platform being built more than ten years ago, the time has come for a new representative platform to drive the business in today's online world. As part of the frontend team, since the very beginning of the project in March 2019 to its official launch in March 2020, I took part in developing the user interface of the platform.",
          logo: "bilka.svg",
          technologies: [
            {
              image: "vue.png",
              text:
                "The stack revolves around Vue.js, a JavaScript framework encapsulating all html, css, and JavaScript"
            },
            {
              image: "nuxt.png",
              text:
                "Nuxt's main role in the project is Static Site Generation, allowing for a very performant frontend with little load time"
            },
            {
              image: "ts.png",
              text:
                "TypeScript is the main language used within the codebase, bringing type safety and JavaScript powers together"
            },
            {
              image: "vuetify.webp",
              text:
                "Vuetify is the UI framework of choice, bringing Google's material design into the project with a plethora of UI components"
            },
            {
              image: "jest.png",
              text:
                "The Bilka codebase is thoroughly tested with a vast suite of unit tests testing all the components' functionality"
            }
          ],
          start: "Mar 2019",
          end: "Now"
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
    ...mapGetters(["getCurrentScreenScrollProgress", "getCurrentScreen"]),
    getCurrentColor() {
      if (this.currentProject === 0) return "#e01734";
      else if (this.currentProject === 1) return "#009de0";
      else if (this.currentProject === 2) return "#00aeef";
      else return "#79bd9a";
    }
  },
  mounted: function() {
    const scrollObserver = new IntersectionObserver(this.changeBackground, {
      threshold: 0
    });
    scrollObserver.observe(document.querySelector(".projects__container"));
  },
  methods: {
    changeBackground(entries) {
      entries[0].isIntersecting
        ? (this.timeline = true)
        : (this.timeline = false);
    }
  },
  watch: {
    getCurrentScreenScrollProgress(newValue) {
      if (this.getCurrentScreen !== 1) {
        this.currentProject = 2;
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
      document
        .querySelectorAll(".projects__project")
        [newValue].classList.add("active");
    }
  }
};
</script>

<style lang="scss" scoped>
.projects__container {
  display: flex;
  flex-flow: column nowrap;
  transition: background-color 1s ease;

  h1 {
    margin-bottom: 1rem;
  }

  .projects__project {
    display: flex;

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
            height: 36px;
            max-width: 100%;
          }
        }

        .project__subtitle {
          margin: 1.5rem 0 0.5rem 0;
        }

        .project__description {
          line-height: 1.2rem;
        }
      }

      .project__about {
        display: flex;
        flex-flow: column nowrap;
        margin-top: 2rem;

        figcaption {
          margin-bottom: 0.5rem;
        }

        .project__technologies {
          display: flex;
          flex-flow: column nowrap;

          .project__technology {
            display: flex;
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            align-items: center;

            @include when-screen-is(md) {
              margin-bottom: 3rem;
            }

            &:last-of-type {
              margin-bottom: 2rem;
            }

            img {
              margin-right: 1rem;
              min-width: 64px;
              height: 64px;
            }
          }

          @include when-screen-is(lg) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 3rem;
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
      }

      .timeline__end {
        transition-delay: 0.75s;
      }
    }

    @include when-screen-is(lg) {
      min-height: 80vh;
    }
  }
}
</style>

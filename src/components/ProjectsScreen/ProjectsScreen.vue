<template>
  <section>
    <h1>Some of the projects I took part in:</h1>
    <div class="projects">
      <transition name="slide">
        <div v-if="timeline" class="projects__timeline">
          <div
            class="timeline__fragment"
            v-for="(project, index) in projects"
            :key="index"
          >
            <span class="timeline__start">{{ project.start }}</span>
            <span class="timeline__divider"></span>
            <span class="timeline__end">{{ project.end }}</span>
          </div>
        </div>
      </transition>
      <div class="projects__container">
        <article
          class="projects__project"
          v-for="project in projects"
          :key="project.title"
          :style="{ height: minScreenHeight + 'px' }"
        >
          <div class="project__header">
            <div class="project__title">
              <h2>{{ project.title }}</h2>
              <img
                class="project__logo"
                :src="require('@/assets/' + project.logo)"
                :alt="project.title"
              />
            </div>
            <h3>{{ project.description }}</h3>
          </div>
          <figure class="project__about">
            <figcaption>Technologies used:</figcaption>
            <img
              class="project__technology"
              v-for="technology in project.technologies"
              :key="technology"
              :src="require('@/assets/' + technology)"
              alt=""
            />
          </figure>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "projects-screen",
  data: function() {
    return {
      timeline: false,
      projects: [
        {
          title: "skif-patria.pl",
          description:
            "A new web presence for a Polish non-profit organization.",
          logo: "patria.png",
          technologies: [
            "html.png",
            "css.png",
            "js.png",
            "bootstrap.png",
            "wordpress.png"
          ],
          start: "Dec 2018",
          end: "Mar 2019"
        },
        {
          title: "bilkatogo.dk",
          description:
            "A convenient way of grocery shopping in the biggest Danish hypermarket chain.",
          logo: "togo.svg",
          technologies: [
            "vue.png",
            "nuxt.png",
            "js.png",
            "bootstrap.png",
            "jest.png"
          ],
          start: "Jan 2019",
          end: "Mar 2019"
        },
        {
          title: "bilka.dk",
          description:
            "A new platform for one of the oldest players in the Danish e-commerce game.",
          logo: "bilka.svg",
          technologies: [
            "vue.png",
            "nuxt.png",
            "ts.png",
            "vuetify.webp",
            "jest.png"
          ],
          start: "Mar 2019",
          end: "Now"
        }
      ]
    };
  },
  props: {
    currentScreen: {
      required: true,
      type: Number
    },
    minScreenHeight: {
      required: true,
      type: Number
    }
  },
  watch: {
    currentScreen: function(newValue) {
      if (newValue === 1) this.timeline = true;
      else this.timeline = false;
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1rem;
}

.projects {
  display: flex;
  flex-flow: row-reverse nowrap;
  overflow: hidden;
  padding-bottom: 1rem;

  .projects__timeline {
    width: 50px;
    padding: 1rem 0.5rem;
    margin: 0 1rem;
    box-shadow: 0.5rem 0.5rem $black-ish;
    background: linear-gradient(
      $patria-color 0%,
      $patria-color calc(100% / 3),
      $togo-color calc(100% / 3),
      $togo-color calc(100% / 3 * 2),
      $bilka-color calc(100% / 3 * 2),
      $bilka-color 100%
    );
    border-radius: 20px;

    .timeline__fragment {
      margin-bottom: 1rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      align-items: center;
      height: calc(100% / 3 - 8px);

      .timeline__start,
      .timeline__end {
        writing-mode: vertical-rl;
        text-orientation: upright;
        font-family: "sintony", sans-serif;
      }

      .timeline__divider {
        flex: auto;
        width: 2px;
        display: block;
        background-color: $black-ish;
        margin: 1rem 0;
      }
    }

    &.slide-enter-active,
    &.slide-leave-active {
      transition: all 0.3s ease;
    }

    &.slide-enter,
    &.slide-leave-to {
      transform: translateX(50px);
    }
  }

  .projects__container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    background-color: $heart-color;
    margin-right: 1rem;
    box-shadow: 1rem 1rem $black-ish;

    .projects__project {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      padding: 1rem;

      .project__header {
        display: flex;
        flex-flow: column nowrap;

        .project__title {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: baseline;

          .project__logo {
            width: 128px;
          }
        }
      }

      .project__about {
        display: flex;
        flex-flow: column nowrap;

        .project__technology {
          width: 48px;
        }
      }
    }
  }
}
</style>

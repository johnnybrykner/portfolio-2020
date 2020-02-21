<template>
  <section class="projects">
    <h1>Some of the projects I took part in:</h1>
    <article
      class="projects__project"
      v-for="project in projects"
      :key="project.title"
    >
      <div class="project__header">
        <div>
          <h2>{{ project.title }}</h2>
          <h3>{{ project.description }}</h3>
        </div>
        <img
          class="project__logo"
          :src="require('@/assets/' + project.logo)"
          :alt="project.title"
        />
      </div>
      <figure>
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
  </section>
</template>

<script>
export default {
  name: "projects-screen",
  components: {},
  data: function() {
    return {
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
          ]
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
          ]
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
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.projects {
  .projects__project {
    .project__header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;

      .project__logo {
        width: 256px;
      }
    }

    .project__technology {
      width: 48px;
    }
  }
}
</style>

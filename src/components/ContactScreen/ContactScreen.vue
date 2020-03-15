<template>
  <section class="contact">
    <h1>
      I would love you to become part of my journey!
    </h1>
    <p>
      For my upcoming internship starting in summer 2020 I am seeking a company
      which could provide an awesome environment for further professional
      growth! Are you looking for a new frontend reinforcement? Let's have a
      talk!
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
  }
};
</script>

<style lang="scss" scoped>
.contact {
  h1 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .contact__media {
    display: flex;
    justify-content: space-between;

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
      }
    }
  }
}
</style>

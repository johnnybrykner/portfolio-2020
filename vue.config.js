module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/reusables.scss";
        `
      }
    }
  }
};

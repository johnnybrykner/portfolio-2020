import "@/assets/reset.css";
import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import "@/assets/fonts.css";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

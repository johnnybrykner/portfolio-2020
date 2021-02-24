import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentScreen: 0,
    currentScreenScrollProgress: 0,
  },
  mutations: {
    setCurrentScreen(state, newScreen) {
      state.currentScreen = newScreen;
      state.currentScreenScrollProgress = 0;
    },
    setCurrentSreenScrollProgress(state, newAmount) {
      state.currentScreenScrollProgress = newAmount;
    },
  },
  getters: {
    getCurrentScreenScrollProgress(state) {
      return state.currentScreenScrollProgress;
    },
    getCurrentScreen(state) {
      return state.currentScreen;
    },
  },
});

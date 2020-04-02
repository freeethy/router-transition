import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({});

const shouldUseTransition = !/transition=none/.test(location.href);
store.registerModule("routerHistory", {
  state: {
    direction: shouldUseTransition ? "forward" : ""
  },
  mutations: {
    updateDirection(state, payload) {
      console.log("updateDirection -> updateDirection", payload.direction);
      if (!shouldUseTransition) {
        return;
      }
      state.direction = payload.direction;
    }
  }
});

export default store;

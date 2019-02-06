import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import loader from "./modules/loader"
import schedule from "./modules/schedule"

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    user,
    loader,
    schedule
  }
});
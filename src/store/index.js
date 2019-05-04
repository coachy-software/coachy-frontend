import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import loader from "./modules/loader"
import schedule from "./modules/schedule"
import chat from "./modules/chat"

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    user,
    loader,
    schedule,
    chat
  }
});

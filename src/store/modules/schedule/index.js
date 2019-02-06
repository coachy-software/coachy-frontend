import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  schedules: JSON.parse(localStorage.getItem('schedules')) || []
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters
};
import actions from "./actions";
import mutations from "./mutations";

export const SET_HEADWAYS = 'SET_HEADWAYS';

const state = {
  headways: JSON.parse(localStorage.getItem("headways")) || []
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
};

import actions from "./actions";
import mutations from "./mutations";

export const SET_DISCUSSIONS = 'SET_DISCUSSIONS';

const state = {
  discussions: JSON.parse(localStorage.getItem("conversations")) || []
};

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
};

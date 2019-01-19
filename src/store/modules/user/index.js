import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';

const state = {
  token: localStorage.getItem("token") || undefined,
  user: JSON.parse(localStorage.getItem("user")) || undefined,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

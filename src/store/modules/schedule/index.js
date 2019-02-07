import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export const SET_SCHEDULES = 'SET_SCHEDULES';

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
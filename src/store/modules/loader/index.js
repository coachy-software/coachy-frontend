import getters from "./getters";
import mutations from "./mutations";

export const LOADING = 'LOADING';
export const NOT_LOADING = 'NOT_LOADING';
export const SET_STATUS = 'loader/SET_STATUS';

const state = {
  status: NOT_LOADING
};

export default {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
};

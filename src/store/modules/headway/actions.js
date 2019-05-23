import {SET_HEADWAYS} from "./index";
import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";

const add = ({commit, state}, payload) => {
  let headways = state.headways;
  headways.push(payload);

  commit(SET_HEADWAYS, headways);
};

const remove = ({commit, state}, payload) => {
  let headways = state.headways.filter(headway => headway.identifier !== payload.identifier);
  setHeadways(commit, headways);
};

const fetchAll = ({commit}, payload) => {
  return axios.get(`${API_URL}/headways/by-owner/${payload.identifier}`, authorization())
  .then(response => setHeadways(commit, response.data))
};

function setHeadways(commit, payload) {
  commit(SET_HEADWAYS, payload);
  localStorage.setItem('headways', JSON.stringify(payload));

  return payload;
}

export default {
  add,
  remove,
  fetchAll
}

import {SET_HEADWAYS} from "./index";
import axios from "axios";
import {API_URL} from "../../../util/constants";

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
  axios.get(`${API_URL}/headways/${payload.identifier}`)
  .then(response => setHeadways(commit, response.data))
};

function setHeadways(commit, payload) {
  commit(SET_HEADWAYS, payload);
  localStorage.setItem('headways', JSON.stringify(payload));
}

export default {
  add,
  remove,
  fetchAll
}

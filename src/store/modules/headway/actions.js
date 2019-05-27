import {SET_HEADWAYS} from "./index";
import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import {LOADING, NOT_LOADING, SET_STATUS} from "../loader";

const add = async ({commit, state}, payload) => {
  commit(SET_STATUS, LOADING, {root: true});

  let headways = state.headways;

  try {
    let request = await axios.post(`${API_URL}/headways`, payload, authorization());

    headways.push(payload);
    setHeadways(commit, headways);
    commit(SET_STATUS, NOT_LOADING, {root: true});

    return request;
  } catch (ex) {
    commit(SET_STATUS, NOT_LOADING, {root: true});
    return new Error(400);
  }
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

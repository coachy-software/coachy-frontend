import axios from "axios";
import {API_URL} from "@/utils/constants";
import {SET_TOKEN, SET_USER} from "./index";
import {LOADING, SET_STATUS, NOT_LOADING} from "@/store/modules/loader";

const login = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    let base64Credentials = window.btoa(payload.username + ":" + payload.password);

    axios.get(`${API_URL}/users/me`, {headers: {'Authorization': 'Basic ' + base64Credentials}})
    .then(response => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", base64Credentials);

        commit(SET_STATUS, NOT_LOADING, {root: true});
        commit(SET_USER, response.data);
        commit(SET_TOKEN, base64Credentials);
      }

      resolve(response);
    })
    .catch(error => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      reject(error);
    });

  });
};

const register = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    axios.post(`${API_URL}/register`, {
      username: payload.username,
      password: payload.password,
      matchingPassword: payload.matchingPassword,
      email: payload.email,
      accountType: payload.accountType
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      resolve(response);
    })
    .catch(error => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      reject(error);
    });

  });
};

const logout = ({commit}) => {
  localStorage.removeItem("item");
  localStorage.removeItem("token");

  commit(SET_USER, undefined);
  commit(SET_TOKEN, undefined);
};

export default {
  login,
  register,
  logout
}
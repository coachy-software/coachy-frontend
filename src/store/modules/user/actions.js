import axios from "axios";
import {API_URL} from "@/util/constants";
import {SET_TOKEN, SET_USER} from "./index";
import {LOADING, NOT_LOADING, SET_STATUS} from "@/store/modules/loader";
import {authorization} from "@/util/headers";

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

    axios.post(`${API_URL}/users/register`, {
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
  axios.get(`${API_URL}/users/logout`, {withCredentials: true})
  .then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("schedules");
    localStorage.removeItem("conversations");

    commit(SET_USER, undefined);
    commit(SET_TOKEN, undefined);
  })
};

const remove = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/users/${payload.identifier}`, authorization())
    .then(response => resolve(response))
    .catch(error => reject(error));
  });
};

const update = ({commit}) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/users/me`, authorization())
    .then(response => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        commit(SET_USER, response.data);
      }

      resolve(response);
    })
    .catch(error => {
      reject(error);
    })
  });
};

const get = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    axios.get(`${API_URL}/users/${payload.identifier}`, authorization())
    .then(response => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      resolve(response)
    })
    .catch(error => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      reject(error)
    });
  });
};

export default {
  login,
  register,
  logout,
  update,
  get,
  remove
}

import axios from "axios";
import {API_URL} from "@/utils/constants";
import {LOADING, NOT_LOADING, SET_STATUS} from "@/store/modules/loader";
import store from '@/store'
import {authorization} from "@/utils/headers";

export function createResetPasswordToken(payload) {
  return new Promise((resolve, reject) => {
    store.commit(SET_STATUS, LOADING);
    axios.post(`${API_URL}/create-token/${payload.email}`)
    .then(response => {
      store.commit(SET_STATUS, NOT_LOADING);
      resolve(response)
    })
    .catch(error => {
      store.commit(SET_STATUS, NOT_LOADING);
      reject(error)
    });
  });
}

export function resetPassword(payload) {
  return new Promise((resolve, reject) => {
    store.commit(SET_STATUS, LOADING);

    let data = {password: payload.password, confirmPassword: payload.confirmPassword};

    axios.post(`${API_URL}/reset-password/${payload.token}`, data)
    .then(response => {
      store.commit(SET_STATUS, NOT_LOADING);
      resolve(response);
    })
    .catch(error => {
      store.commit(SET_STATUS, NOT_LOADING);
      reject(error);
    });
  });
}

export function updateAccountDetails(payload) {
  return new Promise((resolve, reject) => {
    store.commit(SET_STATUS, LOADING);

    let userIdentifier = store.state.user.user.identifier;
    let data = {
      username: payload.username,
      email: payload.email,
      displayName: payload.displayName,
      avatar: payload.avatar
    };

    axios.put(`${API_URL}/users/${userIdentifier}`, data, authorization())
    .then(response => {
      store.commit(SET_STATUS, NOT_LOADING);
      store.dispatch('user/update');
      resolve(response);
    })
    .catch(error => {
      store.commit(SET_STATUS, NOT_LOADING);
      reject(error);
    })
  })
}

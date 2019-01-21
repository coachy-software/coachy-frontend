import axios from "axios";
import {API_URL} from "@/utils/constants";
import {LOADING, NOT_LOADING, SET_STATUS} from "@/store/modules/loader";
import store from '@/store'
import {SET_USER} from "@/store/modules/user";

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
      email: payload.email,
      displayName: payload.displayName,
      avatar: payload.avatar
    };

    axios.patch(`${API_URL}/users/${userIdentifier}`, data, {headers: {'Authorization': `Basic ${localStorage.getItem('token')}`}})
    .then(response => {
      store.commit(SET_STATUS, NOT_LOADING);
      updateUserStore(payload);
      resolve(response);
    })
    .catch(error => {
      store.commit(SET_STATUS, NOT_LOADING);
      reject(error);
    })
  })
}

function updateUserStore(payload) {
  let user = JSON.parse(localStorage.getItem('user'));

  user.email = payload.email;
  user.displayName = payload.displayName;
  user.avatar = payload.avatar;

  localStorage.setItem('user', JSON.stringify(user));
  store.commit(`user/${SET_USER}`, user);
}

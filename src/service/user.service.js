import axios from "axios";
import {API_URL} from "@/utils/constants";
import {LOADING, NOT_LOADING, SET_STATUS} from "@/store/modules/loader";
import store from '@/store'

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
    axios.post(`${API_URL}/reset-password/${payload.token}`, {password: payload.password, confirmPassword: payload.confirmPassword})
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

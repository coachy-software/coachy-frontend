import axios from "axios";
import {LOADING, SET_STATUS, NOT_LOADING} from "@/store/modules/loader";
import {API_URL} from "@/utils/constants";
import store from '@/store'

export function fetchAll() {
  return new Promise((resolve, reject) => {
    store.commit(SET_STATUS, LOADING, {root: true});

    let userIdentifier = JSON.parse(localStorage.getItem('user')).identifier;
    let token = localStorage.getItem('token');

    axios.get(`${API_URL}/schedules?charge.identifier=${userIdentifier}`, {
      headers: {'Authorization': `Basic ${token}`}
    })
    .then(response => {
      if (response.data) {
        localStorage.setItem('schedules', JSON.stringify(response.data.content));
        store.commit("schedule/SET_SCHEDULES", response.data.content);
      }

      store.commit(SET_STATUS, NOT_LOADING, {root: true});
      resolve(response);
    })
    .catch(error => {
      store.commit(SET_STATUS, NOT_LOADING, {root: true});
      reject(error);
    });

  });
}

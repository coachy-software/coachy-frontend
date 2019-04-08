import axios from "axios";
import {LOADING, SET_STATUS, NOT_LOADING} from "@/store/modules/loader";
import {API_URL} from "@/utils/constants";
import store from '@/store'

export function fetchAll() {
  store.commit(SET_STATUS, LOADING, {root: true});

  let userIdentifier = JSON.parse(localStorage.getItem('user')).identifier;
  let token = localStorage.getItem('token');
  let config = {headers: {'Authorization': `Basic ${token}`}};
  let promises = [];

  let endpoints = [
    `${API_URL}/schedules?charge=${userIdentifier}`,
    `${API_URL}/schedules?creator=${userIdentifier}`
  ];

  return new Promise((resolve) => {
    for (let i = 0; i < endpoints.length; i++) {
      let requestPromise = axios.get(endpoints[i], config)
      .then(response => response.data);

      promises.push(requestPromise);
    }

    return resolve(Promise.all(promises));
  })
  .then(arrays => {
    let chargeSchedules = arrays[0];
    let creatorSchedules = arrays[1];

    if (creatorSchedules.length > 0) {
      creatorSchedules.forEach(schedule => {
        let index = chargeSchedules.findIndex(chargeSchedule => chargeSchedule.identifier === schedule.identifier);

        if (index === -1) {
          chargeSchedules = chargeSchedules.concat(schedule);
        }
      });
    }

    localStorage.setItem('schedules', JSON.stringify(chargeSchedules));
    store.commit("schedule/SET_SCHEDULES", chargeSchedules);
    store.commit(SET_STATUS, NOT_LOADING, {root: true});
  });
}


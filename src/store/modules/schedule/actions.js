import axios from "axios";
import {API_URL} from "@/utils/constants";
import {LOADING, SET_STATUS, NOT_LOADING} from "@/store/modules/loader";
import {SET_SCHEDULES} from "./index";

const create = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    axios.post(`${API_URL}/schedules`, {
      name: payload.name,
      creator: payload.creator,
      charge: payload.charge,
      note: payload.note,
      active: payload.active,
      days: [
        {name: this.$t('days.monday'), trainingDay: payload.monday},
        {name: this.$t('days.tuesday'), trainingDay: payload.tuesday},
        {name: this.$t('days.wednesday'), trainingDay: payload.wednesday},
        {name: this.$t('days.thursday'), trainingDay: payload.thursday},
        {name: this.$t('days.friday'), trainingDay: payload.friday},
        {name: this.$t('days.saturday'), trainingDay: payload.saturday},
        {name: this.$t('days.sunday'), trainingDay: payload.sunday}
      ]
    }, {headers: {'Authorization': `Basic ${localStorage.getItem('token')}`}})
    .then(response => {
      if (response.data) {
        let currentSchedules = JSON.parse(localStorage.getItem('schedules'));
        localStorage.setItem("schedules", JSON.stringify(currentSchedules.concat(response.data)));

        commit(SET_SCHEDULES, currentSchedules.concat(response.data));
      }

      commit(SET_STATUS, NOT_LOADING, {root: true});
      resolve(response);
    })
    .catch(error => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      reject(error);
    });

  });
};

const remove = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    axios.delete(`${API_URL}/schedules/${payload.identifier}`, {
      headers: {'Authorization': `Basic ${localStorage.getItem('token')}`}
    })
    .then(response => {
      let schedules = JSON.parse(localStorage.getItem('schedules'));
      let updatedSchedules = schedules.filter(schedule => schedule.identifier !== payload.identifier);

      localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
      commit(SET_SCHEDULES, updatedSchedules);

      commit(SET_STATUS, NOT_LOADING, {root: true});
      resolve(response);
    })
    .catch(error => {
      commit(SET_STATUS, NOT_LOADING, {root: true});
      reject(error);
    })
  });
};

export function update({commit}, payload) {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING);

    axios.delete(`${API_URL}/schedules/${payload.identifier}`, {
      headers: {'Authorization': `Basic ${localStorage.getItem('token')}`}
    })
    .then(response => {
      commit(SET_STATUS, NOT_LOADING);
      resolve(response);
    })
    .catch(error => {
      commit(SET_STATUS, NOT_LOADING);
      reject(error);
    })
  });
}

export default {
  create,
  remove
}
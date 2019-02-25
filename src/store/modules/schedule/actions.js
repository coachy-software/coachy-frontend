import axios from "axios";
import {API_URL} from "@/utils/constants";
import {LOADING, SET_STATUS, NOT_LOADING} from "@/store/modules/loader";
import {SET_SCHEDULES} from "./index";
import i18n from "@/i18n"

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
        {name: i18n.t('days.monday'), trainingDay: payload.days[0].trainingDay, exercises: []},
        {name: i18n.t('days.tuesday'), trainingDay: payload.days[1].trainingDay, exercises: []},
        {name: i18n.t('days.wednesday'), trainingDay: payload.days[2].trainingDay, exercises: []},
        {name: i18n.t('days.thursday'), trainingDay: payload.days[3].trainingDay, exercises: []},
        {name: i18n.t('days.friday'), trainingDay: payload.days[4].trainingDay, exercises: []},
        {name: i18n.t('days.saturday'), trainingDay: payload.days[5].trainingDay, exercises: []},
        {name: i18n.t('days.sunday'), trainingDay: payload.days[6].trainingDay, exercises: []}
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

const update = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    axios.patch(`${API_URL}/schedules/${payload.identifier}`, payload, {
      headers: {'Authorization': `Basic ${localStorage.getItem('token')}`}
    })
    .then(response => {
      let schedules = JSON.parse(localStorage.getItem('schedules'));
      let resetSchedules = schedules.filter(schedule => schedule.identifier !== payload.identifier);
      let updatedSchedules = resetSchedules.concat(payload);

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

export default {
  create,
  remove,
  update
}
import axios from "axios";
import {API_URL} from "@/utils/constants";
import {LOADING, SET_STATUS, NOT_LOADING} from "@/store/modules/loader";
import {SET_SCHEDULES} from "./index";

const create = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    commit(SET_STATUS, LOADING, {root: true});

    let exercises = [
      {
        name: "Wyciskanie",
        sets: 4,
        reps: 15,
        miniSets: 3
      },
      {
        name: "Wyciskanie skos",
        sets: 4,
        reps: 15,
        miniSets: 3
      },
      {
        name: "Francuzy",
        sets: 4,
        reps: 15,
        miniSets: 3
      },
      {
        name: "Biceps",
        sets: 4,
        reps: 15,
        miniSets: 3
      }
    ];

    axios.post(`${API_URL}/schedules`, {
      name: payload.name,
      creator: payload.creator,
      charge: payload.charge,
      note: payload.note,
      active: payload.active,
      days: [
        {name: "Poniedziałek", trainingDay: true, days: exercises},
        {name: "Wtorek", trainingDay: true, days: exercises},
        {name: "Środa", trainingDay: true, days: exercises},
        {name: "Czwartek", trainingDay: true, days: exercises},
        {name: "Piatek", trainingDay: true, days: exercises},
        {name: "Sobota", trainingDay: true, days: exercises},
        {name: "Niedziela", trainingDay: true, days: exercises},
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

export default {
  create
}
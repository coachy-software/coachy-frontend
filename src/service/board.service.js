import axios from "axios";
import {API_URL} from "@/utils/constants";
import {authorization} from "@/utils/headers";
import store from "@/store";
import {updateUserBoardIdentifier} from "./user.service";
import ObjectID from "bson-objectid";

export function createBoard() {
  return new Promise(resolve => {
    let user = store.state.user.user;
    let data = {
      name: "Board",
      owner: user,
      labels: [
        {
          identifier: ObjectID.generate(),
          name: "Do zrobienia",
          tasks: [
            {identifier: ObjectID.generate(), color: "#ff2db3", name: "Test task", content: "That's a test content 😋"},
            {identifier: ObjectID.generate(), color: "#06e7ff", name: "Test task", content: "That's a test content 😋"},
            {identifier: ObjectID.generate(), color: "#2b2b2b", name: "Test task", content: "That's a test content 😋"}
          ]
        },
        {
          identifier: ObjectID.generate(),
          name: "Gotowe",
          tasks: [
            {identifier: ObjectID.generate(), color: "#ff2db3", content: "That's a test content 😋"},
            {identifier: ObjectID.generate(), color: "#06e7ff", content: "That's a test content 😋"},
            {identifier: ObjectID.generate(), color: "#2b2b2b", content: "That's a test content 😋"}
          ]
        }
      ]
    };

    axios.post(`${API_URL}/boards`, data, authorization())
    .then(response => resolve(updateAndFetch(response.data.identifier)));
  });
}

export function fetch(payload) {
  return new Promise(resolve => {
    axios.get(`${API_URL}/boards/${payload.identifier}`, authorization())
    .then(response => resolve(response));
  })
}

export function updateAndFetch(identifier) {
  return updateUserBoardIdentifier({boardIdentifier: identifier})
  .then(() => fetch({identifier: identifier}))
}


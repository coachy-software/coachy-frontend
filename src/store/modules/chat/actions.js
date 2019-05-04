import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import {SET_DISCUSSIONS} from "./index";

const init = ({commit}, payload) => {
  axios.get(`${API_URL}/chats/${payload.identifier}?size=10`, authorization())
  .then(response => commit(SET_DISCUSSIONS, response.data));
};

const add = ({commit, state}, payload) => {
  let discussions = state.discussions;
  discussions.push(payload);

  commit(SET_DISCUSSIONS, discussions);
};

const update = ({commit, state}, payload) => {
  let discussions = state.discussions.filter(discussion => discussion.identifier !== payload.identifier);
  discussions.push(payload);

  commit(SET_DISCUSSIONS, discussions);
};

export default {
  init,
  add,
  update
}

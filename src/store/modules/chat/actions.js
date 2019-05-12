import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import {SET_DISCUSSIONS} from "./index";
import {searchUserByUsername} from "@/service/user.service";

const init = ({commit}, payload) => {
  axios.get(`${API_URL}/conversations/${payload.identifier}?size=10`, authorization())
  .then(response => {
    let usersIds = new Set();
    let rawConversations = response.data;
    let conversationPromises = [];

    new Promise((resolve) => {
      rawConversations.forEach(conversation => {
        let targetUsername = obtainTargetUsername(conversation);
        let userPromise = searchUserByUsername({username: targetUsername}).then(response => {
          conversation.user = response.data[0];

          if (!usersIds.has(conversation.user.identifier)) {
            usersIds.add(response.data[0].identifier);
            return conversation;
          }
        });

        conversationPromises.push(userPromise);
      });

      return resolve(Promise.all(conversationPromises));
    }).then(conversations => commit(SET_DISCUSSIONS, conversations.filter(conversation => conversation !== undefined)));
  });
};

const update = ({commit, state}, payload) => {
  let discussions = state.discussions.filter(discussion => discussion.user.identifier !== payload.user.identifier);
  discussions.push(payload);

  commit(SET_DISCUSSIONS, discussions.reverse());
};

function obtainTargetUsername(conversation) {
  let clientUsername = JSON.parse(localStorage.getItem('user')).username;
  let targetUsername;

  if (clientUsername !== conversation.senderName) {
    targetUsername = conversation.senderName;
  } else if (clientUsername !== conversation.recipientName) {
    targetUsername = conversation.recipientName;
  } else {
    targetUsername = clientUsername;
  }

  return targetUsername;
}

export default {
  init,
  update
}

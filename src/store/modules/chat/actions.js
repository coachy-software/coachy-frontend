import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import {SET_DISCUSSIONS} from "./index";
import {searchUserByUsername} from "@/service/user.service";

const init = ({commit}, payload) => {
  axios.get(`${API_URL}/conversations/${payload.identifier}`, authorization())
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
    }).then(conversations => {
      let undefinedAwareConversations = conversations.filter(conversation => conversation !== undefined);

      commit(SET_DISCUSSIONS, undefinedAwareConversations);
      localStorage.setItem('conversations', JSON.stringify(undefinedAwareConversations))
    });
  });
};

const update = ({commit, state}, payload) => {
  let discussions = state.discussions.filter(discussion => discussion.user.identifier !== payload.user.identifier);
  discussions.push(payload);
  let sortedDiscussions = discussions.sort((a, b) => b.lastMessageDate - a.lastMessageDate);

  commit(SET_DISCUSSIONS, sortedDiscussions);
  localStorage.setItem('conversations', JSON.stringify(sortedDiscussions))
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

import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import {SET_DISCUSSIONS} from "./index";
import {searchUserByUsername} from "@/service/user.service";

const init = ({commit}, payload) => {
  axios.get(`${API_URL}/conversations/${payload.identifier}`, authorization())
  .then(response => {
    let rawConversations = response.data;
    let conversationPromises = [];

    new Promise((resolve) => {
      rawConversations.forEach(conversation => {
        let targetUsername = obtainTargetUsername(conversation);
        let userPromise = searchUserByUsername({username: targetUsername}).then(response => {
          conversation.user = response.data[0];
          return conversation;
        });

        conversationPromises.push(userPromise);
      });

      return resolve(Promise.all(conversationPromises));
    }).then(conversations => {
      commit(SET_DISCUSSIONS, conversations);
      localStorage.setItem('conversations', JSON.stringify(conversations))
    });
  });
};

const add = ({commit, state}, payload) => {
  let discussions = state.discussions;
  discussions.push(payload);

  let sortedDiscussions = sort(discussions);
  commit(SET_DISCUSSIONS, sortedDiscussions);
  localStorage.setItem('conversations', JSON.stringify(sortedDiscussions))
};

const update = ({commit, state}, payload) => {
  state.discussions.filter(discussion => discussion.user.identifier === payload.user.identifier)
  .map(discussion => {
    console.log('test ' + JSON.stringify(discussion.user));
    console.log('test ' + JSON.stringify(payload.user));

    discussion.lastMessageId = payload.lastMessageId;
    discussion.lastMessageText = payload.lastMessageText;
    discussion.lastMessageDate = payload.lastMessageDate;
  });

  let sortedDiscussions = sort(state.discussions);

  commit(SET_DISCUSSIONS, sortedDiscussions);
  localStorage.setItem('conversations', JSON.stringify(sortedDiscussions))
};

function sort(discussions) {
  return discussions.sort((a, b) => b.lastMessageDate - a.lastMessageDate);
}

function obtainTargetUsername(conversation) {
  let clientUsername = JSON.parse(localStorage.getItem('user')).username;
  return conversation.conversers.filter((converser, index) => {
    let conversers = conversation.conversers;
    if (conversers[index + 1] && conversers[index + 1] === conversers[index]) {
      return true;
    }

    return converser !== clientUsername;
  });
}

export default {
  init,
  add,
  update
}

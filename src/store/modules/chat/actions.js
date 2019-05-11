import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import {SET_DISCUSSIONS} from "./index";
import {searchUserByUsername} from "@/service/user.service";

const init = ({commit}, payload) => {
  axios.get(`${API_URL}/conversations/${payload.identifier}?size=10`, authorization())
  .then(response => {
    let usersIds = new Set();
    let conversations = response.data;
    let promises = [];

    new Promise((resolve) => {
      let clientUsername = JSON.parse(localStorage.getItem('user')).username;
      let targetUsername;

      conversations.forEach(conversation => {
        if (clientUsername !== conversation.senderName) {
          targetUsername = conversation.senderName;
        } else if (clientUsername !== conversation.recipientName) {
          targetUsername = conversation.recipientName;
        } else {
          targetUsername = clientUsername;
        }

        let userPromise = searchUserByUsername({username: targetUsername}).then(result => {
          conversation.user = result.data[0];

          if (!usersIds.has(conversation.user.identifier)) {
            usersIds.add(result.data[0].identifier);
            return conversation;
          }
        });

        promises.push(userPromise);
      });

      return resolve(Promise.all(promises));
    }).then(newConversations => {
      commit(SET_DISCUSSIONS, newConversations.filter(conversation => conversation !== undefined && usersIds.has(conversation.user.identifier)));
    });

  });
};

const add = ({commit, state}, payload) => {
  let discussions = state.discussions;
  discussions.push(payload);

  commit(SET_DISCUSSIONS, discussions);
};

const update = ({commit, state}, payload) => {
  let discussions = state.discussions.filter(discussion => discussion.identifier === payload.identifier)
  .map(discussion => {
    discussion.lastMessageText = payload.lastMessageText;
    discussion.lastMessageId = payload.lastMessageId;
    discussion.lastMessageDate = payload.lastMessageDate;
  });

  commit(SET_DISCUSSIONS, discussions);
};

export default {
  init,
  add,
  update
}

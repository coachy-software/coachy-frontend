import axios from "axios";
import {API_URL} from "@/util/constants";
import {authorization} from "@/util/headers";
import {SET_DISCUSSIONS} from "./index";
import {trimLocationHeader} from "@/util/headers";
import * as _ from "underscore";
import {searchUserByUsername} from "@/service/user.service";

const saveConversations = ({commit}, payload) => {
  let sortedConversations = sort(payload.conversations);
  commit(SET_DISCUSSIONS, sortedConversations);
  localStorage.setItem('conversations', JSON.stringify(sortedConversations))
};

const updateConversation = ({commit, state}, payload) => {
  state.discussions.filter(conversation => conversation.identifier === payload.conversationId)
  .map(conversation => payload.mappingHandler(conversation));

  let sortedDiscussions = sort(state.discussions);

  commit(SET_DISCUSSIONS, sortedDiscussions);
  localStorage.setItem('conversations', JSON.stringify(sortedDiscussions))
};

const init = async ({commit}, payload) => {
  commit(SET_DISCUSSIONS, []);
  localStorage.setItem('conversations', JSON.stringify([]));

  let response = await axios.get(`${API_URL}/conversations/by-converser/${payload.identifier}`, authorization());
  let conversations = response.data;

  conversations.forEach(conversation => {
    let targetUsername = conversation.conversers.filter(converser => converser !== payload.username);
    searchUserByUsername({username: targetUsername})
    .then(response => {
      conversation.user = response.data[0];
      commit(SET_DISCUSSIONS, conversations);
      localStorage.setItem('conversations', JSON.stringify(conversations));
    });
  });
};

const updateActive = ({commit, state}, payload) => {
  updateConversation({commit, state}, {conversationId: payload.conversationId, mappingHandler: (conversation) => conversation.active = payload.active});
};

const updatePing = ({commit, state}, payload) => {
  updateConversation({commit, state}, {conversationId: payload.conversationId, mappingHandler: (conversation) => conversation.ping = payload.ping});
};

const updateAllActive = ({commit, state}, payload) => {
  state.discussions.map(discussion => discussion.active = payload.active);
  let sortedDiscussions = sort(state.discussions);

  commit(SET_DISCUSSIONS, sortedDiscussions);
  localStorage.setItem('conversations', JSON.stringify(sortedDiscussions))
};

const load = ({commit, state}, payload) => {
  let conversations = state.discussions;

  return axios.post(`${API_URL}/conversations`, {conversers: payload.conversers}, authorization())
  .then(response => {
    if (response.status === 200) {
      let conversation = response.data;
      conversation.user = payload.recipient;

      pushIfAbsent(conversation, conversations);

      saveConversations({commit}, {conversations: conversations});
      return response.data;
    }

    let conversationId = trimLocationHeader(response.headers.location);

    return axios.get(`${API_URL}/conversations/${conversationId}`, authorization())
    .then(response => {
      let conversation = response.data;
      conversation.user = payload.recipient;

      pushIfAbsent(conversation, conversations);

      saveConversations({commit}, {conversations: conversations});
      return response.data;
    });
  });
};

const pushIfAbsent = (conversation, conversations) => {
  if (_.findWhere(conversations, {identifier: conversation.identifier}) === undefined) {
    conversations.push(conversation);
  }
};

const update = ({commit, state}, payload) => {
  updateConversation({commit, state}, {
    conversationId: payload.conversationId, mappingHandler: (conversation) => {
      conversation.lastMessageId = payload.lastMessageId;
      conversation.lastMessageText = payload.lastMessageText;
      conversation.lastMessageDate = payload.lastMessageDate;
    }
  });
};

function sort(discussions) {
  return discussions.sort((a, b) => b.lastMessageDate - a.lastMessageDate);
}

export default {
  init,
  load,
  update,
  updateActive,
  updatePing,
  updateAllActive
}

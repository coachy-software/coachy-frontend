import SockJS from "sockjs-client";
import Stomp from "stompjs"
import axios from "axios";
import {API_URL, WS_URL} from "@/util/constants";
import store from "@/store";
import {LOADING, SET_STATUS} from "@/store/modules/loader";
import {NOT_LOADING} from "../store/modules/loader";

let stompClient;

const subscribe = (endpoint, callback) => {
  store.commit(SET_STATUS, LOADING);

  let handler = () => {
    return connect(() => {
      stompClient.subscribe(endpoint, callback);
      store.commit(SET_STATUS, NOT_LOADING);
    }, error => {
      console.error('Cannot connect to the websocket server ' + error);
    });
  };

  setTimeout(handler, 2000);
};

const send = (uri, payload) => {
  if (stompClient && stompClient.connected) {
    stompClient.send(uri, {}, payload);
  }
};

const connect = (successCallback, errorCallback) => {
  axios.get(`${API_URL}/users/me`, {
    headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
    withCredentials: true
  })
  .then(() => {
    if (!(stompClient && stompClient.connected)) {
      const socket = new SockJS(WS_URL);

      stompClient = Stomp.over(socket);
      stompClient.debug = () => {};
      stompClient.connect({}, frame => successCallback(frame), error => errorCallback(error));
    } else {
      successCallback();
    }
  });
};

export default {
  subscribe,
  connect,
  send
};


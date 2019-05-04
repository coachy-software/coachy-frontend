import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import {API_URL} from "@/util/constants";

let WS;
let StompClient;
let isConnected = false;

export function subscribe(endpoint, callback) {
  if (isConnected) {
    StompClient.subscribe(endpoint, callback);
    return;
  }

  connect(() => {
    isConnected = true;
    StompClient.subscribe(endpoint, callback);
  });
}

function connect(callback) {
  axios.get(`${API_URL}/users/me`, {
    headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
    withCredentials: true
  })
  .then(() => {
    WS = new SockJS("http://localhost:3000/ws");
    StompClient = Stomp.over(WS);
    StompClient.debug = () => {};
    StompClient.connect({}, () => callback(), () => isConnected = false);
  });
}

export {WS, StompClient};


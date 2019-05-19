import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import {API_URL} from "@/util/constants";

let WS;
let StompClient;
let isConnected = false;

export function subscribe(endpoint, callback) {
  if (!isConnected) {
    connect(() => {
      StompClient.subscribe(endpoint, callback);
      isConnected = true;
    });
    return;
  }

  StompClient.subscribe(endpoint, callback);
}

function connect(callback) {
  if (!isConnected) {
    axios.get(`${API_URL}/users/me`, {
      headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
      withCredentials: true
    })
    .then(() => {
      WS = new SockJS("http://api.coachy.life/ws");
      StompClient = Stomp.over(WS);
      StompClient.debug = () => {
      };
      StompClient.connect({}, () => callback(), () => isConnected = false);
    });
  }
}

export {WS, StompClient};


import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WS = new SockJS("http://localhost:3000/ws");
const StompClient = Stomp.over(WS);

StompClient.debug = () => {};

export {WS, StompClient};


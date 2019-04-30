import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatDialog from "./components/chat_dialog/ChatDialog"
import {API_URL} from "@/utils/constants";
import axios from "axios"
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  data: () => ({
    stompClient: null,
    sender: '',
    recipient: '',
    messages: []
  }),
  components: {
    'chat-dialog': ChatDialog
  },
  created() {
    let identifier = this.$route.params.id;

    this.$store.dispatch('user/get', {identifier: identifier})
    .then(response => {
      this.recipient = response.data;

      axios.get(`${API_URL}/users/me`, {
        headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
        withCredentials: true
      })
      .then((ownDetails) => {
        let socket = new SockJS("http://localhost:3000/ws");
        this.stompClient = Stomp.over(socket);
        this.sender = ownDetails.data;

        // this.stompClient.debug = () => {};
        this.stompClient.connect({}, () => {
          this.stompClient.subscribe('/user/queue/private', msgOut => {
            this.messages.push(JSON.parse(msgOut.body));
          });
        });
      })

    });
  },
  mounted() {
    let containers = document.querySelectorAll('.main .chat .content');
    new PerfectScrollbar(containers[0], {wheelSpeed: 0.5});
  },
  methods: {
    performSubmit(messageContent) {
      let stompClient = this.stompClient;
      let senderUsername = this.sender.username;

      let recipientUsername = this.recipient.username;
      let message = JSON.stringify({from: senderUsername, to: recipientUsername, text: messageContent});

      stompClient.send(`/app/chat.message.private`, {}, message);
      this.messages.push(JSON.parse(message));
    }
  }
}

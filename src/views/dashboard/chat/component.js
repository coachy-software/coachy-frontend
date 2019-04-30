import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatDialog from "./components/chat_dialog/ChatDialog"
import {API_URL} from "@/utils/constants";
import axios from "axios"
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default {
  data: () => ({
    username: '',
    id: '',
    avatar: '',
    stompClient: null,
    sender: '',
    recipient: '',
  }),
  components: {
    'chat-dialog': ChatDialog
  },
  created() {
    let identifier = this.$route.params.id;

    this.$store.dispatch('user/get', {identifier: identifier})
    .then(response => {
      this.username = response.data.username;
      this.id = response.data.identifier;
      this.avatar = response.data.avatar;

      axios.get(`${API_URL}/users/me`, {
        headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
        withCredentials: true
      })
      .then((ownDetails) => {
        let socket = new SockJS("http://localhost:3000/ws");
        this.stompClient = Stomp.over(socket);

        this.sender = ownDetails.data.username;
        this.recipient = response.data.username;

        this.stompClient.connect({}, () => {
          this.stompClient.subscribe('/user/queue/private', msgOut => {
            console.log("received a message: " + msgOut)
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
      let sender = this.sender;
      let recipient = this.recipient;
      let message = JSON.stringify({from: sender, to: recipient, text: messageContent});

      stompClient.send(`/app/chat.message.private`, {}, message);
    }
  }
}

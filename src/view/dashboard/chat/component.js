import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatDialog from "./components/chat_dialog/ChatDialog"
import {API_URL} from "@/util/constants";
import axios from "axios"
import {StompClient} from "@/service/ws.js";

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
  beforeRouteUpdate(to, from, next) {
    next();
    this.loadChat();
  },
  created() {
    this.loadChat();
  },
  mounted() {
    let containers = document.querySelectorAll('.main .chat .content');
    new PerfectScrollbar(containers[0], {wheelSpeed: 0.5});
  },
  methods: {
    loadChat() {
      this.messages = [];

      this.$store.dispatch('user/get', {identifier: this.$route.params.id})
      .then(response => {
        this.recipient = response.data;

        axios.get(`${API_URL}/users/me`, {
          headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
          withCredentials: true
        })
        .then((ownDetails) => {
          this.sender = ownDetails.data;
          StompClient.connect({}, () => {
            StompClient.subscribe('/user/queue/private', msgOut => {
              console.log(JSON.parse(msgOut.body));
              this.messages.push(JSON.parse(msgOut.body));
            });
          });
        })
      })
      .catch(() => this.$router.back())
    },
    performSubmit(messageContent) {
      if (messageContent.length === 0) {
        return;
      }

      let senderUsername = this.sender.username;
      let recipientUsername = this.recipient.username;
      let message = JSON.stringify({from: senderUsername, to: recipientUsername, text: messageContent});

      StompClient.send(`/app/chat.message.private`, {}, message);
      this.messages.push(JSON.parse(message));
    }
  }
}

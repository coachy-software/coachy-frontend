import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatDialog from "./components/chat_dialog/ChatDialog"
import {API_URL} from "@/util/constants";
import axios from "axios"
import {StompClient} from "@/service/ws.js";
import chatNotificationSound from "@/assets/sounds/chat.mp3";

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
        let baseTitle = this.recipient.displayName || this.recipient.username;
        document.title = baseTitle;

        axios.get(`${API_URL}/users/me`, {
          headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
          withCredentials: true
        })
        .then((ownDetails) => {
          this.sender = ownDetails.data;

          StompClient.connect({}, () => {
            StompClient.subscribe('/user/queue/private', msgOut => {
              let currentState = false;
              let titleAnimation;

              this.messages.push(JSON.parse(msgOut.body));

              if (!document.hasFocus()) {
                let audio = new Audio(chatNotificationSound);
                audio.volume = 0.3;
                audio.play();

                let newTitle = `Masz nową wiadomość od ${baseTitle}`;
                titleAnimation = setInterval(() => {
                  document.title = currentState ? baseTitle : newTitle;
                  currentState = !currentState;
                }, 2000);
              }

              window.onfocus = () => {
                if (titleAnimation) {
                  clearInterval(titleAnimation);
                }

                document.title = baseTitle;
              }

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

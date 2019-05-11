import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatDialog from "./components/chat_dialog/ChatDialog"
import {API_URL} from "@/util/constants";
import axios from "axios"
import {StompClient, subscribe} from "@/service/ws.js";
import chatNotificationSound from "@/assets/sounds/chat.mp3";
import ObjectID from "bson-objectid";

export default {
  data: () => ({
    identifier: '',
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
    playNotificationSound() {
      let audio = new Audio(chatNotificationSound);
      audio.volume = 0.3;
      audio.play();
    },
    scrollToBottom() {
      let element = document.querySelector('#content');
      element.scrollTop = element.scrollHeight - 100;
    },
    loadChat() {
      this.identifier = ObjectID.generate();
      this.messages = [];

      this.$store.dispatch('user/get', {identifier: this.$route.params.id})
      .then(response => {
        this.recipient = response.data;
        document.title = this.recipient.displayName || this.recipient.username;

        axios.get(`${API_URL}/users/me`, {
          headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
          withCredentials: true
        })
        .then((ownDetails) => {
          this.sender = ownDetails.data;

          subscribe('/user/queue/private', msgOut => {
            let message = JSON.parse(msgOut.body);

            this.addDiscussion(this.identifier, message.from, message.body);
            this.messages.push(message);
            this.scrollToBottom();

            if (!document.hasFocus()) {
              this.playNotificationSound();
            }
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

      let message = JSON.stringify({from: senderUsername, to: recipientUsername, body: messageContent, date: new Date().toISOString()});

      StompClient.send(`/app/chat.message.private`, {}, message);

      this.addDiscussion(this.identifier, senderUsername, recipientUsername, messageContent);
      this.messages.push(JSON.parse(message));

      this.scrollToBottom();
    },
    addDiscussion(id, senderName, recipientName, lastMessageId, lastMessageText, lastMessageDate) {
      if (this.messages.length === 0) {
        this.$store.dispatch('chat/add', {
          identifier: id,
          senderName: senderName,
          recipientName: recipientName,
          lastMessageId: lastMessageId,
          lastMessageText: lastMessageText,
          lastMessageDate: lastMessageDate
        });

        return;
      }

      this.$store.dispatch('chat/update', {
        identifier: id,
        lastMessageId: lastMessageId,
        lastMessageText: lastMessageText,
        lastMessageDate: lastMessageDate
      });
    }
  }
}

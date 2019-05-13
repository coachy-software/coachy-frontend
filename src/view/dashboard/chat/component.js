import ChatDialog from "./components/chat_dialog/ChatDialog"
import {API_URL} from "@/util/constants";
import axios from "axios"
import {StompClient, subscribe} from "@/service/ws.js";
import chatNotificationSound from "@/assets/sounds/chat.mp3";
import ObjectID from "bson-objectid";
import {authorization} from "@/util/headers";
import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";

export default {
  data: () => ({
    identifier: '',
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
  mounted() {
    this.loadChat();
  },
  methods: {
    playNotificationSound() {
      let audio = new Audio(chatNotificationSound);
      audio.volume = 0.3;
      audio.play();
    },
    scrollToBottom() {
      let element = document.querySelector('#content');
      element.scrollTop = element.scrollHeight;
    },
    loadChat() {
      let containers = document.querySelectorAll('.main .chat .content');
      let perfectScrollbar = new PerfectScrollbar(containers[0], {wheelSpeed: 0.5});

      containers[0].scrollTop = 0;
      perfectScrollbar.update(containers[0]);

      this.identifier = ObjectID.generate();

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
          this.loadMessages();

          subscribe('/user/queue/private', msgOut => {
            let message = JSON.parse(msgOut.body);

            this.addDiscussion(this.identifier, this.sender.username, this.recipient.name, ObjectID.generate(), message.body, new Date().toISOString());
            this.messages.push(message);

            if (!document.hasFocus()) {
              this.playNotificationSound();
            }
          });
        })
      })
      .catch(() => this.$router.back())
    },
    loadMessages() {
      let conversations = JSON.parse(localStorage.getItem('conversations'));

      conversations.filter(conversation => {
        if (conversation.user.identifier === this.recipient.identifier) {
          axios.get(`${API_URL}/messages/${conversation.identifier}`, authorization())
          .then(response => this.messages = response.data)
          .catch(() => this.messages = []);
          return true;
        }

        this.messages = [];
        return true;
      });
    },
    performSubmit(messageContent) {
      if (messageContent.length === 0) {
        return;
      }

      let senderUsername = this.sender.username;
      let recipientUsername = this.recipient.username;

      let websocketPayload = JSON.stringify({from: senderUsername, to: recipientUsername, body: messageContent, date: new Date().toISOString()});
      this.addDiscussion(this.identifier, senderUsername, recipientUsername, ObjectID.generate(), messageContent, new Date().toISOString());

      StompClient.send(`/app/chat.message.private`, {}, websocketPayload);
      this.messages.push({senderName: senderUsername, body: messageContent});

      this.scrollToBottom();
    },
    addDiscussion(id, senderName, recipientName, lastMessageId, lastMessageText, lastMessageDate) {
      this.$store.dispatch('chat/update', {
        identifier: id,
        senderName: senderName,
        recipientName: recipientName,
        lastMessageId: lastMessageId,
        lastMessageText: lastMessageText,
        lastMessageDate: lastMessageDate,
        user: this.recipient
      });
    }
  }
}

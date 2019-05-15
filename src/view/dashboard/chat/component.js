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
    messages: [],
    typing: false,
    typingInterval: null
  }),
  components: {
    'chat-dialog': ChatDialog
  },
  beforeRouteUpdate(to, from, next) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (to.params.id === user.identifier) {
      next('/dashboard/chats');
      return;
    }

    next();
    this.updateAllActive(false);
    this.killInterval();
    this.loadChat();
  },
  mounted() {
    this.updateAllActive(false);
    this.loadChat();
  },
  methods: {
    killInterval() {
      if (this.typingInterval) {
        clearInterval(this.typingInterval)
      }
    },
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
      this.identifier = '';

      let containers = document.querySelectorAll('.main .chat .content');
      let perfectScrollbar = new PerfectScrollbar(containers[0], {wheelSpeed: 1});

      containers[0].scrollTop = 0;
      perfectScrollbar.update(containers[0]);

      this.$store.dispatch('user/get', {identifier: this.$route.params.id})
      .then(response => {
        this.recipient = response.data;
        document.title = this.recipient.displayName || this.recipient.username;
        this.updateActive(true);
        this.updatePing(false, this.recipient);

        axios.get(`${API_URL}/users/me`, {
          headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
          withCredentials: true
        })
        .then((ownDetails) => {
          this.sender = ownDetails.data;
          this.loadMessages();

          subscribe('/user/queue/private', msgOut => {
            let message = JSON.parse(msgOut.body);

            this.identifier = message.conversationId;
            this.addOrUpdateDiscussion(message.conversationId, [this.recipient.username, this.sender.username], ObjectID.generate(), message.body,
                new Date().toISOString(), {username: message.from});

            this.messages.push({body: message.body, conversationId: message.conversationId, identifier: message.identifier, senderName: message.from});
            this.scrollToBottom();

            if (!document.hasFocus()) {
              if (this.recipient.username !== message.from) {
                this.updatePing(true, {username: message.from});
              }

              this.playNotificationSound();
            }
          });

          subscribe('/user/queue/typing', (msgOut) => {
            let message = JSON.parse(msgOut.body);
            if (message.from === this.recipient.username) {
              this.typing = true;
              this.scrollToBottom();
            }
          });

          this.typingInterval = setInterval(() => this.typing = false, 3000);
        })
      })
      .catch(() => this.$router.back())
    },
    loadMessages() {
      let conversations = JSON.parse(localStorage.getItem('conversations'));

      conversations.filter(conversation => {
        if (conversation.conversers.includes(this.sender.username) && conversation.conversers.includes(this.recipient.username)) {

          this.identifier = conversation.identifier;
          axios.get(`${API_URL}/messages/${conversation.identifier}`, authorization())
          .then(response => this.messages = response.data)
          .catch(() => this.messages = []);
          return true;
        }

        this.messages = [];
        return true;
      });
    },
    changed() {
      StompClient.send(`/app/chat.message.typing`, {}, JSON.stringify({
        from: this.sender.username,
        to: this.recipient.username,
        conversationId: this.identifier
      }));
    },
    performSubmit(messageContent) {
      if (messageContent.length === 0) {
        return;
      }

      let senderUsername = this.sender.username;
      let recipientUsername = this.recipient.username;
      let conversationId = this.identifier || ObjectID.generate();

      let websocketPayload = JSON.stringify({
        from: senderUsername,
        to: recipientUsername,
        body: messageContent,
        date: new Date().toISOString(),
        conversationId: conversationId
      });

      this.addOrUpdateDiscussion(conversationId, [senderUsername, recipientUsername], ObjectID.generate(), messageContent, new Date().toISOString(),
          this.recipient);

      StompClient.send(`/app/chat.message.private`, {}, websocketPayload);
      this.messages.push({senderName: senderUsername, body: messageContent});

      this.scrollToBottom();
    },
    addOrUpdateDiscussion(id, conversers, lastMessageId, lastMessageText, lastMessageDate, user) {
      if (this.messages.length === 0) {
        this.$store.dispatch('chat/add', {
          identifier: id,
          conversers: conversers,
          lastMessageId: lastMessageId,
          lastMessageText: lastMessageText,
          lastMessageDate: lastMessageDate,
          user: user
        });
      }

      this.$store.dispatch('chat/update', {
        lastMessageId: lastMessageId,
        lastMessageText: lastMessageText,
        lastMessageDate: lastMessageDate,
        user: user
      });
    },
    updatePing(ping, user) {
      this.$store.dispatch('chat/updatePing', {
        user: user,
        ping: ping
      });
    },
    updateActive(active) {
      this.$store.dispatch('chat/updateActive', {
        user: this.recipient,
        active: active
      });
    },
    updateAllActive(active) {
      this.$store.dispatch('chat/updateAllActive', {active: active});
    }
  }
}

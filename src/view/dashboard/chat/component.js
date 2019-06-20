import ChatDialog from "./components/chat_dialog/ChatDialog"
import {API_URL} from "@/util/constants";
import axios from "axios"
import ObjectID from "bson-objectid";
import ConversationService from "@/service/conversation.service";
import WebsocketService from "@/service/ws";
import "perfect-scrollbar/dist/perfect-scrollbar.min";
import * as _ from "underscore";

export default {
  data: () => ({
    sender: '',
    recipient: '',
    messages: [],
    typing: false,
    typingInterval: null,
    conversationId: {}
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

    this.setupRecipientAndSender(to.params.id);
    this.loadChat();

    this.updateAllActive(false);
    this.killInterval();

    next();
  },
  created() {
    this.setupRecipientAndSender(this.$route.params.id)
    .then(() => {
      this.$watch(that => [that.$parent.messages], () => {
        let parentMessages = this.$parent.messages.filter(message => message.senderName === this.recipient.username);
        this.messages = _.union(this.messages, parentMessages)
      }, {immediate: true});
      this.loadChat()
    });

    onfocus = () => this.updatePing(false);

    this.updateAllActive(false);
  },
  methods: {
    setupRecipientAndSender(id) {
      this.sender = JSON.parse(localStorage.getItem('user'));
      return this.$store.dispatch("user/get", {identifier: id})
      .then(response => this.recipient = response.data);
    },
    typingHandler(msgOut) {
      let message = JSON.parse(msgOut.body);

      if (message.from === this.recipient.username) {
        this.typing = true;
      }
    },
    killInterval() {
      if (this.typingInterval) {
        clearInterval(this.typingInterval)
      }
    },
    loadChat() {
      this.$store.dispatch('chat/load', {conversers: [this.recipient.username, this.sender.username], recipient: this.recipient})
      .then(response => {
        this.conversationId = response.identifier;
        this.loadMessages(this.conversationId);

        this.updateActive(true);
        this.updatePing(false);

        axios.get(`${API_URL}/users/me`, {
          headers: {'Authorization': `Basic ${localStorage.getItem('token')}`},
          withCredentials: true
        })
        .then((ownDetails) => {
          this.sender = ownDetails.data;
          this.typingInterval = setInterval(() => this.typing = false, 3000);

          WebsocketService.subscribe('/user/queue/typing', msgOut => this.typingHandler(msgOut));
        })
      });
    },
    loadMessages() {
      ConversationService.fetchMessages({identifier: this.conversationId})
      .then(response => this.messages = response.data)
      .catch(() => this.messages = []);
    },
    changed() {
      WebsocketService.send(`/app/chat.message.typing`, JSON.stringify({
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

      let websocketPayload = JSON.stringify({
        from: senderUsername,
        to: recipientUsername,
        body: messageContent,
        date: new Date().toISOString(),
        conversationId: this.conversationId
      });

      this.$parent.updateLastMessage(ObjectID.generate(), messageContent, new Date().toISOString(), this.conversationId);
      WebsocketService.send(`/app/chat.message.private`, websocketPayload);

      this.messages.push({senderName: senderUsername, body: messageContent});
    },
    updatePing(ping) {
      this.$store.dispatch('chat/updatePing', {
        ping: ping,
        conversationId: this.conversationId
      });
    },
    updateActive(active) {
      this.$store.dispatch('chat/updateActive', {
        active: active,
        conversationId: this.conversationId
      });
    },
    updateAllActive(active) {
      this.$store.dispatch('chat/updateAllActive', {active: active});
    }
  }
}

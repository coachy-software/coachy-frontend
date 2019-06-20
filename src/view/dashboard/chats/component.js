import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import Discussions from "./components/discussions/Discussions"
import ObjectID from "bson-objectid";
import {Howl, Howler} from "howler";
import chatNotificationSound from "@/assets/sounds/chat.mp3";
import WebsocketService from "@/service/ws";

export default {
  data: () => ({
    messages: []
  }),
  components: {
    discussions: Discussions
  },
  created() {
    WebsocketService.subscribe('/user/queue/private', msgOut => {
      let message = JSON.parse(msgOut.body);
      // add or update discussion

      this.messages.push({body: message.body, conversationId: message.conversationId, identifier: message.identifier, senderName: message.from});
      this.updateLastMessage(ObjectID.generate(), message.body, new Date().toISOString(), message.conversationId);

      if (!document.hasFocus()) {
        this.$store.dispatch('chat/updatePing', {ping: true, conversationId: message.conversationId});
        this.playNotificationSound();
      }
    });
  },
  methods: {
    playNotificationSound() {
      const sound = new Howl({src: [chatNotificationSound]});
      Howler.volume(0.3);

      sound.play();
    },
    updateLastMessage(lastMessageId, lastMessageText, lastMessageDate, conversationId) {
      this.$store.dispatch('chat/update', {
        lastMessageId: lastMessageId,
        lastMessageText: lastMessageText,
        lastMessageDate: lastMessageDate,
        conversationId: conversationId
      });
    }
  },
  mounted() {
    let containers = document.querySelectorAll('#discussions .list-group');
    new PerfectScrollbar(containers[0], {wheelSpeed: 0.5});
  }
}

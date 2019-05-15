import moment from "moment";
import {getInitials} from "@/util/user.utils";

export default {
  data: () => ({
    properUser: {}
  }),
  props: ['active', 'ping', 'user', 'lastMessageText', 'lastMessageDate'],
  methods: {
    openConversation(id) {
      this.$router.push(`/dashboard/chats/${id}`);

      let chatDialog = document.getElementById('chat-dialog');
      if (chatDialog) {
        chatDialog.style.right = '0';
      }

      this.$forceUpdate();
    },
    getInitials(user) {
      return getInitials(user);
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD.MM')
    }
  }
}

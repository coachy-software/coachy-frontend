import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatDialog from "./components/chat_dialog/ChatDialog"

export default {
  components: {
    'chat-dialog': ChatDialog
  },
  mounted() {
    let containers = document.querySelectorAll('.main .chat .content');
    new PerfectScrollbar(containers[0], {wheelSpeed: 0.5});
  }
}

import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import Discussions from "./components/discussions/Discussions"
import ChatDialog from "./components/chat_dialog/ChatDialog"

export default {
  components: {
    'chat-dialog': ChatDialog,
    discussions: Discussions
  },
  mounted() {
    let containers = document.querySelectorAll('#discussions .list-group, .main .chat .content');

    new PerfectScrollbar(containers[0], {wheelSpeed: 0.5});
    new PerfectScrollbar(containers[1], {wheelSpeed: 0.5});
  }
}

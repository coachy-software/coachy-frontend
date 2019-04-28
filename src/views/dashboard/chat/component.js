import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatDialog from "./components/chat_dialog/ChatDialog"

export default {
  data: () => ({
    username: '',
    id: '',
    avatar: ''
  }),
  components: {
    'chat-dialog': ChatDialog
  },
  created() {
    let identifier = this.$route.params.id;

    this.$store.dispatch('user/get', {identifier: identifier})
    .then(response => {
      this.username = response.data.username;
      this.id = response.data.identifier;
      this.avatar = response.data.avatar;
    });
  },
  mounted() {
    let containers = document.querySelectorAll('.main .chat .content');
    new PerfectScrollbar(containers[0], {wheelSpeed: 0.5});
  }
}

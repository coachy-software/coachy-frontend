import "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatSidebar from "../chat_sidebar/ChatSidebar"
import {searchUserByUsername} from "@/service/user.service";

export default {
  data: () => ({
    suggestions: [],
    searchQuery: ''
  }),
  components: {
    'chat-sidebar': ChatSidebar
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.$store.dispatch('chat/init', {identifier: user.identifier, username: user.username})
  },
  methods: {
    changed() {
      searchUserByUsername({username: this.searchQuery}).then(result => this.suggestions = result.data);
    }
  }
}

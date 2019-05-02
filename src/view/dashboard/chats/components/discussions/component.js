import "perfect-scrollbar/dist/perfect-scrollbar.min";
import ChatSidebar from "../chat_sidebar/ChatSidebar"

export default {
  data: () => ({
    suggestions: [],
    conversations: [],
    searchQuery: ''
  }),
  components: {
    'chat-sidebar': ChatSidebar
  },
  methods: {
    changed() {
      this.$store.dispatch('user/searchUserByUsername', {username: this.searchQuery})
      .then(response => this.suggestions = response.data);
    }
  }
}

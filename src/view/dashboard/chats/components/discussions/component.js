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
  mounted() {
    // this.$store.dispatch('chat/init', {identifier: JSON.parse(localStorage.getItem('user')).identifier})
  },
  methods: {
    changed() {
      this.$store.dispatch('user/searchUserByUsername', {username: this.searchQuery})
      .then(response => this.suggestions = response.data);
    }
  }
}

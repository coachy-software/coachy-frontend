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
      .then(response => response.data.filter(user => {
        let index = this.suggestions.findIndex(suggestion => suggestion.username === user.username);
        return index === -1;
      }).forEach(user => this.suggestions.push(user)))
    }
  }
}

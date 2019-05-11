export default {
  data: () => ({
    properUser: {}
  }),
  props: ['ping', 'newMessagesCount', 'user', 'lastMessageText', 'lastMessageDate'],
  methods: {
    openConversation(id) {
      this.$router.push(`/dashboard/chats/${id}`);
      this.$forceUpdate();
    }
  }
}

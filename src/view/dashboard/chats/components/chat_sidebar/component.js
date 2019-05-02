export default {
  props: ['ping', 'newMessagesCount', 'user', 'lastMessage'],
  methods: {
    openConversation(id) {
      this.$router.push(`/dashboard/chats/${id}`);
      this.$forceUpdate();
    }
  }
}

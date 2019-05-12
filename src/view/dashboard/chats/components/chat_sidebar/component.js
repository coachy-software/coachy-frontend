import moment from "moment";

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
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD.MM')
    }
  }
}

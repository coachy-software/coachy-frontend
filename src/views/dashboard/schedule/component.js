import {fetchAll} from "@/service/schedule.service";
import moment from "moment";
import store from "@/store";

export default {
  data: () => ({
    isCoach: store.state.user.user.accountType === 'COACH'
  }),
  methods: {
    fetchAll() {
      fetchAll();
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    },
    isEmpty() {
      return this.$store.getters['schedule/isEmpty'];
    }
  },
  filters: {
    moment: (date) => {
      return moment(date, ).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}
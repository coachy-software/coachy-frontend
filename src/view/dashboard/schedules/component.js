import {fetchAll} from "@/service/schedule.service";
import moment from "moment";
import store from "@/store";

export default {
  data: () => ({
    isCoach: store.state.user.user.accountType === 'COACH',
    userIdentifier: store.state.user.user.identifier
  }),
  methods: {
    fetchAll() {
      fetchAll();
    },
    loadSchedules() {
      return this.$store.state.schedule.schedules.filter(schedule => !(this.userIdentifier !== schedule.creator && !schedule.accepted));
    }
  },
  created() {
    this.loadSchedules();
  },
  computed: {
    schedules() {
      return this.loadSchedules();
    },
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    },
    isEmpty() {
      return this.$store.getters['schedule/isEmpty'];
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}

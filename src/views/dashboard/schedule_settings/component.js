import {maxLength, required} from "vuelidate/src/validators";
import {get} from "@/service/schedule.service";
import {notification} from "@/utils/toastr.utils";
import store from "@/store";

export default {
  data: () => ({
    schedule: {},
    name: "",
    note: "",
    active: true,
    days: [
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true}
    ]
  }),
  created() {
    let identifier = this.$route.params.id;
    get({identifier: identifier})
    .then(response => {
      let data = response.data;
      let days = data.days;

      this.schedule = data;
      this.name = data.name;
      this.note = data.note;
      this.active = data.active;
      this.days[0].trainingDay = days[0].trainingDay;
      this.days[1].trainingDay = days[1].trainingDay;
      this.days[2].trainingDay = days[2].trainingDay;
      this.days[3].trainingDay = days[3].trainingDay;
      this.days[4].trainingDay = days[4].trainingDay;
      this.days[5].trainingDay = days[5].trainingDay;
      this.days[6].trainingDay = days[6].trainingDay;
    })
    .catch(() => {
      notification.error(this.$t('schedule.not_found'));
      this.$router.push('/dashboard/schedules');
    });
  },
  methods: {
    updateSchedule() {
      this.schedule.name = this.name;
      this.schedule.note = this.note;
      this.schedule.active = this.active;
      this.schedule.days[0].trainingDay = this.days[0].trainingDay;
      this.schedule.days[1].trainingDay = this.days[1].trainingDay;
      this.schedule.days[2].trainingDay = this.days[2].trainingDay;
      this.schedule.days[3].trainingDay = this.days[3].trainingDay;
      this.schedule.days[4].trainingDay = this.days[4].trainingDay;
      this.schedule.days[5].trainingDay = this.days[5].trainingDay;
      this.schedule.days[6].trainingDay = this.days[6].trainingDay;

      store.dispatch('schedule/update', this.schedule)
      .then(() => {
        notification.success(this.$t('schedule_settings.updated'));
        this.$router.push('/dashboard/schedules/' + this.schedule.identifier);
      });
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  validations: {
    name: {required},
    note: {maxLength: maxLength(1000)}
  }
}
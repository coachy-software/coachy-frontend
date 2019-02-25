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
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true
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
      this.monday = days[0].trainingDay;
      this.tuesday = days[1].trainingDay;
      this.wednesday = days[2].trainingDay;
      this.thursday = days[3].trainingDay;
      this.friday = days[4].trainingDay;
      this.saturday = days[5].trainingDay;
      this.sunday = days[6].trainingDay;
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
      this.schedule.days[0].trainingDay = this.monday;
      this.schedule.days[1].trainingDay = this.tuesday;
      this.schedule.days[2].trainingDay = this.wednesday;
      this.schedule.days[3].trainingDay = this.thursday;
      this.schedule.days[4].trainingDay = this.friday;
      this.schedule.days[5].trainingDay = this.saturday;
      this.schedule.days[6].trainingDay = this.sunday;

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
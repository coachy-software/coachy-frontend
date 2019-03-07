import {maxLength, required} from "vuelidate/src/validators";
import {notification} from "@/utils/toastr.utils";
import store from "@/store";
import scheduleDeleteModal from "./component/delete_modal/ScheduleDeleteModal";

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
    this.$store.dispatch('schedule/get', {identifier: identifier})
    .then(response => {
      let data = response.data;
      let days = data.days;

      this.schedule = data;
      this.name = data.name;
      this.note = data.note;
      this.active = data.active;

      days.forEach((day, index) => {
        this.days[index].trainingDay = day.trainingDay;
      });
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
      this.days.forEach((day, index) => {
        this.schedule.days[index].trainingDay = day.trainingDay;
      });

      store.dispatch('schedule/update', this.schedule)
      .then(() => {
        notification.success(this.$t('schedule_settings.updated'));
        this.$router.push('/dashboard/schedules/' + this.schedule.identifier);
      });
    },
    openDeleteModal() {
      this.$refs.scheduleDeleteModal.openModal();
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
  },
  components: {
    scheduleDeleteModal: scheduleDeleteModal
  }
}
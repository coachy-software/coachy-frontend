import store from "@/store";
import {getErrorMessage} from "@/util/validation.utils";
import {notification} from "@/util/toastr.utils";
import {maxLength, required} from "vuelidate/src/validators";
import {fetchAll} from "@/service/schedule.service";
import axios from "axios";
import {API_URL} from "@/util/constants";

export default {
  data: () => ({
    name: "",
    note: "",
    charge: "",
    active: true,
    days: [
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []}
    ],
    suggestionAttribute: 'username',
    suggestions: []
  }),
  methods: {
    createSchedule() {
      store.dispatch('schedule/create', {
        name: this.name,
        creator: JSON.parse(localStorage.getItem('user')).identifier,
        charge: this.suggestions[0].identifier,
        note: this.note,
        active: this.active,
        days: this.days
      })
      .then(response => {
        notification.success(this.$t('create_schedule.created'));
        fetchAll();

        let locationHeaderValue = response.headers.location;
        let scheduleId = locationHeaderValue.substring(locationHeaderValue.lastIndexOf('/') + 1);

        this.$router.push(`/dashboard/schedules/${scheduleId}`);
      })
      .catch(error => {
        notification.error(getErrorMessage('create_schedule', error))
      });
    },
    changed: function () {
      let that = this;

      this.suggestions = [];
      axios.get(`${API_URL}/users?username=${this.charge}`)
      .then(function (response) {
        response.data.forEach((rawCharge) => that.suggestions.push(rawCharge))
      })
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

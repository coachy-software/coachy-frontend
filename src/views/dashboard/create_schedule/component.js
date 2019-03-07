import store from "@/store";
import {getErrorMessage} from "@/utils/validation.utils";
import {notification} from "@/utils/toastr.utils";
import {maxLength, required} from "vuelidate/src/validators";
import {fetchAll} from "@/service/schedule.service";
import axios from "axios";
import {API_URL} from "@/utils/constants";

export default {
  data: () => ({
    name: "",
    note: "",
    charge: "",
    active: true,
    days: [
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true},
      {trainingDay: true}
    ],
    suggestionAttribute: 'username',
    suggestions: [],
  }),
  methods: {
    createSchedule() {
      this.$store.dispatch('user/get', {username: this.suggestions[0].username})
      .then(response => {
        let result = response.data.content;
        if (result.length === 1 && result[0].username === this.suggestions[0].username) {
          store.dispatch('schedule/create', {
            name: this.name,
            creator: {identifier: JSON.parse(localStorage.getItem('user')).identifier},
            charge: {identifier: response.data.content[0].identifier},
            note: this.note,
            active: this.active,
            days: this.days
          })
          .then(response => {
            notification.success(this.$t('create_schedule.created'));
            fetchAll();
            this.$router.push(`/dashboard/schedules/${response.data.identifier}`);
          })
          .catch(error => {
            notification.error(getErrorMessage('create_schedule', error))
          });

          return;
        }

        notification.error(this.$t('create_schedule.404'));
      })
    },
    changed: function () {
      let that = this;

      this.suggestions = [];
      axios.get(`${API_URL}/users?username=${this.charge}`)
      .then(function (response) {
        response.data.content.forEach((rawCharge) => {
          that.suggestions.push(rawCharge);
        })
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
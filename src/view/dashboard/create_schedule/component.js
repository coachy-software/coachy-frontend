import store from "@/store";
import {getErrorMessage} from "@/util/validation.utils";
import {notification} from "@/util/toastr.utils";
import {maxLength, required} from "vuelidate/src/validators";
import {fetchAll} from "@/service/schedule.service";
import Selectize from 'vue2-selectize'
import {searchUserByUsername} from "@/service/user.service";

export default {
  data: () => ({
    name: "",
    note: "",
    charge: "",
    active: true,
    suggestions: [],
    days: [
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []},
      {trainingDay: true, exercises: []}
    ],
    settings: {}
  }),
  created() {
    this.settings = {
      render: {
        option: (item, escape) => {
          let parsedItem = JSON.parse(item.value);
          return `<div><span class="image"><img src="${escape(parsedItem.avatar)}" alt=""></span><span class="title">${escape(
              parsedItem.displayName || parsedItem.username)}</span></div>`;
        },
      },
      load: (query, callback) => {
        if (!query.length) {
          return callback();
        }
        searchUserByUsername({username: encodeURIComponent(query)}).then(result => this.suggestions = result.data);
      }
    };
  },
  components: {
    Selectize
  },
  methods: {
    createSchedule() {
      store.dispatch('schedule/create', {
        name: this.name,
        creator: JSON.parse(localStorage.getItem('user')).identifier,
        charge: JSON.parse(this.charge).identifier,
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

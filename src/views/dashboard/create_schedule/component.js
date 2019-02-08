import store from "@/store";
import {get} from "@/service/user.service";
import {getErrorMessage} from "@/utils/validation.utils";
import {notification} from "@/utils/toastr.utils";
import {required} from "vuelidate/src/validators";

export default {
  data: () => ({
    name: "",
    note: "",
    charge: "",
    trainingDays: 0,
    active: true,
    showNontrainingDays: false
  }),
  methods: {
    createSchedule() {
      get({username: this.charge})
      .then(response => {
        let result = response.data.content;
        if (result.length === 1 && result[0].username === this.charge) {
          store.dispatch('schedule/create', {
            name: this.name,
            creator: {identifier: JSON.parse(localStorage.getItem('user')).identifier},
            charge: {identifier: response.data.content[0].identifier},
            note: this.note,
            active: this.active
          })
          .then(() => notification.success(this.$t('create_schedule.created')))
          .catch(error => notification.error(getErrorMessage('create_schedule', error)));

          return;
        }

        notification.error(this.$t('create_schedule.404'));
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
    charge: {required}
  }
}
import store from "@/store";
import {get} from "@/service/user.service";
import {getErrorMessage} from "@/utils/validation.utils";
import {notification} from "@/utils/toastr.utils";

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
        if (response.data.content.length === 1) {
          store.dispatch('schedule/create', {
            name: this.name,
            creator: {identifier: JSON.parse(localStorage.getItem('user')).identifier},
            charge: {identifier: response.data.content[0].identifier},
            note: this.note,
            active: this.active
          })
          .then(() => notification.success('Utworzono'))
          .catch(error => notification.error(getErrorMessage('create_schedule', error)));

          return;
        }

        notification.error('Nie ma takiego użytkownika');
      })
    }
  }
}
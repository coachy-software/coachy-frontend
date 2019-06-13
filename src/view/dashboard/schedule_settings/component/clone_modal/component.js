import {SweetModal, SweetModalTab} from "sweet-modal-vue";
import {notification} from "@/util/toastr.utils";
import {getErrorMessage} from "@/util/validation.utils";
import {fetchAll} from "@/service/schedule.service";
import store from "@/store";
import Selectize from 'vue2-selectize'
import {searchUserByUsername} from "@/service/user.service";

export default {
  name: 'schedule-clone-modal',
  props: ['schedule'],
  data: () => ({
    settings: {},
    charge: '',
    suggestions: []
  }),
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab,
    Selectize
  },
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
  methods: {
    openModal() {
      this.$refs.scheduleCloneModal.open();
    },
    closeModal() {
      this.$refs.scheduleCloneModal.close();
    },
    cloneSchedule() {
      store.dispatch('schedule/create', {
        name: this.schedule.name,
        creator: JSON.parse(localStorage.getItem('user')).identifier,
        charge: JSON.parse(this.charge).identifier,
        note: this.schedule.note,
        active: this.schedule.active,
        days: this.schedule.days,
      })
      .then(response => {
        notification.success(this.$t('create_schedule.created'));
        fetchAll();

        let locationHeaderValue = response.headers.location;
        let scheduleId = locationHeaderValue.substring(locationHeaderValue.lastIndexOf('/') + 1);

        this.$router.push(`/dashboard/schedules/${scheduleId}`);
      })
      .catch(error => notification.error(getErrorMessage('create_schedule', error)));
    }
  }
}

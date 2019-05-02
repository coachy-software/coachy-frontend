import {SweetModal, SweetModalTab} from "sweet-modal-vue";
import {notification} from "@/util/toastr.utils";
import {getErrorMessage} from "@/util/validation.utils";

export default {
  name: 'schedule-delete-modal',
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab
  },
  props: ['scheduleName'],
  data: () => ({
    confirmation: ''
  }),
  methods: {
    openModal() {
      this.$refs.scheduleDeleteModal.open();
    },
    closeModal() {
      this.$refs.scheduleDeleteModal.close();
    },
    handleDelete() {
      this.$store.dispatch('schedule/remove', {identifier: this.$parent.schedule.identifier})
      .then(() => {
        notification.success(this.$t('schedule_settings.deleted'));
        this.$router.push('/dashboard/schedules');
      })
      .catch(error => notification.error(getErrorMessage('schedule_settings', error)))
    }
  }
}

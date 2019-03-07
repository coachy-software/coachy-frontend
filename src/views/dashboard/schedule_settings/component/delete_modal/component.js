import {SweetModal, SweetModalTab} from "sweet-modal-vue";
import {notification} from "@/utils/toastr.utils";
import {getErrorMessage} from "@/utils/validation.utils";

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
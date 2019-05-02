import {SweetModal, SweetModalTab} from "sweet-modal-vue";
import {notification} from "@/util/toastr.utils";
import {getErrorMessage} from "@/util/validation.utils";
import store from "@/store"

export default {
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab
  },
  data: () => ({
    confirmation: '',
    username: ''
  }),
  created() {
    this.$parent.currentTab = this.$parent.tabs.delete.name;
    this.username = this.$store.state.user.user.username;
  },
  methods: {
    openModal() {
      this.$refs.deleteTab.open();
    },
    closeModal() {
      this.$refs.deleteTab.close();
    },
    handleDelete() {
      let userId = this.$store.state.user.user.identifier;
      this.$store.dispatch('user/remove', {identifier: userId})
      .then(() => {
        notification.success(this.$t('delete_account_tab.deleted'));
        this.$router.push('/login');
        store.dispatch('user/logout')
      })
      .catch(error => notification.error(getErrorMessage('delete_account_tab', error)))
    }
  }
}

import {SweetModal, SweetModalTab} from "sweet-modal-vue";

export default {
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab
  },
  methods: {
    openModal() {
      this.$refs.deleteModal.open();
    },
    closeModal() {
      this.$refs.deleteModal.close();
    }
  }
}

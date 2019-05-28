import {SweetModal, SweetModalTab} from "sweet-modal-vue";

export default {
  props: ['labelIdentifier'],
  data: () => ({
    identifier: ''
  }),
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab
  },
  methods: {
    openModal(labelIdentifier) {
      this.identifier = labelIdentifier;
      this.$refs.deleteModal.open();
    },
    closeModal() {
      this.$refs.deleteModal.close();
    }
  }
}

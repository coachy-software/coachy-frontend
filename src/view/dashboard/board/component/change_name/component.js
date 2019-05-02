import {required} from "vuelidate/src/validators";
import {SweetModal, SweetModalTab} from "sweet-modal-vue";

export default {
  name: 'change-name-modal',
  data: () => ({
    label: {},
    name: ''
  }),
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab
  },
  methods: {
    openModal(label) {
      this.label = label;
      this.name = label.name;

      this.$refs.changeNameModal.open();
    },
    closeModal() {
      this.$refs.changeNameModal.close();
    }
  },
  validations: {
    name: {required}
  }
}

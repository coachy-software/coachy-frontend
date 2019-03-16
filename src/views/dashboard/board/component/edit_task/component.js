import {SweetModal, SweetModalTab} from "sweet-modal-vue";
import {required} from "vuelidate/src/validators";
import {Slider} from 'vue-color'

export default {
  name: 'edit-task-modal',
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab,
    'color-picker': Slider
  },
  data: () => ({
    task: {},
    name: '',
    color: '',
    labelIndex: null
  }),
  methods: {
    openModal(task, labelIndex) {
      this.task = task;
      this.name = task.name;
      this.color = task.color;
      this.labelIndex = labelIndex;

      this.$refs.taskEditModal.open();
    },
    closeModal() {
      this.$refs.taskEditModal.close();
    }
  },
  validations: {
    name: {required}
  }
}

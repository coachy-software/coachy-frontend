import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
import {required} from "vuelidate/src/validators";
import {Carousel, Slide} from 'vue-carousel';

export default {
  name: 'exercise-show-modal',
  data: () => ({
    exercise: {},
    modalImage: '',
    modalBriefDescription: ''
  }),
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab,
    Carousel,
    Slide
  },
  methods: {
    openModal(exercise) {
      this.exercise = exercise;
      this.$refs.exerciseShowModal.open();
    },
    closeModal() {
      this.$refs.exerciseShowModal.close();
    },
    openImageModal(modalImage) {
      this.modalImage = modalImage;
      this.$refs.exerciseImage.open();
    },
    openBriefModal(modalContent) {
      this.modalBriefDescription = modalContent;
      this.$refs.exerciseBrief.open();
    }
  },
  validations: {
    name: {required},
  }
}
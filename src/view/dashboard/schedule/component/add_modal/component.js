import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
import {required, maxLength} from "vuelidate/src/validators";
import musclesGroups from "@/assets/initials/muscles-groups.json";
import {API_URL} from "@/util/constants";
import axios from "axios";

export default {
  data: () => ({
    name: '',
    sets: 1,
    miniSets: 0,
    reps: 1,
    dayIndex: null,
    template: '',
    customTemplate: false,
    musclesGroups: musclesGroups,
    muscleGroup: musclesGroups[0],
    brief: '',
    suggestionAttribute: 'name',
    exampleImages: [],
    suggestions: [],
  }),
  name: 'exercise-add-modal',
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab
  },
  methods: {
    openModal(dayIndex) {
      this.dayIndex = dayIndex;
      this.$refs.exerciseAddModal.open();
    },
    closeModal() {
      this.$refs.exerciseAddModal.close();
    },
    changed: function () {
      let that = this;

      this.suggestions = [];
      axios.get(`${API_URL}/exercises?name=${this.template}`)
      .then(function (response) {
        response.data.content.forEach((rawTemplate) => {
          that.suggestions.push(rawTemplate);
        })
      })
    }
  },
  validations: {
    name: {required},
    brief: {maxLength: maxLength(1000)}
  }
}

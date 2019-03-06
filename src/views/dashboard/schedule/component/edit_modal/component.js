import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
import {required, maxLength} from "vuelidate/src/validators";
import musclesGroups from "@/assets/mock/muscles-groups.json";
import axios from "axios";
import {API_URL} from "@/utils/constants";

export default {
  data: () => ({
    exercise: {},
    name: '',
    sets: 0,
    miniSets: 0,
    reps: 0,
    template: {
      name: ''
    },
    customTemplate: false,
    musclesGroups: musclesGroups,
    muscleGroup: musclesGroups[0],
    brief: '',
    dayIndex: null,
    suggestionAttribute: 'name',
    suggestions: [],
  }),
  name: 'exercise-edit-modal',
  components: {
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab,
  },
  methods: {
    openModal(dayIndex, exercise) {
      this.dayIndex = dayIndex;
      this.exercise = exercise;
      this.name = exercise.name;
      this.sets = exercise.sets;
      this.miniSets = exercise.miniSets;
      this.reps = exercise.reps;
      this.template = exercise.template;

      this.$refs.exerciseEditModal.open();
    },
    closeModal() {
      this.$refs.exerciseEditModal.close();
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
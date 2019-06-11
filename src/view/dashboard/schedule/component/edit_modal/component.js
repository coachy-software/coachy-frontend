import {SweetModal, SweetModalTab} from 'sweet-modal-vue'
import {required, maxLength} from "vuelidate/src/validators";
import musclesGroups from "@/assets/initials/muscles-groups.json";
import axios from "axios";
import {API_URL} from "@/util/constants";
import {removeExerciseImage, addExerciseImage} from "@/service/exercise.service";

export default {
  props: ['schedule'],
  data: () => ({
    exercise: {},
    exerciseIndex: null,
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
    exampleImages: [],
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
    openModal(dayIndex, exercise, exerciseIndex) {
      this.dayIndex = dayIndex;
      this.exerciseIndex = exerciseIndex;
      this.exercise = exercise;
      this.name = exercise.name;
      this.sets = exercise.sets;
      this.miniSets = exercise.miniSets;
      this.reps = exercise.reps;
      this.template = exercise.template;
      this.exampleImages = exercise.template.exampleImages;

      this.$refs.exerciseEditModal.open();
    },
    closeModal() {
      this.$refs.exerciseEditModal.close();
    },
    removeExerciseImage(imageIndex) {
      removeExerciseImage(this.dayIndex, this.exerciseIndex, imageIndex, this.$refs.exerciseEditModal, this.schedule);
      this.exampleImages = this.schedule.days[this.dayIndex].exercises[this.exerciseIndex].template.exampleImages;
    },
    addExerciseImage() {
      addExerciseImage(this.dayIndex, this.exerciseIndex, this.$refs.exerciseEditModal, this.$refs.exampleImages, this.schedule)
      .then(result => this.exampleImages =  result);
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

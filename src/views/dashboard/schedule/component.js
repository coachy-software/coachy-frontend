import {notification} from "@/utils/toastr.utils";
import draggable from 'vuedraggable'
import store from "@/store";
import exerciseAddModal from "./component/add_modal/ExerciseAddModal";
import exerciseShowModal from "./component/show_modal/ExerciseShowModal";
import exerciseEditModal from "./component/edit_modal/ExerciseEditModal";
import ObjectID from "bson-objectid";
import axios from "axios";
import {API_URL} from "@/utils/constants";
import {obtainImage} from "@/utils/file.utils";
import {multipartHeader} from "@/utils/headers.js";

export default {
  props: {
    viewAs: {
      required: false
    }
  },
  data: () => ({
    schedule: {},
    isCoach: store.state.user.user.accountType === 'COACH',
  }),
  components: {
    draggable,
    exerciseAddModal,
    exerciseShowModal,
    exerciseEditModal
  },
  created() {
    let identifier = this.$route.params.id;
    this.$store.dispatch('schedule/get', {identifier: identifier})
    .then(response => this.schedule = response.data)
    .catch(() => {
      notification.error(this.$t('schedule.not_found'));
      this.$router.push('/dashboard/schedules');
    });
  },
  methods: {
    addExercise(dayIndex) {
      let exampleImages = [];
      let modal = this.$refs.exerciseAddModal;
      let files = modal.$refs.exampleImages.files;


      for (let i = 0; i < files.length; i++) {
        axios.post(`${API_URL}/uploads`, obtainImage(files[i], '/exercises/samples'), multipartHeader())
        .then(response => exampleImages.push(response.data.fileUrl));
      }

      this.schedule.days[dayIndex].exercises.push({
        identifier: ObjectID.generate(),
        name: modal.name,
        sets: modal.sets,
        reps: modal.reps,
        miniSets: modal.miniSets,
        template: modal.customTemplate ? {
          identifier: ObjectID.generate(),
          name: modal.name,
          exampleImages: exampleImages,
          briefDescription: modal.brief,
          muscleGroup: modal.muscleGroup
        } : modal.suggestions[0]
      });

      this.$refs.exerciseAddModal.closeModal();
      store.dispatch('schedule/update', this.schedule);
    },
    removeExercise(dayIndex, exerciseIdentifier) {
      this.schedule.days[dayIndex].exercises = this.schedule.days[dayIndex].exercises.filter(
          exercise => exercise.identifier !== exerciseIdentifier);
      store.dispatch('schedule/update', this.schedule);
      this.$refs.exerciseEditModal.closeModal();
    },
    editExercise(dayIndex) {
      let modal = this.$refs.exerciseEditModal;
      let template;

      if (modal.customTemplate === false) {
        template = modal.suggestions[0];
      } else {
        template = {
          identifier: ObjectID.generate(),
          name: modal.name,
          exampleImages: modal.exampleImages,
          briefDescription: modal.brief,
          muscleGroup: modal.muscleGroup
        }
      }

      this.schedule.days[dayIndex].exercises.filter(
          exercise => exercise === modal.exercise).map(
          exercise => {
            exercise.name = modal.name;
            exercise.sets = modal.sets;
            exercise.reps = modal.reps;
            exercise.miniSets = modal.miniSets;
            exercise.template = template;
          }
      );

      store.dispatch('schedule/update', this.schedule);
      this.$refs.exerciseEditModal.closeModal();
    },
    openExerciseAddModal(dayIndex) {
      this.$refs.exerciseAddModal.openModal(dayIndex);
    },
    openExerciseShowModal(exercise) {
      this.$refs.exerciseShowModal.openModal(exercise);
    },
    openExerciseEditModal(dayIndex, exercise) {
      this.$refs.exerciseEditModal.openModal(dayIndex, exercise);
    },
    viewAsCharge() {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {viewAs: 'charge'})
      });
    },
    scheduleSettings() {
      this.$router.push(this.$route.path + '/settings');
    },
    hasViewAsChargeQuery() {
      return this.$props.viewAs === 'charge';
    },
    collapseNote() {
      document.getElementById('note').classList.toggle('card-collapsed');
    },
    onChange() {
      store.dispatch('schedule/update', this.schedule);
    }
  }
}

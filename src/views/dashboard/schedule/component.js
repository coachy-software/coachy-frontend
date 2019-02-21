import {get} from "@/service/schedule.service";
import {notification} from "@/utils/toastr.utils";
import draggable from 'vuedraggable'
import store from "@/store";
import exerciseAddModal from "./component/ExerciseAddModal";
import exerciseShowModal from "./component/ExerciseShowModal";
import exerciseEditModal from "./component/ExerciseEditModal";
import ObjectID from "bson-objectid";

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
    get({identifier: identifier})
    .then(response => this.schedule = response.data)
    .catch(() => {
      notification.error(this.$t('schedule.not_found'));
      this.$router.push('/dashboard/schedules');
    });
  },
  methods: {
    addExercise(dayIndex) {
      let modal = this.$refs.exerciseAddModal;
      let exercise = {
        identifier: ObjectID.generate(),
        name: modal.name,
        sets: modal.sets,
        reps: modal.reps,
        miniSets: modal.miniSets
      };

      this.schedule.days[dayIndex].exercises.push(exercise);
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

      this.schedule.days[dayIndex].exercises.filter(
          exercise => exercise === modal.exercise).map(
          exercise => {
            exercise.name = modal.name;
            exercise.sets = modal.sets;
            exercise.reps = modal.reps;
            exercise.miniSets = modal.miniSets;
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
      this.$router.push(
          {query: Object.assign({}, this.$route.query, {viewAs: 'charge'})});
    },
    hasViewAsChargeQuery() {
      return this.$props.viewAs === 'charge';
    },
    collapseNote() {
      document.getElementById('note').classList.toggle('card-collapsed');
    }
  }
}

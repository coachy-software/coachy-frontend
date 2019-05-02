import {notification} from "@/util/toastr.utils";
import draggable from 'vuedraggable'
import store from "@/store";
import exerciseAddModal from "./component/add_modal/ExerciseAddModal";
import exerciseShowModal from "./component/show_modal/ExerciseShowModal";
import exerciseEditModal from "./component/edit_modal/ExerciseEditModal";
import {addExercise, editExercise, removeExercise} from "@/service/exercise.service";

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
      addExercise(dayIndex, this.$refs.exerciseAddModal, this.schedule);
    },
    removeExercise(dayIndex, exerciseIdentifier) {
      removeExercise(dayIndex, exerciseIdentifier, this.$refs.exerciseEditModal, this.schedule);
    },
    editExercise(dayIndex) {
      editExercise(dayIndex, this.$refs.exerciseEditModal, this.schedule);
    },
    openExerciseAddModal(dayIndex) {
      this.$refs.exerciseAddModal.openModal(dayIndex);
    },
    openExerciseShowModal(exercise) {
      this.$refs.exerciseShowModal.openModal(exercise);
    },
    openExerciseEditModal(dayIndex, exercise, exerciseIndex) {
      this.$refs.exerciseEditModal.openModal(dayIndex, exercise, exerciseIndex);
    },
    viewAsCharge() {
      this.$router.push({query: Object.assign({}, this.$route.query, {viewAs: 'charge'})});
    },
    pushToSettings() {
      this.$router.push(this.$route.path + '/settings');
    },
    pushToStatistics() {
      this.$router.push(this.$route.path + '/stats');
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

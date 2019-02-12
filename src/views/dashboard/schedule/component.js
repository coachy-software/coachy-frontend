import {get} from "@/service/schedule.service";
import {notification} from "@/utils/toastr.utils";
import draggable from 'vuedraggable'
import store from "@/store";
import exerciseModal from "./component/ExerciseModal";
import ObjectID from "bson-objectid";

export default {
  data: () => ({
    schedule: {},
    isCoach: store.state.user.user.accountType === 'COACH'
  }),
  components: {
    draggable,
    exerciseModal
  },
  mounted() {
    let identifier = this.$route.params.id;
    get({identifier: identifier})
    .then(response => {
          this.schedule = response.data;
        }
    )
    .catch(() => {
      notification.error('Nie znaleziono planu'); // todo
      this.$router.back();
    });
  },
  methods: {
    addExercise(dayIndex) {
      let modal = this.$refs.exerciseModal;
      let exercise = {
        identifier: ObjectID.generate(),
        name: modal.name,
        sets: modal.sets,
        reps: modal.reps,
        miniSets: modal.miniSets
      };

      this.schedule.days[dayIndex].exercises.push(exercise);
      this.$refs.exerciseModal.closeModal();
    },
    removeExercise(dayIndex, exerciseIdentifier) {
      this.schedule.days[dayIndex].exercises = this.schedule.days[dayIndex].exercises.filter(
          exercise => exercise.identifier !== exerciseIdentifier);
    },
    openExerciseModal(dayIndex) {
      this.$refs.exerciseModal.openModal(dayIndex);
    }
  }
}
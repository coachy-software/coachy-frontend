import ObjectID from "bson-objectid";

export default {
  data: () => ({
    name: '',
    weight: '',
    reps: '',
    measurements: [],
    copyFromSchedule: false,
    schedules: [],
    typedSchedule: 'default',
    typedScheduleValue: {},
    typedDay: 'default',
    weightSwitch: false,
    userWeight: ''
  }),
  mounted() {
    this.schedules = JSON.parse(localStorage.getItem('schedules'));
  },
  methods: {
    appendToMeasurements() {
      this.measurements.push({id: ObjectID.generate(), name: this.name, value: this.weight, reps: this.reps})
    },
    removeFromMeasurements(id) {
      this.measurements = this.measurements.filter(measurement => measurement.id !== id);
    },
    onScheduleChange() {
      this.$store.dispatch('schedule/get', {identifier: this.typedSchedule})
      .then(response => this.typedScheduleValue = response.data);
    },
    onDaysChange() {
      this.measurements = [];
      this.typedScheduleValue.days[this.typedDay].exercises.forEach(exercise => {
        this.measurements.push({id: ObjectID.generate(), name: exercise.name, value: 0, reps: exercise.reps})
      });
    }
  }
}

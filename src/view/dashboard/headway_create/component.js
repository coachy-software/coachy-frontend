import {required} from "vuelidate/src/validators";

export default {
  data: () => ({
    ownerId: {},
    neckMeasurement: 0,
    armMeasurement: 0,
    forearmMeasurement: 0,
    wristMeasurement: 0,
    chestMeasurement: 0,
    waistMeasurement: 0,
    thighMeasurement: 0,
    calfMeasurement: 0,
    images: []
  }),
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  validations: {
    neckMeasurement: {required}
  }
}

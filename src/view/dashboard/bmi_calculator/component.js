export default {
  data: () => ({
    weightUnit: 'kg',
    heightUnit: 'cm',
    weight: 0,
    height: 0,
  }),
  computed: {
    bmi() {
      return this.calculateBmi();
    }
  },
  methods: {
    lbsToKg(weight) {
      return Math.round(weight / 2.20462262185);
    },
    inchesToCm(height) {
      return Math.round(height / 0.39370);
    },
    roundToDecimalPlace(value, place) {
      return Math.round(value * Math.pow(10, place)) / Math.pow(10, place);
    },
    calculateBmi() {
      return this.parseToFloat(this.roundToDecimalPlace(this.obtainWeight() / Math.pow(this.obtainHeight() / 100, 2), 2));
    },
    obtainWeight() {
      return this.weightUnit === 'lbs' ? this.lbsToKg(this.weight) : this.weight;
    },
    obtainHeight() {
      return this.heightUnit === 'inch' ? this.inchesToCm(this.height) : this.height;
    },
    parseToFloat(weight) {
      let parsedValue = parseFloat(weight);
      return (Number.isNaN(parsedValue) || !Number.isFinite(parsedValue)) ? 0 : parsedValue;
    }
  }
}

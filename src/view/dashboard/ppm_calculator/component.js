export default {
  data: () => ({
    weightUnit: 'kg',
    heightUnit: 'cm',
    weight: 0,
    height: 0,
    age: 0,
    sex: 'man',
    isSleeping: false,
    sleepingAnimationInterval: null
  }),
  computed: {
    result() {
      let resultValue = this.calculatePpm();
      return (Number.isNaN(resultValue) || !Number.isFinite(resultValue)) ? 0 : Math.round(resultValue);
    }
  },
  methods: {
    lbsToKg(weight) {
      return Math.round(weight / 2.20462262185);
    },
    inchesToCm(height) {
      return Math.round(height / 0.39370);
    },
    obtainWeight() {
      return this.weightUnit === 'lbs' ? this.lbsToKg(this.weight) : this.weight;
    },
    obtainHeight() {
      return this.heightUnit === 'inch' ? this.inchesToCm(this.height) : this.height;
    },
    calculatePpm() {
      let women = 655.1 + (9.563 * this.obtainWeight()) + (1.85 * this.obtainHeight()) - (4.676 * this.age);
      let men = 66.5 + (13.75 * this.obtainWeight()) + (5.003 * this.obtainHeight()) - (6.775 * this.age);

      return this.sex === 'man' ? men : women;
    }
  },
  mounted() {
    this.sleepingAnimationInterval = setInterval(() => this.isSleeping = !this.isSleeping, 1500);
  },
  beforeDestroy() {
    clearInterval(this.sleepingAnimationInterval);
  }
}

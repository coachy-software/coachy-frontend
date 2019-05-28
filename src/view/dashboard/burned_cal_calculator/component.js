import activitiesMock from "@/assets/mock/activities";

export default {
  data: () => ({
    unitSystem: 'metric',
    activityType: {name: 'Spanie', rate: 0.9},
    weight: 0,
    time: 0,
    activities: []
  }),
  mounted() {
    this.activities = activitiesMock;
  },
  computed: {
    result() {
      let resultValue = (this.obtainWeight() * this.activityType.rate) * (this.time / 60);
      return (Number.isNaN(resultValue) || !Number.isFinite(resultValue)) ? 0 : Math.round(resultValue);
    }
  },
  methods: {
    lbsToKg(weight) {
      return Math.round(weight / 2.20462262185);
    },
    obtainWeight() {
      return this.unitSystem === 'imperial' ? this.lbsToKg(this.weight) : this.weight;
    }
  }
}

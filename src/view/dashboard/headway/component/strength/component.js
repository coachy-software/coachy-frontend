import Vue from 'vue';
import VueC3 from "vue-c3";

export default {
  props: ['headway'],
  data: () => ({
    handler: new Vue(),
    columns: [['data1', 0, 100]],
    name: 'N/A'
  }),
  components: {
    VueC3
  },
  mounted() {
    let firstMeasurement = this.headway.measurements[0];
    if (firstMeasurement) {
      this.changeChart(firstMeasurement.name);
    }
  },
  methods: {
    changeChart(name) {
      this.handler.$emit('destroy');
      this.columns = [['data1', 0]];

      let headways = JSON.parse(localStorage.getItem('headways'));

      headways.filter(headway => headway.type === 'STRENGTH').forEach(headway => {
        headway.measurements.filter(measurement => measurement.name === name).forEach(measurement => {
          this.columns[0].push(measurement.value * measurement.reps);
        })
      });

      this.name = name;

      let options = {
        data: {columns: this.columns, type: 'area', names: {'data1': this.name}},
        axis: {x: {padding: {left: 0, right: 0}, show: false}},
        legend: {position: 'inset', padding: 0, inset: {anchor: 'top-left', x: 20, y: 8, step: 10}},
        tooltip: {format: {title: () => '', value: (value) => value + " kg objętości"}},
        padding: {bottom: 0, left: -1, right: -1},
        point: {show: false}
      };

      this.handler.$emit('init', options);
      this.$parent.isLoading = false;
    }
  }
}

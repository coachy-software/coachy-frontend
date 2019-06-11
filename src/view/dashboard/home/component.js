import Vue from 'vue';
import VueC3 from "vue-c3";
import moment from "moment";

export default {
  data: () => ({
    handler: new Vue(),
    columns: [['data1', 0]],
    weightProgress: [],
    isLoading: true,
    summaryElements: [
      {name: "Utworzone plany", icon: "fe fe-clipboard", value: 0},
      {name: "Przeprowadzone konwersacje", icon: "fe fe-message-circle", value: 0},
      {name: "Utworzone diety", icon: "fa fa-utensils", value: 0},
      {name: "Utworzone podsumowania", icon: "fe fe-trending-up", value: 0}
    ]
  }),
  components: {
    VueC3
  },
  created() {
    this.summaryElements[0].value = JSON.parse(localStorage.getItem("schedules")).length;
    this.summaryElements[1].value = JSON.parse(localStorage.getItem("conversations")).length;
    this.summaryElements[2].value = 0;
    this.summaryElements[3].value = JSON.parse(localStorage.getItem("headways")).length;
  },
  mounted() {
    let headways = JSON.parse(localStorage.getItem('headways'));
    headways = headways.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    headways.forEach(headway => headway.measurements.filter(measurement => measurement.name === this.$t('home.weight'))
    .forEach(measurement => {
      this.columns[0].push(measurement.value);
      this.weightProgress.push({value: measurement.value, date: headway.createdAt})
    }));

    let options = {
      data: {columns: this.columns, type: 'area', names: {'data1': this.$t('home.weight')}},
      axis: {x: {padding: {left: 0, right: 0}, show: false}},
      legend: {position: 'inset', padding: 0, inset: {anchor: 'top-left', x: 20, y: 8, step: 10}},
      tooltip: {format: {title: () => '', value: (value) => value + ' kg'}},
      padding: {bottom: 0, left: -1, right: -1},
      point: {show: false}
    };

    this.handler.$emit('init', options);
    this.isLoading = false;
  },
  methods: {
    findWeightMeasurements(to) {
      return this.weightProgress.slice(0, to);
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}

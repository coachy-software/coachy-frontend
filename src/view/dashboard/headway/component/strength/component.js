import Vue from 'vue';
import VueC3 from "vue-c3";

export default {
  props: ['headway'],
  data: () => ({
    handler: new Vue(),
    columns: [['data1', 0, 50, 100, 50, 100, 50, 100, 50, 0]],
    name: 'Purchases'
  }),
  components: {
    VueC3
  },
  mounted() {
    this.$parent.isLoading = true;

    let options = {
      data: {columns: this.columns, type: 'area', names: {'data1': this.name}},
      axis: {x: {padding: {left: 0, right: 0}, show: false}},
      legend: {position: 'inset', padding: 0, inset: {anchor: 'top-left', x: 20, y: 8, step: 10}},
      tooltip: {format: {title: () => ''}},
      padding: {bottom: 0, left: -1, right: -1},
      point: {show: false}
    };

    this.handler.$emit('init', options);
    this.$parent.isLoading = false;
  }
}

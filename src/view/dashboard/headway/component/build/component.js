import {Carousel, Slide} from "vue-carousel";

export default {
  props: ['headway'],
  data: () => ({
    progress: []
  }),
  components: {
    Carousel,
    Slide
  },
  mounted() {
    let rawHeadways = JSON.parse(localStorage.getItem('headways'));

    if (rawHeadways.length > 1) {
      let headways = rawHeadways.filter(headway => headway.identifier !== this.headway.identifier && headway.type === 'BUILD');
      let lastHeadway = headways[0];

      lastHeadway.measurements = lastHeadway.measurements.sort((a, b) => a.name.localeCompare(b.name));

      this.headway.measurements.forEach((measurement, index) => {
        let difference = measurement.value - lastHeadway.measurements[index].value;
        this.progress.push({name: measurement.name, value: difference})
      });
    }
  }
}

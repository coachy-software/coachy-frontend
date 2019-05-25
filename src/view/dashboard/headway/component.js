import HeadwayService from "@/service/headway.service";
import {Carousel, Slide} from 'vue-carousel';
import {SweetModal, SweetModalTab} from "sweet-modal-vue";
import moment from "moment";

export default {
  data: () => ({
    isLoading: true,
    headway: {},
    modalImage: '',
    progress: []
  }),
  components: {
    Carousel,
    Slide,
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab
  },
  created() {
    HeadwayService.fetchOne({identifier: this.$route.params.id})
    .then(response => {
      this.headway = response.data;
      this.headway.measurements = this.headway.measurements.sort((a, b) => a.name.localeCompare(b.name));

      this.calculateProgress();
      this.isLoading = false;
    });
  },
  methods: {
    openImageModal(modalImage) {
      this.modalImage = modalImage;
      this.$refs['image-modal'].open();
    },
    calculateProgress() {
      let rawHeadways = JSON.parse(localStorage.getItem('headways'));

      if (rawHeadways.length > 1) {
        let headways = rawHeadways.filter(headway => headway.identifier !== this.headway.identifier);
        let lastHeadway = headways[0];

        lastHeadway.measurements.sort((a, b) => a.name.localeCompare(b.name));
        this.headway.measurements.forEach((measurement, index) => {
          let difference = measurement.value - lastHeadway.measurements[index].value;
          this.progress.push({name: measurement.name, value: difference})
        });
      }
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}

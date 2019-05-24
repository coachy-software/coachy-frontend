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
      this.isLoading = false;

      this.calculateProgress();
    });
  },
  mounted() {
  },
  methods: {
    openImageModal(modalImage) {
      this.modalImage = modalImage;
      this.$refs['image-modal'].open();
    },
    calculateProgress() {
      let headways = JSON.parse(localStorage.getItem('headways')).filter(headway => headway.identifier !== this.headway.identifier);
      let lastHeadway = headways[0];

      console.log(this.headway.forearmMeasurement)
      console.log(lastHeadway.forearmMeasurement)
      console.log(this.headway.forearmMeasurement - lastHeadway.forearmMeasurement)

      if (lastHeadway) {
        this.progress = {
          neckMeasurement: this.headway.neckMeasurement - lastHeadway.neckMeasurement,
          armMeasurement: this.headway.armMeasurement - lastHeadway.armMeasurement,
          forearmMeasurement: this.headway.forearmMeasurement - lastHeadway.forearmMeasurement,
          wristMeasurement: this.headway.wristMeasurement - lastHeadway.wristMeasurement,
          chestMeasurement: this.headway.chestMeasurement - lastHeadway.chestMeasurement,
          waistMeasurement: this.headway.waistMeasurement - lastHeadway.waistMeasurement,
          thighMeasurement: this.headway.thighMeasurement - lastHeadway.thighMeasurement,
          calfMeasurement: this.headway.calfMeasurement - lastHeadway.calfMeasurement,
        }
      }
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}

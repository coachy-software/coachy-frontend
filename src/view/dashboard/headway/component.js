import HeadwayService from "@/service/headway.service";
import moment from "moment";
import Strength from "./component/strength/StrengthView";
import Build from "./component/build/BuildView";
import {SweetModal, SweetModalTab} from "sweet-modal-vue";

export default {
  data: () => ({
    headway: {},
    isLoading: true,
    modalImage: '',
    isBuildLoading: true
  }),
  components: {
    Build,
    Strength,
    sweetModal: SweetModal,
    sweetModalTab: SweetModalTab
  },
  mounted() {
    HeadwayService.fetchOne({identifier: this.$route.params.id})
    .then(response => {
      this.headway = response.data;
      this.headway.measurements = this.headway.measurements.sort((a, b) => a.name.localeCompare(b.name));

      this.isBuildLoading = false;
      this.isLoading = false;
    });
  },
  methods: {
    openImageModal(modalImage) {
      this.modalImage = modalImage;
      this.$refs['image-modal'].open();
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}

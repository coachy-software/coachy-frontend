import HeadwayService from "@/service/headway.service";
import moment from "moment";
import Strength from "./component/strength/StrengthView";
import Build from "./component/build/BuildView";

export default {
  data: () => ({
    headway: {},
    isLoading: true
  }),
  components: {
    Build,
    Strength
  },
  mounted() {
    HeadwayService.fetchOne({identifier: this.$route.params.id})
    .then(response => {
      this.headway = response.data;
      this.headway.measurements = this.headway.measurements.sort((a, b) => a.name.localeCompare(b.name));
      this.isLoading = false;
    });
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}

import PerfectScrollbar from "perfect-scrollbar/dist/perfect-scrollbar.min";
import Discussions from "./components/discussions/Discussions"

export default {
  components: {
    discussions: Discussions
  },
  mounted() {
    let containers = document.querySelectorAll('#discussions .list-group');
    new PerfectScrollbar(containers[0], {wheelSpeed: 0.5});
  }
}

import {get} from "@/service/schedule.service";
import {notification} from "@/utils/toastr.utils";
import draggable from 'vuedraggable'

export default {
  data: () => ({
    schedule: {}
  }),
  components: {
    draggable
  },
  mounted() {
    let identifier = this.$route.params.id;
    get({identifier: identifier})
    .then(response => {
          this.schedule = response.data;
        }
    )
    .catch(() => {
      notification.error('Nie znaleziono planu'); // todo
      this.$router.back();
    });
  }
}
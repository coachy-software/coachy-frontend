import {notification} from '@/utils/toastr.utils';
import MusclesGroupsChart from './component/muscles_groups/MusclesGroupsChart';

export default {
  data: () => ({
    schedule: {},
    isReady: false
  }),
  components: {
    'muscles-groups-chart': MusclesGroupsChart
  },
  created() {
    let identifier = this.$route.params.id;
    this.$store.dispatch('schedule/get', {identifier: identifier})
    .then(response => {
      this.schedule = response.data;
      this.isReady = true;
    })
    .catch(() => {
      notification.error(this.$t('schedule.not_found'));
      this.$router.push('/dashboard/schedules');
    });
  }
}
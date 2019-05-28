import {notification} from '@/util/toastr.utils';
import MusclesGroupsChart from './component/muscles_groups/MusclesGroupsChart';
import RepsChart from './component/reps/RepsChart';
import SetsChart from './component/sets/SetsChart';

export default {
  data: () => ({
    schedule: {},
    isReady: false,
    isLoading: true
  }),
  components: {
    'muscles-groups-chart': MusclesGroupsChart,
    'reps-chart': RepsChart,
    'sets-chart': SetsChart
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

import moment from "moment";

export default {
  data: () => ({
    headways: [],
    order: 'desc'
  }),
  created() {
    let userIdentifier = JSON.parse(localStorage.getItem('user')).identifier;
    this.$store.dispatch('headway/fetchAll', {identifier: userIdentifier})
    .then(response => this.headways = response);
  },
  computed: {
    sortedHeadways() {
      return this.order === 'desc' ?
          this.headways.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) :
          this.headways.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}

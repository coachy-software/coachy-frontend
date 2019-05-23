import moment from "moment";

export default {
  data: () => ({
    headways: []
  }),
  created() {
    let userIdentifier = JSON.parse(localStorage.getItem('user')).identifier;
    this.$store.dispatch('headway/fetchAll', {identifier: userIdentifier})
    .then(response => this.headways = response);
  },
  filters: {
    moment: (date) => {
      return moment(date).format('DD-MM-YYYY HH:mm:ss');
    }
  }
}

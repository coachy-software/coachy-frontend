export default {
  data: () => ({
    headways: []
  }),
  created() {
    let userIdentifier = JSON.parse(localStorage.getItem('user')).identifier;
    this.$store.dispatch('headway/fetchAll', {identifier: userIdentifier})
    .then(response => this.headway = response);
  }
}

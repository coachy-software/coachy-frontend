export default {
  data: () => ({
    message: ''
  }),
  methods: {
    performSubmit() {
      this.$parent.$parent.performSubmit(this.message);
      this.message = '';
    }
  }

}

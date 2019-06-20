export default {
  data: () => ({
    message: ''
  }),
  computed: {
    isLoading() {
      return this.$store.getters['loader/isLoading'];
    }
  },
  methods: {
    performSubmit() {
      this.$parent.$parent.performSubmit(this.message);
      this.message = '';
    },
    openEmoticonsModal() {
      document.getElementById('emoticons').classList.toggle('active')
    },
    addEmoticon(emoticon) {
      this.message += emoticon;
    },
    changed() {
      this.$parent.$parent.changed();
    }
  }

}

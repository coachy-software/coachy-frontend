export default {
  data: () => ({
    message: ''
  }),
  methods: {
    performSubmit() {
      this.$parent.$parent.performSubmit(this.message);
      this.message = '';
    },
    openEmoticonsDialog() {
      document.getElementById('emoticons').classList.toggle('active')
    },
    addEmoticon(emoticon) {
      this.message += emoticon;
    }
  }

}

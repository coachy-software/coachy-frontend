import Balloon from '../balloon/Balloon'
import TypingArea from "../typing_area/TypingArea"

export default {
  props: ['recipient', 'sender', 'online', 'messages'],
  components: {
    balloon: Balloon,
    'typing_area': TypingArea
  },
  methods: {
    backToChats() {
      document.getElementById('chat-dialog').style.right = '-100%';
    }
  }
}

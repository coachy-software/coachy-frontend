import Balloon from '../balloon/Balloon'
import TypingArea from "../typing_area/TypingArea"
import moment from "moment";

export default {
  props: ['recipient', 'sender', 'messages', 'typing'],
  components: {
    balloon: Balloon,
    'typing_area': TypingArea
  },
  methods: {
    backToChats() {
      document.getElementById('chat-dialog').style.right = '-100%';
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('YYYY.MM.DD HH:ss')
    }
  }
}

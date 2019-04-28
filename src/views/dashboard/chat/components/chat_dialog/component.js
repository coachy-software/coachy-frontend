import Balloon from '../balloon/Balloon'
import TypingArea from "../typing_area/TypingArea"

export default {
  props: ['username', 'online'],
  components: {
    balloon: Balloon,
    'typing_area': TypingArea
  }
}

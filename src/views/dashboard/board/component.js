import Task from './component/task/Task';
import draggable from 'vuedraggable'
import {createBoard, fetch} from "@/service/board.service";

export default {
  data: () => ({
    board: {},
    exists: true
  }),
  name: 'tasks',
  components: {
    Task,
    draggable
  },
  mounted() {
    let boardIdentifier = this.$store.state.user.user.boardIdentifier;

    if (boardIdentifier === null) {
      this.exists = false;
      return;
    }

    fetch({identifier: boardIdentifier}).then(response => {
      this.board = response.data;
      this.exists = true;
    });
  },
  methods: {
    toggleOptions(labelId) {
      document.getElementById(labelId).classList.toggle('show');
      document.getElementById(labelId + ".settings").classList.toggle('show')
    },
    createBoard() {
      createBoard().then((response) => {
        this.board = response.data;
        this.exists = true;
      });
    }
  }
}

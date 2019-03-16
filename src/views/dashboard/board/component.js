import Task from './component/task/Task';
import draggable from 'vuedraggable'
import {createBoard, fetch, addTask, addLabel} from "@/service/board.service";
import ObjectID from "bson-objectid";

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
    },
    addTask(refName, labelIndex) {
      let elementValue = this.$refs[refName][0].value;

      if (elementValue.length < 1) {
        return;
      }

      let task = {
        name: elementValue,
        color: 'black'
      };

      addTask(task, labelIndex, this.board);
      this.$refs[refName][0].value = '';
    },
    addLabel() {
      addLabel(this.board);
    }
  }
}

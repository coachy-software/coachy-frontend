import Task from './component/task/Task';
import draggable from 'vuedraggable'
import axios from "axios";
import {API_URL} from "@/utils/constants";
import {createBoard, fetch} from "@/service/board.service";
import {authorization} from "@/utils/headers";

export default {
  data: () => ({
    board: {},
    exists: false
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
    toggleOptions(labelName) {
      document.getElementById(labelName).classList.toggle('show');
      document.getElementById(labelName + ".settings").classList.toggle('show')
    },
    createBoard() {
      createBoard().then((response) => {
        console.log(response);
        this.board = response.data;
        this.exists = true;
      });
    }
  }
}

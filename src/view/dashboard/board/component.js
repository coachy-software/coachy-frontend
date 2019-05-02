import Task from './component/task/Task';
import EditTaskModal from './component/edit_task/EditTaskModal';
import ChangeNameModal from './component/change_name/ChangeNameModal';
import draggable from 'vuedraggable'
import {
  addLabel,
  addTask,
  createBoard,
  editLabelName,
  editTask,
  fetch,
  removeLabel,
  update
} from '@/service/board.service';
import ObjectID from 'bson-objectid';

export default {
  data: () => ({
    board: {},
    exists: true,
    loading: true
  }),
  name: 'tasks',
  components: {
    Task,
    EditTaskModal,
    ChangeNameModal,
    draggable
  },
  created() {
    let boardIdentifier = this.$store.state.user.user.boardId;

    if (boardIdentifier === null) {
      this.exists = false;
      return;
    }

    fetch({identifier: boardIdentifier}).then(response => {
      this.board = response.data;
      this.exists = true;
      this.loading = false;
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
        this.loading = false;
      });
    },
    addTask(refName, labelIndex) {
      let elementValue = this.$refs[refName][0].value;

      if (elementValue.length < 1) {
        return;
      }

      addTask({identifier: ObjectID.generate(), name: elementValue, color: 'black'}, labelIndex, this.board);
      this.$refs[refName][0].value = '';
    },
    editTask(labelIndex) {
      editTask(this.board, labelIndex, this.$refs.taskEditModal);
    },
    addLabel() {
      addLabel(this.board);
    },
    removeLabel(labelIdentifier) {
      removeLabel(this.board, labelIdentifier);
    },
    editLabelName() {
      editLabelName(this.board, this.$refs.changeNameModal);
    },
    openEditTaskModal(task, labelIndex) {
      this.$refs.taskEditModal.openModal(task, labelIndex);
    },
    openChangeNameModal(label) {
      this.$refs.changeNameModal.openModal(label);
    },
    onChange() {
      update(this.board);
    }
  }
}

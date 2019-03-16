import axios from "axios";
import {API_URL} from "@/utils/constants";
import {authorization} from "@/utils/headers";
import store from "@/store";
import {updateUserBoardIdentifier} from "./user.service";
import ObjectID from "bson-objectid";
import i18n from "@/i18n";
import rawTasks from "@/assets/mock/tasks.json";

export function createBoard() {
  return new Promise(resolve => {
    let user = store.state.user.user;
    let data = {
      name: "Board",
      owner: user,
      labels: [
        {identifier: ObjectID.generate(), name: i18n.t('board.label_1'), tasks: generateExampleTasks()},
        {identifier: ObjectID.generate(), name: i18n.t('board.label_2'), tasks: generateExampleTasks()},
        {identifier: ObjectID.generate(), name: i18n.t('board.label_3'), tasks: generateExampleTasks()}
      ]
    };

    axios.post(`${API_URL}/boards`, data, authorization())
    .then(response => resolve(updateUserAndFetch(response.data.identifier)));
  });
}

function generateExampleTasks() {
  for (let i = 0; i < rawTasks.length; i++) {
    rawTasks[i].identifier = ObjectID.generate();
  }

  return rawTasks;
}

export function fetch(payload) {
  return new Promise(resolve => {
    axios.get(`${API_URL}/boards/${payload.identifier}`, authorization())
    .then(response => resolve(response));
  })
}

export function updateUserAndFetch(identifier) {
  return updateUserBoardIdentifier({boardIdentifier: identifier})
  .then(() => fetch({identifier: identifier}))
}

export function update(board) {
  return axios.patch(`${API_URL}/boards/${board.identifier}`, board, authorization());
}

export function addTask(task, labelIndex, board) {
  board.labels[labelIndex].tasks.push(task);
  update(board);
}

export function addLabel(board) {
  board.labels.push({identifier: ObjectID.generate(), name: 'Nowa kolumna', tasks: []});
  update(board);
}

export function removeLabel(board, labelIdentifier) {
  board.labels = board.labels.filter(label => labelIdentifier !== label.identifier);
  update(board);
}

export function editTask(board, labelIndex, taskInstance) {
  board.labels[labelIndex].tasks.filter(task => taskInstance.task.identifier === task.identifier)
  .map(task => {
    task.name = taskInstance.name;
    task.color = taskInstance.color.hex || taskInstance.task.color;
    task.content = taskInstance.content;
  });

  update(board);
  taskInstance.closeModal();
}

export function editLabelName(board, labelInstance) {
  board.labels.filter(label => label.identifier === labelInstance.label.identifier)
  .map(label => label.name = labelInstance.name);

  update(board);
  labelInstance.closeModal();
}

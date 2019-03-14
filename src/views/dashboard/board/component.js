import Task from './component/task/Task';
import draggable from 'vuedraggable'


export default {
  data: () => ({
    labels: [
      {name: "Do zrobienia", tasks: []},
      {name: "W trakcie", tasks: []},
      {name: "Ukończone", tasks: []}
    ]
  }),
  name: 'tasks',
  components: {
    Task,
    draggable
  }
}

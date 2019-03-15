import Task from './component/task/Task';
import draggable from 'vuedraggable'

export default {
  data: () => ({
    labels: [
      {
        name: "Do zrobienia", tasks: [
          {name: "Test", content: "test content", color: "#2b2b2b"},
          {name: "Test1", content: "test content", color: "#2b2b2b"},
          {name: "Test3", content: "test content", color: "#2b2b2b"}
        ]
      },
      {
        name: "W trakcie", tasks: [
          {name: "XD", content: "test content", color: "#2b2b2b"},
          {name: "XD1", content: "test content", color: "#2b2b2b"},
          {name: "XD3", content: "test content", color: "#2b2b2b"},
          {name: "XD4", content: "test content", color: "#2b2b2b"}
        ]
      },
      {
        name: "Ukończone", tasks: [
          {name: "DDD", content: "test content", color: "#2b2b2b"},
          {name: "DDD1", content: "test content", color: "#2b2b2b"},
          {name: "DDD3", content: "test content", color: "#2b2b2b"}
        ]
      },
      {
        name: "Ukończone", tasks: [
          {name: "DDD", content: "test content", color: "#2b2b2b"},
          {name: "DDD1", content: "test content", color: "#2b2b2b"},
          {name: "DDD3", content: "test content", color: "#2b2b2b"}
        ]
      }
    ]
  }),
  name: 'tasks',
  components: {
    Task,
    draggable
  },
  methods: {
    toggleOptions(labelName) {
      document.getElementById(labelName).classList.toggle('show');
      document.getElementById(labelName + ".settings").classList.toggle('show')
    }
  }
}

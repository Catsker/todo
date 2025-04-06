import {createStore} from 'vuex'

const StorageKey = 'vue-todo-app'

const saveState = (state) => {
  localStorage.setItem(StorageKey, JSON.stringify(state))
}

const loadState = () => {
  const json = localStorage.getItem(StorageKey)
  return json ? JSON.parse(json) : null
}

const localStoragePlugin = (store) => {
  store.subscribe((mutation, state) => {
    saveState(state);
  });
};

export default createStore({
  plugins: [localStoragePlugin],
  state() {
    const savedState = loadState();
    return savedState || {
      tasks: [],
      add_task: '',
      filter: 'all'
    }
  },
  getters: {
    showTasks: (state) => state.tasks,
    showDoneTasks: (state) => {
      const completedCount = state.tasks.reduce((count, task) =>
        task.completed ? count + 1 : count, 0);
      return `${completedCount}/${state.tasks.length}`;
    }
  },
  mutations: {
    ADD_TASK(state, taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText.trim(),
        completed: false,
        subtasks: []
      };
      if (newTask.text) state.tasks.push(newTask);
    },
    ADD_SUBTASK(state, {taskId, subtaskText}) {
      const newSubtask = {
        id: Date.now(),
        text: subtaskText.trim(),
        completed: false,
      };
      const currentTask = state.tasks.find(task => task.id === taskId);
      if (newSubtask.text && currentTask) {
        currentTask.subtasks.push(newSubtask);
      }
      update_tasks_checked_state(state, currentTask)
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    DELETE_SUBTASK(state, { taskId, subtaskId }) {
      const task = state.tasks.find(task => task.id === taskId);
      if (!task?.subtasks) return;

      const index = task.subtasks.findIndex(s => s.id === subtaskId);
      if (index !== -1) {
        task.subtasks.splice(index, 1);
        task.completed = task.subtasks.length === 0
          ? false
          : task.subtasks.every(s => s.completed);
      }
    },
    UPDATE_TASK_CHECKED(state, taskId) {
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        update_subtasks_checked_state(state, task);
      }
    },
    UPDATE_SUBTASK_CHECKED(state, {taskId, subtaskId}) {
      const task = state.tasks.find(task => task.id === taskId);
      if (!task) return;
      const subtask = task.subtasks.find(t => t.id === subtaskId);
      if (subtask) subtask.completed = !subtask.completed;
      update_tasks_checked_state(state, task)
    }
  }
})

const update_subtasks_checked_state = (state, task) => {
  if (Array.isArray(task.subtasks)) {
    task.subtasks.forEach((subtask) => {
      subtask.completed = task.completed;
    });
  }
};

const update_tasks_checked_state = (state, task) => {
  if (!Array.isArray(task.subtasks)) {
    console.log('empty');
    return;
  }
  task.completed = task.subtasks.every(subtask => subtask.completed);
};
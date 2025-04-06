<template>
  <div class="task" v-for="task in filteredTasks" :key="task.id">
    <div class="task__main">
      <input type="checkbox" class="task__main--checkbox--hide" :id="task.id" :checked="task.completed" @change="taskChecked(task.id)">
      <label :for="task.id" class="task__main--checkbox--visible">

      </label>
      <span class="task__main--span">{{ task.text }}</span>
      <button type="button" class="task__main--delete" @click="deleteTask(task.id)">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M9 9L17 17M17 9L9 17M3.66667 1H22.3333C23.8061 1 25 2.19391 25 3.66667V22.3333C25 23.8061 23.8061 25 22.3333 25H3.66667C2.19391 25 1 23.8061 1 22.3333V3.66667C1 2.19391 2.19391 1 3.66667 1Z"
              stroke="#FFCA93" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <sub-tasks :subtasks="task.subtasks" :taskId="task.id"></sub-tasks>
  </div>
</template>

<script>
import SubTasks from "./SubTasks";

export default {
  components: {
    'sub-tasks': SubTasks
  },
  methods: {
    deleteTask(id) {
      this.$store.commit("DELETE_TASK", id)
    },
    taskChecked(taskId) {
      this.$store.commit('UPDATE_TASK_CHECKED', taskId);
    }
  },
  props: {
    tasksToFilter: {
      type: String,
      required: true,
      default: "all"
    }
  },
  computed: {
    filteredTasks() {
      switch (this.tasksToFilter) {
        case "completed":
          return this.$store.getters.showTasks.filter(task => task.completed);
        case "active":
          return this.$store.getters.showTasks.filter(task => !task.completed);
        default:
          return this.$store.getters.showTasks;
      }
    }
  }
}
</script>
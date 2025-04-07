<template>
  <ul class="task__subtasks">
    <li class="task__subtask" v-for="subtask in subtasks" :key="subtask.id">
      <input
          type="checkbox"
          :id="taskId + '_' + subtask.id"
          @change="updateSubtaskChecked(subtask.id)"
          :checked="subtask.completed"
      >
      <label :for="taskId + '_' + subtask.id"></label>
      <span>{{ subtask.text }}</span>
      <button type="button" @click="deleteSubtask(subtask.id)">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 9L17 17M17 9L9 17M3.66667 1H22.3333C23.8061 1 25 2.19391 25 3.66667V22.3333C25 23.8061 23.8061 25 22.3333 25H3.66667C2.19391 25 1 23.8061 1 22.3333V3.66667C1 2.19391 2.19391 1 3.66667 1Z" stroke="#FFDFBE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </li>
  </ul>

  <form class="add-subtask" @submit.prevent="addSubtask">
    <button type="submit">+</button>
    <input
        type="text"
        placeholder="Add a new subtask"
        v-model="newSubtaskText"
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      newSubtaskText: ''
    }
  },
  props: {
    subtasks: {
      type: Array,
      default: () => []
    },
    taskId: {
      type: Number,
      required: true
    }
  },
  methods: {
    addSubtask() {
      if (this.newSubtaskText !== '') {
        this.$store.commit('ADD_SUBTASK', {
          taskId: this.taskId,
          subtaskText: this.newSubtaskText
        });
        this.newSubtaskText = '';
      }
    },
    deleteSubtask(subtaskId) {
      this.$store.commit('DELETE_SUBTASK', {
        taskId: this.taskId,
        subtaskId
      });
    },
    updateSubtaskChecked(subtaskId) {
      this.$store.commit('UPDATE_SUBTASK_CHECKED', {
        taskId: this.taskId,
        subtaskId,
      });
    }
  }
};
</script>

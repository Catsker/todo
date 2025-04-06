<template class="vue-cover">
  <div class="header">to do list</div>
  <div class="body">
    <div class="makeFirstTask" v-if="$store.state.tasks.length === 0">Создайте первую заметку</div>

    <task-list :tasksToFilter="selectedFilter"></task-list>

    <form class="add-main-task" @submit.prevent="addTask">
      <input type="text" class="add-main-task__input" placeholder="Add a new task" v-model="newTaskText">
      <button type="submit" class="add-main-task__button"></button>
    </form>
  </div>

  <div class="footer">
    <footer-progress></footer-progress>
    <footer-display @filter-changed="selectedFilter = $event"></footer-display>
  </div>
</template>

<script>
import FooterProgress from './components/FooterProgress'
import TaskList from './components/TaskList'
import FooterDisplay from './components/FooterDisplay'

export default {
  name: 'App',
  data() {
    return {
      newTaskText: '',
      selectedFilter: 'all',
    }
  },
  components: {
    'footer-progress': FooterProgress,
    'footer-display': FooterDisplay,
    'task-list': TaskList
  },
  methods: {
    addTask() {
      this.$store.commit('ADD_TASK', this.newTaskText);
      this.newTaskText = ''
    }
  }
}
</script>
<template>
  <nav class="footer__display-tasks">
    <input
        class="footer__display-tasks--hide"
        type="radio"
        name="taskToDisplay"
        id="all"
        value="all"
        @change="$emit('filter-changed', 'all')"
        checked>
    <label class="footer__display-tasks--visible" for="all">All</label>
    <input
        class="footer__display-tasks--hide"
        type="radio"
        name="taskToDisplay"
        id="active"
        value="active"
        @change="$emit('filter-changed', 'active')">
    <label class="footer__display-tasks--visible" for="active">Active</label>
    <input
        class="footer__display-tasks--hide"
        type="radio"
        name="taskToDisplay"
        id="completed"
        value="completed"
        @change="$emit('filter-changed', 'completed')">
    <label class="footer__display-tasks--visible" for="completed">Completed</label>
  </nav>
</template>
<script setup lang="ts">
</script>
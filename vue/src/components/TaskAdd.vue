<template>
  <section class="add">
    <button class="add-form" @click="$emit('update:AddTaskFormShow', true)">
      <span><i class="fas fa-plus"></i></span>
      <span>Add Task</span>
    </button>
  </section>
  <!-- {{ $attrs }} -->
  <TaskForm v-bind="$attrs" v-if="taskFormIsShow"></TaskForm>
</template>

<script>
import TaskForm from '../layout/TaskFrom.vue';

export default {
  name: "task-add",
  components: {
    TaskForm
  },
  props: {
    taskFormIsShow: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "update:AddTaskFormShow"
  ]
}
</script>

<style lang="scss" scoped>
</style>
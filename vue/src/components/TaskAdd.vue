<template>
  <section class="add">
    <button class="add-form" @click="$emit('update:AddTaskFormShow', true)">
    <!-- <button class="add-form"> -->
      <span><font-awesome-icon icon="plus" /></span>
      <span>Add Task</span>
    </button>
  </section>
  <!-- update:AddTaskFormShow 事件被中間這層使用，所以不會包在 $attrs 裡，必須要再透過它傳給子層 -->
  <TaskForm v-bind="$attrs" @update:AddTaskFormShow="$emit('update:AddTaskFormShow', $event)"></TaskForm>
</template>

<script>
import TaskForm from '../layout/TaskFrom.vue';

export default {
  name: "task-add",
  components: {
    TaskForm
  },
  emits: [
    "update:AddTaskFormShow"
  ]
}
</script>

<style lang="scss" scoped>
</style>
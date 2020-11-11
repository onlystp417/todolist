<template>
  <div class="task-list">
    <!-- area shows task lists -->
    <TaskForm
      v-for="item in taskList"
      :key="`task-${ item.id }`"
      :id="`task-${ item.id }`"
      :taskData="item"
      v-bind="$attrs"
    ></TaskForm>
  </div>
</template>

<script>
import TaskForm from '../layout/TaskFrom.vue';

export default {
  name: "task-list",
  components: {
    TaskForm
  },
  props: {
    taskList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
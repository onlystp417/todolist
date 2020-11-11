<template>
  <div class="task-list">
    <!-- area shows task lists -->
    <template v-for="(item, index) in taskList" :key="`task-${ index }`">
      <TaskForm
        :id="`task-${ index }`"
        :taskData="item"
        v-bind="$attrs"
      ></TaskForm>
    </template>
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
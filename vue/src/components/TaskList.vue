<template>
  <div class="task-list">
    <!-- area shows task lists -->
    <template v-for="(item, index) in taskList" :key="`task-${ index }`">
      <TaskForm
        :taskFormIsShow="true"
        :taskData="item"
        :isInList="true"
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
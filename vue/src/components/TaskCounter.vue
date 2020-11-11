<template>
  <p class="task-counter"><span>{{ leftTaskCount }}</span> task left</p>
</template>

<script>
export default {
  name: "task-counter",
  props: {
    taskList: Array
  },
  computed: {
    leftTaskCount() {
      return this.taskList.filter(item => item.isComplete === false).length;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
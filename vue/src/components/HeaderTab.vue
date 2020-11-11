<template>
  <header class="body-header">
    <a href="##" class="label-link" :class="{ 'current': tabName === 'my-tasks'}" data-tagname="allTasks" @click="$emit('update:TagName', 'my-tasks')">My Tasks</a>
    <a href="##" class="label-link" :class="{ 'current': tabName === 'in-progress'}" data-tagname="progress" @click="$emit('update:TagName', 'in-progress')">In Progress</a>
    <a href="##" class="label-link" :class="{ 'current': tabName === 'completed'}" data-tagname="completed" @click="$emit('update:TagName', 'completed')">Completed</a>
  </header>
</template>

<script>
export default {
  name: "header-tab",
  props: {
    tabName: String
  },
  emits: ["update:TagName"]
}
</script>

<style lang="scss" scoped>
</style>
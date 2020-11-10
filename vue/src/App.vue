<template>
  <HeaderTab></HeaderTab>
  <main @click.self="closeAddTaskForm(false)">
    <TaskAddForm
      :taskFormIsShow="taskFormIsShow"
      @openAddTaskForm="taskFormIsShow = $event"
      @closeAddTaskForm="taskFormIsShow = $event"
    ></TaskAddForm>
    <TaskList></TaskList>
    <TaskCounter></TaskCounter>
  </main>
</template>

<script>
import HeaderTab from './components/HeaderTab.vue';
import TaskAddForm from './components/TaskAddForm.vue';
import TaskList from './components/TaskList.vue';
import TaskCounter from './components/TaskCounter.vue';

export default {
  name: 'App',
  components: {
    HeaderTab,
    TaskAddForm,
    TaskList,
    TaskCounter
  },
  data() {
    return {
      taskFormIsShow: false,
  },
  methods: {
    openAddTaskForm(isShow) {
      this.taskFormIsShow = isShow;
    },
    closeAddTaskForm(isShow) {
      // console.log(e.currentTarget === "main");
      this.taskFormIsShow = isShow;
    }
  }
}
</script>

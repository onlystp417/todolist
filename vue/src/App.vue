<template>
  <HeaderTab></HeaderTab>
  <main>
    <TaskAddForm></TaskAddForm>
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
  }
}
</script>

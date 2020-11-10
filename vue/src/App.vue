<template>
  <HeaderTab></HeaderTab>
  <main @click.self="taskFormIsShow = false">
    <pre>{{ taskData }}</pre>
    <TaskAddForm
      :taskFormIsShow="taskFormIsShow"
      :isEditable="isEditable"
      :taskData="taskData"
      :taskList="taskList"
      @openAddTaskForm="taskFormIsShow = $event"
      @closeAddTaskForm="taskFormIsShow = $event"
      @update:Complete="taskData.isComplete = $event"
      @update:Name="taskData.name = $event"
      @update:date="taskData.date = $event"
      @update:time="taskData.time = $event"
      @update:IsStar="taskData.isStar = $event"
      @update:IsEdit="taskData.isEdit = $event"
      @update:FileName="taskData.fileName = $event"
      @update:FileTime="taskData.fileTime = $event"
      @update:Comment="taskData.comment = $event"

      @update:AddTask="addTask"
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
      isEditable: false,
      taskData: {
        id: null,
        isComplete: false,
        name: null,
        date: null,
        time: null,
        isStar: false,
        fileName: null,
        fileTime: null,
        comment: null
      },
      taskList: JSON.parse(localStorage.getItem('taskList')) || []
    }
  },
  methods: {
    addTask(taskList) {
      console.log(taskList);
      localStorage.setItem('taskList', JSON.stringify(taskList));
    }
  }
}
</script>

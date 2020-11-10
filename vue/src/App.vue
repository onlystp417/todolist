<template>
  <HeaderTab></HeaderTab>
  <main @click.self="taskFormIsShow = false">
    <pre>{{ taskData }}</pre>
    <TaskAdd
      :taskFormIsShow="taskFormIsShow"
      :isEditable="isEditable"
      :taskData="taskData"
      :taskList="taskList"
      @update:AddTaskFormShow="taskFormIsShow = $event"

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
    ></TaskAdd>
    <TaskList></TaskList>
    <TaskCounter></TaskCounter>
  </main>
</template>

<script>
import HeaderTab from './components/HeaderTab.vue';
import TaskAdd from './components/TaskAdd.vue';
import TaskList from './components/TaskList.vue';
import TaskCounter from './components/TaskCounter.vue';

export default {
  name: 'App',
  components: {
    HeaderTab,
    TaskAdd,
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
      localStorage.setItem('taskList', JSON.stringify(taskList));
    }
  }
}
</script>

<template>
  <HeaderTab></HeaderTab>
  <main @click.self="taskFormIsShow = false">
    <TaskAdd
      :taskFormIsShow="taskFormIsShow"
      :isInList="isInList"
      :taskData="taskData"
      :taskList="taskList"
      @update:AddTaskFormShow="taskFormIsShow = $event"

      @update:Complete="taskData.isComplete = $event.value"
      @update:Name="taskData.name = $event.value"
      @update:date="taskData.date = $event.value"
      @update:time="taskData.time = $event.value"
      @update:IsStar="taskData.isStar = $event.value"
      @update:FileName="taskData.fileName = $event.value"
      @update:FileTime="taskData.fileTime = $event.value"
      @update:Comment="taskData.comment = $event.value"

      @update:AddTask="addTask"
    ></TaskAdd>
    <TaskList
      :taskList="taskList"
      :taskFormIsShow="true"
      :isInList="true"

      @update:Complete="modifyTaskListData('isComplete', { value:$event.value, id:$event.id })"
      @update:Name="modifyTaskListData('name', { value:$event.value, id:$event.id })"
      @update:date="modifyTaskListData('date', { value:$event.value, id:$event.id })"
      @update:time="modifyTaskListData('time', { value:$event.value, id:$event.id })"
      @update:IsStar="modifyTaskListData('isStar', { value:$event.value, id:$event.id })"
      @update:IsEdit="modifyTaskListData('isEdit', { value:$event.value, id:$event.id })"
      @update:FileName="modifyTaskListData('fileName', { value:$event.value, id:$event.id })"
      @update:FileTime="modifyTaskListData('fileTime', { value:$event.value, id:$event.id })"
      @update:Comment="modifyTaskListData('comment', { value:$event.value, id:$event.id })"
    ></TaskList>
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
      isInList: false,
      taskData: {
        id: 1,
        isComplete: false,
        name: null,
        date: null,
        time: null,
        isStar: false,
        fileName: null,
        fileTime: null,
        comment: null,
        isEdit: true
      },
      taskList: JSON.parse(localStorage.getItem('taskList')) || []
    }
  },
  methods: {
    addTask(taskList) {
      localStorage.setItem('taskList', JSON.stringify(taskList));
      this.taskFormIsShow = false;
      this.taskList = JSON.parse(localStorage.getItem('taskList'));
      this.taskDataInitial();
    },
    taskDataInitial() {
      this.taskData = {
        id: 1,
        isComplete: false,
        name: null,
        date: null,
        time: null,
        isStar: false,
        fileName: null,
        fileTime: null,
        comment: null
      }
    },
    modifyTaskListData(key, { value, id }) {
      console.log(key, value, id);
      this.taskList.find(item => item.id === id)[key] = value;
    }
  }
}
</script>

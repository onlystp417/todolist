<template>
  <HeaderTab
    :tabName="tabName"
    @update:TagName="this.tabName = $event"
  ></HeaderTab>
  <main @click.self="taskFormIsShow = false">
    <TaskAdd
      :taskFormIsShow="taskFormIsShow"
      :isInList="isInList"
      :taskData="taskData"
      :taskList="filterdTaskList"
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
      :taskList="filterdTaskList"
      :taskFormIsShow="true"
      :isInList="true"

      @update:Complete="crossOutCompletedTask('isComplete', { value:$event.value, id:$event.id })"
      @update:Name="modifyTaskListData('name', { value:$event.value, id:$event.id })"
      @update:date="modifyTaskListData('date', { value:$event.value, id:$event.id })"
      @update:time="modifyTaskListData('time', { value:$event.value, id:$event.id })"
      @update:IsStar="hoistTask('isStar', { value:$event.value, id:$event.id })"
      @update:IsEdit="switchEditTask('isEdit', { value:$event.value, id:$event.id })"
      @update:FileName="modifyTaskListData('fileName', { value:$event.value, id:$event.id })"
      @update:FileTime="modifyTaskListData('fileTime', { value:$event.value, id:$event.id })"
      @update:Comment="modifyTaskListData('comment', { value:$event.value, id:$event.id })"

      @update:SaveTask="saveTask"
    ></TaskList>
    <TaskCounter :taskList="filterdTaskList"></TaskCounter>
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
      tabName: "my-tasks",
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
        isEdit: false
      },
      taskList: JSON.parse(localStorage.getItem('taskList')) || [],
      newTaskList: JSON.parse(localStorage.getItem('taskList')) || []
    }
  },
  methods: {
    addTask(taskList) {
      localStorage.setItem('taskList', JSON.stringify(this.sortTaskList(taskList)));
      // localStorage.setItem('taskList', JSON.stringify(taskList));
      this.taskFormIsShow = false;
      this.taskList = JSON.parse(localStorage.getItem('taskList')); // 更新資料
      this.taskDataInitial();
    },
    saveTask() {
      this.newTaskList.forEach(item => item.isEdit = false);
      localStorage.setItem('taskList', JSON.stringify(this.newTaskList));
      this.taskList = JSON.parse(localStorage.getItem('taskList')); // 更新資料
    },
    modifyTaskListData(key, { value, id }) {
      this.newTaskList.find(item => item.id === id)[key] = value;
    },
    switchEditTask(key, { value, id }) {
      if (value) {
        this.taskList.forEach(item => item[key] = false);
        this.taskList.find(item => item.id === id)[key] = value;
        localStorage.setItem('taskList', JSON.stringify(this.taskList));
        this.taskList = JSON.parse(localStorage.getItem('taskList')); // 更新資料
      } else {
        this.taskList.find(item => item.id === id)[key] = value; 
        localStorage.setItem('taskList', JSON.stringify(this.taskList));
        this.taskList = JSON.parse(localStorage.getItem('taskList')); // 更新資料
      }
    },
    crossOutCompletedTask(key, { value, id }) {
      if (value) {
        const completedTaskIndex = this.newTaskList.findIndex(item => item.id === id);
        const completedTask = this.newTaskList.splice(completedTaskIndex, 1);
        completedTask[0][key] = value;
        this.newTaskList.push(completedTask[0]);
  
        localStorage.setItem('taskList', JSON.stringify(this.newTaskList)); // 儲存資料
        this.taskList = JSON.parse(localStorage.getItem('taskList')); // 更新資料
      } else {
        this.newTaskList.find(item => item.id === id)[key] = value;

        localStorage.setItem('taskList', JSON.stringify(this.sortTaskList(this.newTaskList))); // 儲存資料
        this.taskList = JSON.parse(localStorage.getItem('taskList')); // 更新資料
      }
    },
    hoistTask(key, { value, id }) {
      if (value) {
        const starTaskIndex = this.newTaskList.findIndex(item => item.id === id);
        const starTask = this.newTaskList.splice(starTaskIndex, 1);
        starTask[0][key] = value;
        this.newTaskList.unshift(starTask[0]);
  
        localStorage.setItem('taskList', JSON.stringify(this.newTaskList)); // 儲存資料
        this.taskList = JSON.parse(localStorage.getItem('taskList')); // 更新資料
      } else {
        this.newTaskList.find(item => item.id === id)[key] = value;

        localStorage.setItem('taskList', JSON.stringify(this.sortTaskList(this.newTaskList))); // 儲存資料
        this.taskList = JSON.parse(localStorage.getItem('taskList')); // 更新資料
      }
    },
    sortTaskList(taskArray) {
      return taskArray.sort((a, b) => {
        const STAR_SCORE = 1;
        const NORMAL_SCORE = 0;
        const COMPLETE_SCORE = -2;
        const aScore = (a.isStar ? STAR_SCORE : NORMAL_SCORE) + (a.isComplete ? COMPLETE_SCORE : NORMAL_SCORE);
        const bScore = (b.isStar ? STAR_SCORE : NORMAL_SCORE) + (b.isComplete ? COMPLETE_SCORE : NORMAL_SCORE);
        return aScore > bScore ? -1 : 1;
      })
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
  },
  computed: {
    filterdTaskList() {
      if (this.tabName === 'my-tasks') return this.taskList;
      if (this.tabName === 'in-progress') return this.taskList.filter(item => item.isComplete === false);
      if (this.tabName === 'completed') return this.taskList.filter(item => item.isComplete === true);
    }
  }
}
</script>

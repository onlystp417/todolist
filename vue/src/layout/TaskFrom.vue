<template>
  <form class="task" v-if="taskFormIsShow">
    <header class="task-title major-task-bg">
      <h2>
        <span class="checkbox">
          <!-- check-is-complete 的 id 值要用 js 賦予新的值  -->
          <input
            class="check-is-complete task-data"
            :id="`check-${taskData.id}`"
            type="checkbox"
            :checked="taskData.isComplete"
            @change="$emit('update:Complete', { value: $event.target.checked, id: taskData.id })"
          >
          <label class="check-custom" :for="`check-${taskData.id}`"><i class="fas fa-check"></i></label>
        </span>
        <input
          onkeypress="if (event.keyCode == 13) {return false;}"
          class="task-name task-data" type="text"
          placeholder="Type Something Here..."
          :class="{'cross-off': taskData.isComplete}"
          :value="taskData.name"
          @input="$emit('update:Name', { value: $event.target.value, id: taskData.id })"
        >
      </h2>
      <div class="task-mark">
        <!-- FontAwsone 5 用前端框架會自動轉成 svg，元，  原生用 CSS 寫 fontfamily 則會不起作用，所以還是要寫在 template 裡面 -->
        <input
          class="task-mark-star task-data"
          :id="`isStar-${taskData.id}`"
          type="checkbox"
          :checked="taskData.isStar"
          @change="$emit('update:IsStar', { value: $event.target.checked, id: taskData.id })"
        >
        <label class="task-mark-star-custom task-mark-star-custom-off" v-if="!taskData.isStar" :for="`isStar-${taskData.id}`"><i class="far fa-star"></i></label>
        <label class="task-mark-star-custom task-mark-star-custom-on" v-if="taskData.isStar" :for="`isStar-${taskData.id}`"><i class="fas fa-star"></i></label>
        <input
          class="task-mark-pen"
          :id="`isEdit-${taskData.id}`"
          type="checkbox"
          :checked="taskData.isEdit"
          @change="$emit('update:IsEdit', { value: $event.target.checked, id: taskData.id })"
        >
        <label class="task-mark-pen-custom" :class="{ 'is-edit': taskData.isEdit }" v-if="isInList" :for="`isEdit-${taskData.id}`"><i class="fas fa-pen"></i></label>
        <button type="submit" class="task-mark-delete" v-if="isInList" :id="`delete-${ taskData.id }`" @click="$emit('update:DeleteTask', { id: taskData.id })"><i class="far fa-trash-alt"></i></button>
      </div>
      <div class="task-tag" v-if="isInList">
        <span class="tag-item tag-time" v-if="taskData.date">
          <i class="far fa-calendar-alt"></i><time>{{ taskData.date }}</time>
        </span>
        <span class="tag-item tag-file" v-if="taskData.fileName">
          <i class="far fa-file"></i>
        </span>
        <span class="tag-item tag-comment" v-if="taskData.comment">
          <i class="far fa-comment-dots"></i>
        </span>
      </div>
    </header>
    <section class="task-form" v-if="!isInList || taskData.isEdit">
      <div class="task-form-edit">
        <section class="task-form-item task-form-deadline">
          <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
          <div class="task-deadline">
            <input
              class="task-data"
              type="date"
              :value="taskData.date"
              @input="$emit('update:date', { value: $event.target.value, id: taskData.id })"
            >
            <input
              class="task-data"
              type="time"
              :value="taskData.time"
              @input="$emit('update:time', { value: $event.target.value, id: taskData.id })"
            >
          </div>
        </section>
        <section class="task-form-item task-form-file">
          <h3><i class="far fa-file"></i>File</h3>
          <div class="file-caption">
            <h4></h4>
            <time></time>
          </div>
          <label class="file-add-button" for="add-file"><i class="fas fa-plus"></i></label>
          <input
            class="task-data file-input"
            type="file"
            id="add-file"
            @input="parseFileData($event.target.files[0])"
          >
        </section>
        <section class="task-form-item task-form-comment">
          <h3><i class="far fa-comment-dots"></i>Comment</h3>
          <textarea
            class="task-data"
            cols="30"
            rows="3"
            placeholder="Type your meno here..."
            :value="taskData.comment"
            @input="$emit('update:Comment', { value: $event.target.value, id: taskData.id })"
          ></textarea>
        </section>
      </div>
      <div class="task-btn" v-if="!isInList">
        <button class="task-btn-basic task-btn-cancel" @click.prevent="$emit('update:AddTaskFormShow', false)"><i class="fas fa-times"></i>Cancel</button>
        <button class="task-btn-basic task-btn-add" v-if="!isInList" @click.prevent="addTask"><i class="fas fa-plus"></i>Add Task</button>
      </div>
      <div class="task-btn" v-if="isInList">
        <button class="task-btn-basic task-btn-cancel" @click.prevent="$emit('update:IsEdit', { value: false, id: taskData.id })"><i class="fas fa-times"></i>Cancel</button>
        <button class="task-btn-basic task-btn-add" v-if="isInList" @click.prevent="$emit('update:SaveTask', { id: taskData.id })"><i class="fas fa-plus"></i>Save Task</button>
      </div>
    </section>
  </form>
</template>

<script>
export default {
  name: "task-form",
  inheritAttrs: false,
  props: {
    taskFormIsShow: {
      type: Boolean,
      default: false
    },
    taskList: {
      type: Array,
      default: () => []
    },
    isInList: {
      type: Boolean,
      default: false
    },
    taskData: {
      type: Object,
      required: true
    }
  },
  emits: [
    "update:AddTaskFormShow",
    "update:Complete",
    "update:Name",
    "update:IsStar",
    "update:IsEdit",
    "update:date",
    "update:time",
    "update:FileName",
    "update:FileTime",
    "update:Comment",
    "update:AddTask",
    "update:SaveTask",
    "update:DeleteTask"
  ],
  methods: {
    parseFileData(file) {
      this.$emit("update:FileName", file.name);
      this.$emit("update:FileTime", this.timeFormat(new Date(file.lastModified)));
    },
    timeFormat(timeStamp) {
      const year = timeStamp.getFullYear();
      const month = timeStamp.getMonth() + 1;
      const day = timeStamp.getDate();

      return `${ year }.${ month }.${ day }`;
    },
    addTask() {
      const newTask = {
        ...this.taskData,
        id: Date.now()
      };
      const taskList = [
        newTask,
        ...this.taskList
      ];
      this.$emit('update:AddTask', taskList);
    }
  }
}
</script>

<style>

</style>
<template>
  <section class="add">
    <button class="add-form">
      <span><i class="fas fa-plus"></i></span>
      <span>Add Task</span>
    </button>
  </section>
  <form class="task d-none">
    <header class="task-title major-task-bg">
      <h2>
        <span class="checkbox">
          <!-- check-is-complete 的 id 值要用 js 賦予新的值  -->
          <input class="check-is-complete task-data" id="check" type="checkbox" data-keyname="isComplete">
          <label class="check-custom" for="check"><i class="fas fa-check"></i></label>
        </span>
        <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data" type="text" placeholder="Type Something Here..." data-keyname="name">
      </h2>
      <div class="task-mark">
        <input class="task-mark-star task-data" id="isStar" type="checkbox" data-keyname="isStar">
        <label class="task-mark-star-custom" for="isStar"></label>
        <input class="task-mark-pen" id="isEdit" type="checkbox" data-keyname="isEdit">
        <label class="task-mark-pen-custom" for="isEdit"></label>
      </div>
    </header>
    <section class="task-form">
      <div class="task-form-edit">
        <section class="task-form-item task-form-deadline">
          <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
          <div class="task-deadline">
            <input class="task-data" type="date" data-keyname="date">
            <input class="task-data" type="time" data-keyname="time">
          </div>
        </section>
        <section class="task-form-item task-form-file">
          <h3><i class="far fa-file"></i>File</h3>
          <div class="file-caption">
            <h4></h4>
            <time></time>
          </div>
          <label class="file-add-button" for="add-file"><i class="fas fa-plus"></i></label>
          <input class="task-data file-input" type="file" data-keyname="file" id="add-file">
        </section>
        <section class="task-form-item task-form-comment">
          <h3><i class="far fa-comment-dots"></i>Comment</h3>
          <textarea class="task-data" data-keyname="comment" cols="30" rows="3" placeholder="Type your meno here..."></textarea>
        </section>
      </div>
      <div class="task-btn">
        <button class="task-btn-basic task-btn-cancel"><i class="fas fa-times"></i>Cancel</button>
        <button class="task-btn-basic task-btn-add"><i class="fas fa-plus"></i>Add Task</button>
      </div>
    </section>
  </form>
</template>

<script>
export default {
  name: "task-add-form"
}
</script>

<style lang="scss" scoped>
</style>
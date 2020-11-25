function buildTaskForm(item, index) {
  return `
  <form class="task" id="task-item-${index + 1}">
    ${ buildTaskHeader(item, index) }
    ${ buildTaskBody(item, index) }
  </form>
  `
}

function buildTaskHeader(item, index) {
  return `
  <header class="task-title ${item.isStar ? 'is-star' : ''}">
    ${ buildTaskTitle(item, index) }
    ${ buildTaskMark(item, index) }
    ${ buildTaskTag(item, index) }
  </header>
  `
}

function buildTaskTitle(item, index) {
  return `
  <h2>
    <span class="checkbox">
      <input class="check-is-complete task-data" id="check-${ index + 1 }" type="checkbox" ${ item.isComplete ? 'checked' : '' } data-keyname="isComplete" >
      <label class="check-custom" for="check-${ index + 1 }"><i class="fas fa-check"></i></label>
    </span>
    <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data ${ item.isComplete ? 'cross-off' : '' }" type="text" placeholder="Type Something Here..." value="${ item.name }" data-keyname="name">
  </h2>
  `
}

function buildTaskMark(item, index) {
  return `
  <div class="task-mark">
    <input class="task-mark-star task-data" id="isStar-${ index + 1 }" type="checkbox" data-keyname="isStar" ${ item.isStar ? 'checked' : '' } data-keyname="isStar">
    <label class="task-mark-star-custom" for="isStar-${ index + 1 }"></label>
    <input class="task-mark-pen" id="isEdit-${ index + 1 }" type="checkbox" data-keyname="isEdit">
    <label class="task-mark-pen-custom" for="isEdit-${ index + 1 }" id="edit-pen-${index + 1}"></label>
    <button type="submit" class="task-mark-delete" id="delete-${ index + 1 }"><i class="far fa-trash-alt"></i></button>
  </div>
  `
}

function buildTaskTag(item) {
  return `
  <div class="task-tag">
    <span class="tag-item tag-time ${ item.date ? '' : 'd-none' }">
      <i class="far fa-calendar-alt"></i><time>${item.date}</time>
    </span>
    <span class="tag-item tag-file ${ item.file ? '' : 'd-none' }">
      <i class="far fa-file"></i>
    </span>
    <span class="tag-item tag-comment ${ item.comment ? '' : 'd-none' }">
      <i class="far fa-comment-dots"></i>
    </span>
  </div>
  `
}

function buildTaskBody(item, index) {
  return `
  <section class="task-form ${item.isEdit ? '' : 'd-none'}">
    <div class="task-form-edit">
      <section class="task-form-item task-form-deadline">
        <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
        <div action="">
          <input class="task-data" type="date" value="${ item.date }" data-keyname="date">
          <input class="task-data" type="time" value="${ item.time }" data-keyname="time">
        </div>
      </section>
      <section class="task-form-item task-form-file">
        <h3><i class="far fa-file"></i>File</h3>
        <div class="file-caption">
          <h4>${ item.file }</h4>
          <time>${ item.fileTime }</time>
        </div>
        <label class="file-add-button" for="add-file-${ index + 1 }"><i class="fas fa-plus"></i></label>
        <input class="task-data file-input" type="file" data-keyname="file" id="add-file-${ index + 1 }">
        <div class="file-add">
      </section>
      <section class="task-form-item task-form-comment">
        <h3><i class="far fa-comment-dots"></i>Comment</h3>
        <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">${ item.comment }</textarea>
      </section>
    </div>
    ${ buildTaskButton(index) }
  </section>
  `
}

function buildTaskButton(index) {
  return `
  <div class="task-btn">
    <button class="task-btn-basic task-btn-cancel" id="save-button-${index + 1}"><i class="fas fa-times"></i>Cancel</button>
    <button class="task-btn-basic task-btn-save" id="cancel-button-${index + 1}"><i class="fas fa-plus"></i>Save</button>
  </div>
  `
}

// module.exports = { buildTaskForm  };
export { buildTaskForm };

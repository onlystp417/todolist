// 取得 DOM 節點
const main = document.querySelector('main');
const taskFormButton = document.querySelector('.add-form');
const task = document.querySelector('.task');
const taskAddButton = document.querySelector('.task-btn-add');
const taskCancelButton = document.querySelector('.task-btn-cancel');
const tags = document.querySelectorAll('.label-link');

// 綁定事件
taskFormButton.addEventListener('click', showTaskCard);
taskCancelButton.addEventListener('click', cancelAddTask);
main.addEventListener('click', hideTaskCard);
tags.forEach(tag => tag.addEventListener('click', switchTag))

const taskListArray = JSON.parse(localStorage.getItem('taskList')) || [];

// 將資料存進 localStorage
function storeData() {
  localStorage.setItem('taskList', JSON.stringify(taskListArray));
}

renderTaskList();

// 將所有任務渲染在畫面上
function renderTaskList() {
  const taskList = document.querySelector('.tasks-list');
  let taskHTML = '';

  sortTaskListArray();

  taskListArray.forEach((item, index) => {
    taskHTML += `
      <form class="task" id="task-item-${index + 1}">
        <header class="task-title ${item.isStar ? 'is-star' : ''}">
          <h2>
            <span class="checkbox">
              <input class="check-is-complete task-data" id="check-${ index + 1 }" type="checkbox" ${ item.isComplete ? 'checked' : '' } data-keyname="isComplete" >
              <label class="check-custom" for="check-${ index + 1 }"><i class="fas fa-check"></i></label>
            </span>
            <input class="task-name task-data ${ item.isComplete ? 'cross-off' : '' }" type="text" placeholder="Type Something Here..." value="${ item.name }" data-keyname="name">
          </h2>
          <div class="task-mark">
            <input class="task-mark-star task-data" id="isStar-${ index + 1 }" type="checkbox" data-keyname="isStar" ${ item.isStar ? 'checked' : '' } data-keyname="isStar">
            <label class="task-mark-star-custom" for="isStar-${ index + 1 }"></label>
            <input class="task-mark-pen" id="isEdit-${ index + 1 }" type="checkbox" data-keyname="isEdit">
            <label class="task-mark-pen-custom" for="isEdit-${ index + 1 }" id="edit-pen-${index + 1}"></label>
          </div>
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
        </header>
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
              <input class="task-data" type="file" data-keyname="file" value="${ item.file }" name="" id="">
              <div class="file-add">
                <div class="file-caption">
                  <h4>${ item.file }</h4>
                  <time>upload yesterday</time>
                </div>
                <button class="file-add-button" type="menu"><i class="fas fa-plus"></i></button>
              </div>
            </section>
            <section class="task-form-item task-form-comment">
              <h3><i class="far fa-comment-dots"></i>Comment</h3>
              <textarea class="task-data" name="" id="" cols="30" rows="10" placeholder="Type your meno here..." data-keyname="comment">${ item.comment }</textarea>
            </section>
          </div>
          <div class="task-btn">
            <button class="task-btn-basic task-btn-cancel" id="save-button-${index + 1}"><i class="fas fa-times"></i>Cancel</button>
            <button class="task-btn-basic task-btn-save" id="cancel-button-${index + 1}"><i class="fas fa-plus"></i>Save</button>
          </div>
        </section>
      </form>
    `;
  })
  taskList.innerHTML = taskHTML;

  addEvent4TaskStatus();
}

// 切換頁籤功能
let tagName = 'my-tasks'; // 初始的 tag 為 My Tasks
function switchTag(e) {
  tagName = e.currentTarget.dataset.tagname;
  tags.forEach(item => item.classList.remove('current'));
  e.currentTarget.classList.add('current');
}

// 排序 taskList
function sortTaskListArray() {
  taskListArray.sort((a, b) => {
    const starScore = 1;
    const normalScore = 0;
    const completeScore = -2;
    const aScore = (a.isStar ? starScore : normalScore) + (a.isComplete ? completeScore : normalScore);
    const bScore = (b.isStar ? starScore : normalScore) + (b.isComplete ? completeScore : normalScore);
    return aScore > bScore ? -1 : 1;
  })
}

// 為 task 狀態按鈕綁定事件
function addEvent4TaskStatus() {
  // 綁定 isCompete inputs
  const isCompletInputs = document.querySelectorAll('.tasks-list .check-is-complete');
  isCompletInputs.forEach(input => input.addEventListener('change', checkComplete));

  // 綁定 isStar inputs
  const isStarInputs = document.querySelectorAll('.tasks-list .task-mark-star');
  isStarInputs.forEach(input => input.addEventListener('change', markStar));

  // 綁定 isEdit input
  const isEditInputs = document.querySelectorAll('.tasks-list .task-mark-pen');
  isEditInputs.forEach(input => input.addEventListener('change', editTask));

  const saveChangeButtons = document.querySelectorAll('.tasks-list .task-btn-save');
  saveChangeButtons.forEach(button => button.addEventListener('click', saveChange));

  const cancelEditButtons = document.querySelectorAll('.tasks-list .task-btn-cancel');
  cancelEditButtons.forEach(button => button.addEventListener('click', cancelEdit));
}

// 叫出新增任務的窗口
function showTaskCard(e) {
  // 防止事件冒泡
  e.stopPropagation();
  // 顯示編輯任務區域
  task.classList.remove('d-none');

  taskAddButton.addEventListener('click', taskSave);
}

// 新增任務並保存資料
function taskSave(event) {
  event.preventDefault();
  const inputs = Array.from(task.querySelectorAll('.task-data'));
  const newTask = {};
  inputs.map(input => {
    newTask[input.dataset.keyname] = (input.value !== 'on')
      ? input.value : input.checked
      ? true : false;
  });
  newTask["fileTime"] = !newTask["file"] ? "" : Date.now();
  taskListArray.unshift(newTask);
  storeData();
  task.classList.add('d-none');

  resetInputs();
  renderTaskList();
}

// 收起新增任務的窗口
function hideTaskCard(e) {
  if (!e.target.contains(main)) return;
  task.classList.add('d-none');
  resetInputs();
}

// 取消新增任務
function cancelAddTask(e) {
  e.preventDefault();
  task.classList.add('d-none');
  resetInputs();
}

// reset（清空） input 的值
function resetInputs() {
  const inputs = Array.from(task.querySelectorAll('.task-data'));
  inputs.map(input => {
    if(input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  })
}

// 勾選為已完成
function checkComplete(e) {
  // 取得任務的 index
  const index = getTaskIndex(e.currentTarget.id);
  taskListArray[index].isComplete = !taskListArray[index].isComplete;
  renderTaskList();
};

// 打開已存在任務的編輯區域
function editTask(e){
  e.preventDefault();
  document.querySelectorAll('.task').forEach(item => {
    if(item.classList.contains('is-edit')) item.classList.remove('is-edit');
  });
  const index = getTaskIndex(e.currentTarget.id);

  const currentTask = document.querySelector(`#task-item-${index + 1}`);
  currentTask.classList.add('is-edit');
  // const editArea = document.querySelector(`#task-item-${index + 1} .task-form`);
  // const currentPen = document.querySelector(`#task-item-${index + 1} .task-mark-pen-custom`);
  // currentPen.classList.toggle('is-edit');
  // editArea.classList.toggle('d-none');
};

// 取消編輯已存在任務
function cancelEdit(e) {
  e.preventDefault();
  const index = getTaskIndex(e.currentTarget.id);
  const currentTask = document.querySelector(`#task-item-${index + 1}`);
  currentTask.classList.remove('is-edit');
};

// 儲存已存在任務的變更
function saveChange(e) {
  e.preventDefault();
  console.log(e.currentTarget);
  const index = getTaskIndex(e.currentTarget.id);
  const inputs = Array.from(document.querySelectorAll(`#task-item-${index + 1} .task-data`));

  inputs.map(input => {
    taskListArray[index][input.dataset.keyname] = (input.value !== 'on')
      ? input.value : input.checked
      ? true : false;
  });

  storeData();
  renderTaskList();
}

// 標記為重要
function markStar(e) {
  const index = getTaskIndex(e.currentTarget.id);
  taskListArray[index].isStar = !taskListArray[index].isStar;

  storeData();
  renderTaskList();
};

// 取出任務的序列位置
function getTaskIndex(target) {
  const taskIndex = target.match(/\d/);
  return (Number(taskIndex[0]) - 1);
}
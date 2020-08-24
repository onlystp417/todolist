import { buildTaskForm } from './module/BuildElement.js';

// 取得 DOM 節點
function initEvent() {
  // 防止 form 點擊自己會關閉
  document.querySelector('.task').addEventListener('click', e => e.stopPropagation());
  // 防止點擊任務列表區域導致 form 關閉
  document.querySelector('.tasks-list').addEventListener('click', e => e.stopPropagation());
  document.querySelector('.add-form').addEventListener('click', showAddTaskForm);
  document.querySelector('.task-btn-cancel').addEventListener('click', cacelAddTask);
  document.querySelector('main').addEventListener('click', cacelAddTask);
  document.querySelectorAll('.label-link').forEach(tag => tag.addEventListener('click', switchTag));
}

// 初始化原始資料
const taskListArray = JSON.parse(localStorage.getItem('taskList')) || [];
// 初始化要渲染的資料
let tagName = 'my-tasks'; // 初始的 tag 為 My Tasks
let taskListShow = sortTaskListArray(filterTaskList(tagName));

// 將所有任務渲染在畫面上
function renderUI() {
  taskListShow = sortTaskListArray(filterTaskList(tagName));
  const taskList = document.querySelector('.tasks-list');
  const taskListHTML = taskListShow.map((item, index) => buildTaskForm(item, index));
  
  taskList.innerHTML = taskListHTML.join('');
  
  addEvent4TaskStatus();
  showLeftTasks();
}

// 將資料存進 localStorage
function storeData() {
  localStorage.setItem('taskList', JSON.stringify(taskListArray));
}

// 切換頁籤功能
function switchTag(e) {
  const tags = document.querySelectorAll('.label-link')

  tagName = e.currentTarget.dataset.tagname;

  tags.forEach(item => item.classList.remove('current'));
  e.currentTarget.classList.add('current');

  renderUI();
}

// 過濾出當前頁籤的資料
function filterTaskList(type) {
  let items = [];
  switch(type) {
    case 'progress':
      items = taskListArray.filter(item => item.isComplete === false);
      break;
    case 'completed':
      items = taskListArray.filter(item => item.isComplete === true);
      break;
    default: 
      items = taskListArray;
      break;
  }

  return items;
}

// 排序 taskList
function sortTaskListArray(taskArray) {
  return taskArray.sort((a, b) => {
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
  isEditInputs.forEach(input => input.addEventListener('change', openTaskEditForm));

  const saveChangeButtons = document.querySelectorAll('.tasks-list .task-btn-save');
  saveChangeButtons.forEach(button => button.addEventListener('click', saveEditChange));

  const cancelEditButtons = document.querySelectorAll('.tasks-list .task-btn-cancel');
  cancelEditButtons.forEach(button => button.addEventListener('click', cancelEdit));

  const deleteTaskButton = document.querySelectorAll('.task-mark-delete');
  deleteTaskButton.forEach(button => button.addEventListener('click', deleteTask));
}

// 叫出新增任務的窗口
function showAddTaskForm(e) {
  const taskAddingForm = document.querySelector('.task');
  const taskAddButton = document.querySelector('.task-btn-add');

  e.stopPropagation();

  taskAddingForm.classList.remove('d-none');

  taskAddButton.addEventListener('click', taskAdd);

  showFileChange(taskAddingForm);
}

// 新增任務並保存資料
function taskAdd(event) {
  event.stopPropagation();
  event.preventDefault();

  const taskAddingForm = document.querySelector('.task');
  const inputs = Array.from(taskAddingForm.querySelectorAll('.task-data'));
  let newTask = {};

  newTask = getFormData(inputs, newTask)

  console.log(newTask);

  taskListArray.unshift(newTask);
  storeData();
  taskAddingForm.classList.add('d-none');

  resetInputs();
  renderUI();
}

// 時間戳格式化
function timeFormat(timeStamp) {
  const year = timeStamp.getFullYear();
  const month = timeStamp.getMonth() + 1;
  const day = timeStamp.getDate();

  return `${ year }.${ month }.${ day }`;
}

// 收起新增任務的窗口
function cacelAddTask(e) {
  const taskAddingForm = document.querySelector('.task');

  e.preventDefault();
  e.stopPropagation();

  taskAddingForm.classList.add('d-none');
  resetInputs();
}

// reset（清空） input 的值
function resetInputs() {
  const taskAddingForm = document.querySelector('.task');
  taskAddingForm.reset();
  
  // 把檔案標題與時間清空
  const fileName = taskAddingForm.querySelector('.file-caption > h4');
  const fileTime = taskAddingForm.querySelector('.file-caption > time');
  fileName.textContent = '';
  fileTime.textContent = '';
}

// 勾選為已完成
function checkComplete(e) {
  // 取得任務的 index
  const index = ID2Index(e.currentTarget.id);
  const indexTaskList = originDataIndex(index);

  taskListArray[indexTaskList].isComplete = !taskListArray[indexTaskList].isComplete;
  
  storeData();
  renderUI();
};

// 打開已存在任務的編輯區域
function openTaskEditForm(e){
  e.preventDefault();
  document.querySelectorAll('.task').forEach(item => {
    if(item.classList.contains('is-edit')) item.classList.remove('is-edit');
  });
  const index = ID2Index(e.currentTarget.id);

  const currentTask = document.querySelector(`#task-item-${index + 1}`);
  currentTask.classList.add('is-edit');
  
  showFileChange(currentTask);
};

function removeFileChange(e) {
  const index = ID2Index(e.currentTarget.id);
  const indexTaskList = originDataIndex(index);
  
  const taskItem = document.querySelector(`#task-item-${ index + 1 }`);

  const fileName = taskItem.querySelector('.file-caption > h4');
  const fileTime = taskItem.querySelector('.file-caption > time');

  fileName.textContent = taskListArray[indexTaskList].file;
  fileTime.textContent = taskListArray[indexTaskList].fileTime;
}

// 上傳檔案即時顯示檔案名稱與修改日期
function showFileChange(taskCard) {
  const fileName = taskCard.querySelector('.file-caption > h4');
  const fileTime = taskCard.querySelector('.file-caption > time');
  const fileInput = taskCard.querySelector('.file-input');

  fileInput.addEventListener('change', (e) => {
    fileName.textContent = e.currentTarget.files[0].name;
    fileTime.textContent = timeFormat(new Date(Date.now()));
  })
}

// 取消編輯已存在任務
function cancelEdit(e) {
  e.preventDefault();
  const index = ID2Index(e.currentTarget.id);
  const currentTask = document.querySelector(`#task-item-${index + 1}`);
  currentTask.classList.remove('is-edit');

  removeFileChange(e);
};

// 儲存已存在任務的變更
function saveEditChange(e) {
  e.preventDefault();

  const index = ID2Index(e.currentTarget.id);
  const inputs = Array.from(document.querySelectorAll(`#task-item-${index + 1} .task-data`));

  const newTask = getFormData(inputs, taskListArray[index]);

  storeData();
  renderUI();
}

function getFormData(form, dataStore) {
  form.map(input => {
    if (input.type === 'checkbox') {
      dataStore[input.dataset.keyname] = input.checked ? true : false;
      console.log(dataStore[input.dataset.keyname]);
    } else if (input.type === 'file') {
      dataStore[input.dataset.keyname] = input.files[0] ? input.files[0].name : '';
      dataStore["fileTime"] = input.files[0] ? timeFormat(new Date(Date.now())) : "";
      console.log(dataStore[input.dataset.keyname]);
    } else {
      dataStore[input.dataset.keyname] = input.value;
      console.log(dataStore[input.dataset.keyname]);
    }
  });

  return dataStore;
}

// 標記為重要
function markStar(e) {
  const index = ID2Index(e.currentTarget.id);
  const indexTaskList = taskListArray.indexOf(taskListShow[index]);

  taskListArray[indexTaskList].isStar = !taskListArray[indexTaskList].isStar;

  storeData();
  renderUI();
};

// 取出任務的序列位置
function ID2Index(target) {
  const taskIndex = target.match(/\d/);
  return (Number(taskIndex[0]) - 1);
}

// 顯示未完成任務的數量
function showLeftTasks() {
  const taskCounter = document.querySelector('.task-counter > span');
  let leftTaskAmount = 0;

  taskListArray.map(item => {
    leftTaskAmount += item.isComplete === false ? 1 : 0;
  });

  taskCounter.textContent = leftTaskAmount;
}

// 刪除任務
function deleteTask(e) {
  e.preventDefault();

  const index = ID2Index(e.currentTarget.id);
  const indexTaskList = originDataIndex(index);

  taskListArray.splice(indexTaskList, 1);

  storeData();
  renderUI();
}

function originDataIndex(index) {
  const targetItem = taskListShow[index];
  return taskListArray.indexOf(targetItem);
}

initEvent();
renderUI();

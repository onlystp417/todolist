// 拆 module 參考 https://github.com/dwatow/web-file-api

import { buildTaskForm } from './BuildElement.js';

// 初始化原始資料
const taskListArray = JSON.parse(localStorage.getItem('taskList')) || [];
// 初始化要渲染的資料
let tagName = 'my-tasks'; // 初始的 tag 為 My Tasks
let taskListShow = [];

initEvent();
renderUI();

// 取得 DOM 節點
function initEvent() {
  // 防止 form 點擊自己會關閉
  $('.task').click( e => e.stopPropagation());
  // 防止點擊任務列表區域導致 form 關閉
  $('.tasks-list').click( e => e.stopPropagation());
  $('.add-form').click( showAddTaskForm );
  $('.task-btn-add').click( taskAdd );
  $('.task-btn-cancel').click( cacelAddTask );
  $('main').click( cacelAddTask );
  document.querySelectorAll('.label-link')
    .forEach(tag => tag.addEventListener('click', switchTag));
}

// 將所有任務渲染在畫面上
function renderUI() {
  taskListShow = sortTaskList(filterTaskList(tagName));

  const taskListHTML = taskListShow.map((item, index) => buildTaskForm(item, index));
  const taskList = $('.tasks-list').html(taskListHTML.join(''));
  
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
function sortTaskList(taskArray) {
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
  $('.tasks-list .check-is-complete').each((index, element) => $(element).change( checkComplete ));

  // 綁定 isStar inputs
  $('.tasks-list .task-mark-star').each((index, element) => $(element).change( markStar ));

  // 綁定 isEdit input
  $('.tasks-list .task-mark-pen').each((index, element) => $(element).change( openTaskEditForm ));

  $('.tasks-list .task-btn-save').each((index, element) => $(element).click( saveEditChange ));

  $('.tasks-list .task-btn-cancel').each((index, element) => $(element).click( cancelEdit ));

  $('.task-mark-delete').each((index, element) => $(element).click( deleteTask ))
}

// 叫出新增任務的窗口
function showAddTaskForm(e) {
  e.stopPropagation();

  $('.task-add-form').show();
  $('.task-add-form .file-input').change( showFileChange );
}

// 新增任務
function taskAdd(e) {
  e.stopPropagation();
  e.preventDefault();

  const newTask = getFormData(Array.from($(e.target).closest('.task').find('.task-data')), {})

  taskListArray.unshift(newTask);
  storeData();
  $('.task-add-form').hide();

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
  e.preventDefault();
  e.stopPropagation();

  $('.task-add-form').hide();

  resetInputs();
}

// reset（清空） input 的值
function resetInputs() {
  $('.task').trigger('reset');
  
  // 把檔案標題與時間清空
  $('.task .file-caption > h4').text('');
  $('.task .file-caption > time').text('');
}

// 勾選為已完成
function checkComplete(e) {
  // 取得任務的 index
  const index = ID2Index(e.currentTarget.id);
  const indexTaskList = UIIndex2DataIndex(index);

  taskListArray[indexTaskList].isComplete = !taskListArray[indexTaskList].isComplete;
  
  storeData();
  renderUI();
};

// 打開已存在任務的編輯區域
function openTaskEditForm(e){
  e.preventDefault();
  $('.task').each((index, element) => {
    if($(element).hasClass('is-edit')) $(element).removeClass('is-edit');
  });
  const index = ID2Index(e.currentTarget.id);

  $(`#task-item-${index + 1}`).addClass('is-edit');
  
  $(`#task-item-${index + 1}`).change( showFileChange )
};

function removeFileChange(e) {
  const index = ID2Index(e.currentTarget.id);
  const indexTaskList = UIIndex2DataIndex(index);

  const fileName = $(`#task-item-${ index + 1 }`).children('.file-caption > h4').text( taskListArray[indexTaskList].file) ;
  const fileTime = $(`#task-item-${ index + 1 }`).children('.file-caption > time').text( taskListArray[indexTaskList].fileTime );
}

// 上傳檔案即時顯示檔案名稱與修改日期
function showFileChange(e) {
  if (!e.target.files) return;
    $(e.target).siblings('.file-caption').children('.file-caption > h4').text(e.target.files[0].name);
    $(e.target).siblings('.file-caption').children('.file-caption > time').text(timeFormat(new Date(Date.now())));
}

// 取消編輯已存在任務
function cancelEdit(e) {
  e.preventDefault();
  const index = ID2Index(e.currentTarget.id);
  const currentTask = $(`#task-item-${index + 1}`).removeClass('is-edit');

  removeFileChange(e);
  renderUI();
};

// 儲存已存在任務的變更
function saveEditChange(e) {
  e.preventDefault();

  const index = ID2Index(e.currentTarget.id);
  
  const inputs = Array.from($(`#task-item-${index + 1}`).find('.task-data'));

  const newTask = getFormData(inputs, taskListArray[index]);

  storeData();
  renderUI();
}

function getFormData(form, dataStore) {
  form.map(input => {
    if (input.type === 'checkbox') {
      dataStore[input.dataset.keyname] = input.checked ? true : false;
    } else if (input.type === 'file') {
      dataStore[input.dataset.keyname] = input.files[0] ? input.files[0].name : '';
      dataStore["fileTime"] = input.files[0] ? timeFormat(new Date(Date.now())) : "";
    } else {
      dataStore[input.dataset.keyname] = input.value;
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
  let leftTaskAmount = 0;
  
  taskListArray.map(item => {
    leftTaskAmount += item.isComplete === false ? 1 : 0;
  });
  
  $('.task-counter > span').text( leftTaskAmount );
}

// 刪除任務
function deleteTask(e) {
  e.preventDefault();

  const index = ID2Index(e.currentTarget.id);
  const indexTaskList = UIIndex2DataIndex(index);

  taskListArray.splice(indexTaskList, 1);

  storeData();
  renderUI();
}

function UIIndex2DataIndex(index) {
  const targetItem = taskListShow[index];
  return taskListArray.indexOf(targetItem);
}



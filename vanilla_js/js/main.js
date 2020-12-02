// 拆 module 參考 https://github.com/dwatow/web-file-api
import { taskUIRender, leftTasksUIRender } from './module/UI/taskUIRender.js';
import { initTabEvent } from './module/data/tabOperator.js';
import taskOperator from './module/data/taskOperator.js';


// 初始化原始資料
// 初始化要渲染的資料
const taskListArray = JSON.parse(localStorage.getItem('taskList')) || [];

initEvent(taskListArray);

// 取得 DOM 節點
function initEvent(taskListArray) {
  // 防止 form 點擊自己會關閉
  document.querySelector('.task')
    .addEventListener('click', event => event.stopPropagation());
  // 防止點擊任務列表區域導致 form 關閉
  document.querySelector('.tasks-list')
    .addEventListener('click', event => event.stopPropagation());
  document.querySelector('.add-form')
    .addEventListener('click', event => taskOperator.showTaskAddForm(event, taskListArray));
  document.querySelector('.task-btn-cancel')
    .addEventListener('click', taskOperator.cancelTaskAdd);
  document.querySelector('main')
    .addEventListener('click', taskOperator.cancelTaskAdd);
  // document.querySelectorAll('.label-link')
  //   .forEach(tag => tag.addEventListener('click', event => tabOperator.setTab(event, taskListArray)));
  initTabEvent(taskListArray);

  // enter page render UI
  taskUIRender(taskListArray);
  leftTasksUIRender(taskListArray);
}

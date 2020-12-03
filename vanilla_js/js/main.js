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
  taskOperator.initTaskEvent(taskListArray);
  initTabEvent(taskListArray);

  // enter page render UI
  taskUIRender(taskListArray);
  leftTasksUIRender(taskListArray);
}

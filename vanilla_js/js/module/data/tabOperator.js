import { taskUIRender } from '../UI/taskUIRender.js';


function Tab_Operator() {
  this.tabName = 'my-tasks';
  this.setTab = function(event, taskListArray) {
    const tabs = document.querySelectorAll('.label-link');
    tabs.forEach(item => item.classList.remove('current'));
    event.currentTarget.classList.add('current');

    this.tabName = event.currentTarget.dataset.tabname;
    taskUIRender(taskListArray);
  }
  this.getTab = function() {
    return this.tabName;
  }
}

export function initTabEvent(taskListArray) {
  document.querySelectorAll('.label-link')
  .forEach(tag => tag.addEventListener('click', event => 
  tabOperator.setTab(event, taskListArray)));
}

// var 會變成全域變數，然後因為沒有賦值，所以它會去參考同一個命名的記憶體
var tabOperator;
if (tabOperator == null) tabOperator = new Tab_Operator();

export default tabOperator;
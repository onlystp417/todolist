import tabOperator from './tabOperator.js';

function taskListShowProcess (taskListArray) {
  const tabName = tabOperator.getTab();
  return sortTaskList(filterTaskList(tabName, taskListArray));
}

function sortTaskList (taskArray) {
  return taskArray.sort((a, b) => {
    const starScore = 1;
    const normalScore = 0;
    const completeScore = -2;
    const aScore = (a.isStar ? starScore : normalScore) + (a.isComplete ? completeScore : normalScore);
    const bScore = (b.isStar ? starScore : normalScore) + (b.isComplete ? completeScore : normalScore);
    return aScore > bScore ? -1 : 1;
  })
}

function filterTaskList(tabName, taskListArray) {
  let items = [];
  switch(tabName) {
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

export default taskListShowProcess;
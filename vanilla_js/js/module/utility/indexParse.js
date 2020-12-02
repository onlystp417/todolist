import taskListShowProcessor from '../data/taskListShowProcessor.js';

function UIIndex2DataIndex (index, taskListArray) {
  const taskListShow = taskListShowProcessor(taskListArray);
  const targetItem = taskListShow[index];
  return taskListArray.indexOf(targetItem);
}

function ID2Index (target)  {
  const taskIndex = target.match(/\d/);
  return (Number(taskIndex[0]) - 1);
}

export { UIIndex2DataIndex, ID2Index };
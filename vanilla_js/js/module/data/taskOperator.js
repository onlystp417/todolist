import { taskUIRender, leftTasksUIRender } from '../UI/taskUIRender.js';
import fileUIRender from '../UI/fileUIRender.js';
import { UIIndex2DataIndex, ID2Index } from '../utility/indexParse.js';
import timeFormat from '../utility/timeFormat.js';

function showTaskAddForm (event, taskListArray) {
  const taskAddingForm = document.querySelector('.task');
  const taskAddButton = document.querySelector('.task-btn-add');

  event.stopPropagation();
  taskAddingForm.classList.remove('d-none');
  fileUIRender.showFileChange(taskAddingForm);

  taskAddButton.onclick = event => submitTaskAdd(event, taskListArray);
}

function cancelTaskAdd (event) {
  const taskAddingForm = document.querySelector('.task');

  event.preventDefault();
  event.stopPropagation();

  taskAddingForm.classList.add('d-none');
  resetInputs();
}

function submitTaskAdd(event, taskListArray) {
  event.stopPropagation();
  event.preventDefault();

  const taskAddingForm = document.querySelector('.task');
  const inputs = Array.from(taskAddingForm.querySelectorAll('.task-data'));
  let newTask = {};

  newTask = getFormData(inputs, newTask)

  taskListArray.unshift(newTask);
  storeData(taskListArray);
  taskAddingForm.classList.add('d-none');

  resetInputs();
  taskUIRender(taskListArray);
  leftTasksUIRender(taskListArray);
}

function showTaskEditForm (event){
  event.preventDefault();
  document.querySelectorAll('.task').forEach(item => {
    if(item.classList.contains('is-edit')) item.classList.remove('is-edit');
  });
  const index = ID2Index(event.currentTarget.id);

  const currentTask = document.querySelector(`#task-item-${index + 1}`);
  currentTask.classList.add('is-edit');
  
  fileUIRender.showFileChange(currentTask);
};

function submitTaskEdit (event, taskListArray) {
  event.preventDefault();

  const index = ID2Index(event.currentTarget.id);
  const taskFrom = Array.from(document.querySelectorAll(`#task-item-${index + 1} .task-data`));

  const newTask = getFormData(taskFrom, taskListArray[index]);
  taskListArray[index] = newTask;

  storeData(taskListArray);
  taskUIRender(taskListArray);
}

function cancelTaskEdit (event, taskListArray) {
  event.preventDefault();
  const index = ID2Index(event.currentTarget.id);
  const currentTask = document.querySelector(`#task-item-${index + 1}`);
  currentTask.classList.remove('is-edit');

  fileUIRender.removeFileChange(event, taskListArray);
}

function markStar (event, taskListArray) {
  const UITaskIndex = ID2Index(event.currentTarget.id);
  const dataTaskIndex = UIIndex2DataIndex(UITaskIndex, taskListArray);

  taskListArray[dataTaskIndex].isStar = !taskListArray[dataTaskIndex].isStar;

  storeData(taskListArray);
  taskUIRender(taskListArray);
}

function checkComplete (event, taskListArray) {
  // 取得任務的 index
  const UITaskIndex = ID2Index(event.currentTarget.id);
  const dataTaskIndex = UIIndex2DataIndex(UITaskIndex, taskListArray);

  taskListArray[dataTaskIndex].isComplete = !taskListArray[dataTaskIndex].isComplete;
  
  storeData(taskListArray);
  taskUIRender(taskListArray);
  leftTasksUIRender(taskListArray);
}

function deleteTask (event, taskListArray) {
  event.preventDefault();

  const index = ID2Index(event.currentTarget.id);
  const indexTaskList = UIIndex2DataIndex(index, taskListArray);

  taskListArray.splice(indexTaskList, 1);

  storeData(taskListArray);
  taskUIRender(taskListArray);
  leftTasksUIRender(taskListArray);
}

function resetInputs () {
  const taskAddingForm = document.querySelector('.task');
  taskAddingForm.reset();
  
  // 把檔案標題與時間清空
  const fileName = taskAddingForm.querySelector('.file-caption > h4');
  const fileTime = taskAddingForm.querySelector('.file-caption > time');
  fileName.textContent = '';
  fileTime.textContent = '';
}

function getFormData (taskForm, dataStore) {
  taskForm.map(input => {
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

function storeData (taskListArray) {
  localStorage.setItem('taskList', JSON.stringify(taskListArray));
}

export default {
  showTaskAddForm,
  cancelTaskAdd,
  submitTaskAdd,
  showTaskEditForm,
  submitTaskEdit,
  cancelTaskEdit,
  markStar,
  checkComplete,
  deleteTask
};
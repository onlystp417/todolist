import timeFormat from '../utility/timeFormat.js';
import { UIIndex2DataIndex, ID2Index } from '../utility/indexParse.js';

function showFileChange (taskForm) {
  const fileName = taskForm.querySelector('.file-caption > h4');
  const fileTime = taskForm.querySelector('.file-caption > time');
  const fileInput = taskForm.querySelector('.file-input');

  fileInput.addEventListener('change', (e) => {
    fileName.textContent = e.currentTarget.files[0].name;
    fileTime.textContent = timeFormat(new Date(Date.now()));
  })
}

function removeFileChange(event, taskListArray) {
  const index = ID2Index(event.currentTarget.id);
  const indexTaskList = UIIndex2DataIndex(index, taskListArray);
  
  const taskItem = document.querySelector(`#task-item-${ index + 1 }`);

  const fileName = taskItem.querySelector('.file-caption > h4');
  const fileTime = taskItem.querySelector('.file-caption > time');

  fileName.textContent = taskListArray[indexTaskList].file;
  fileTime.textContent = taskListArray[indexTaskList].fileTime;
}

export default { showFileChange, removeFileChange };
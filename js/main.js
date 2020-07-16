// 取得 DOM 節點
const main = document.querySelector('main');
const addTaskButton = document.querySelector('.add-form');
const task = document.querySelector('.task');
const taskSaveButton = document.querySelector('.task-btn-save');

// 綁定事件
addTaskButton.addEventListener('click', showTaskCard);
main.addEventListener('click', hideTaskCard);

// 代辦事項 data
const taskListArray = [
  {
    name: '刷牙',
    date: '2020-07-16',
    time: '21:30',
    comment: '再不刷就要蛀牙了',
    file: '123.png',
    fileTime: '1594873114622',
    star: false,
    isComplete: false
  },
  {
    name: '吃飯',
    date: '2020-07-16',
    time: '18:30',
    comment: '',
    file: '',
    fileTime: '',
    star: false,
    isComplete: false
  },
  {
    name: '整理讀書會筆記',
    date: '2020-07-20',
    time: '22:30',
    comment: '整理忍者第五章',
    file: '',
    fileTime: '',
    star: false,
    isComplete: true
  }
];

// 增加待辦功能
function showTaskCard(e) {
  // 防止事件冒泡
  e.stopPropagation();
  // 顯示編輯任務區域
  task.classList.remove('d-none');

  taskSaveButton.addEventListener('click', taskSave);
}

renderTaskList();

function renderTaskList() {
  const taskList = document.querySelector('.tasks-list');
  let taskHTML = ''
  taskListArray.forEach((item, index) => {
    taskHTML += `
      <form class="task">
        <header class="task-title">
          <h2>
            <span class="checkbox">
              <input class="check-itself" id="check-${ index + 1 }" type="checkbox" ${ item.isComplete ? 'checked' : '' }  >
              <label class="check-custom" for="check-${ index + 1 }"><i class="fas fa-check"></i></label>
            </span>
            <input class="task-name ${ item.isComplete ? 'cross-off' : '' }" type="text" placeholder="Type Something Here..." value="${ item.name }">
          </h2>
          <div class="task-mark">
            <span class="task-mark-star ${ item.star ? 'd-none' : '' }"><i class="far fa-star"></i></span>
            <span class="task-mark-star task-mark-star-shiny ${ item.star ? '' : 'd-none' }"><i class="fas fa-star"></i></span>
            <span class="task-mark-pen"><i class="fas fa-pen"></i></span>
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
        <section class="task-form d-none">
          <div class="task-form-edit">
            <section class="task-form-item task-form-deadline">
              <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
              <div action="">
                <input type="date" value="${ item.date }">
                <input type="time" value="${ item.time }">
              </div>
            </section>
            <section class="task-form-item task-form-file">
              <h3><i class="far fa-file"></i>File</h3>
              <input type="file" data-keyname="file" value="${ item.file }" name="" id="">
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
              <textarea name="" id="" cols="30" rows="10" placeholder="Type your meno here... value="${ item.comment }"></textarea>
            </section>
          </div>
          <div class="task-btn">
            <button class="task-btn-basic task-btn-cancel"><i class="fas fa-times"></i>Cancel</button>
            <button class="task-btn-basic task-btn-save"><i class="fas fa-plus"></i>Save</button>
          </div>
        </section>
      </form>
    `;
  })
  taskList.innerHTML = taskHTML;
}

function taskSave() {
  const inputs = task.querySelectorAll('input');
  const newTask = {};
  inputs.forEach(input => {
    newTask[input.dataset.keyname] = (input.value !== 'on') 
      ? input.value : input.checked
      ? true : false;
  });
  taskListArray.unshift(newTask);
  renderTaskList();
}

function hideTaskCard(e) {
  if (!e.target.contains(main)) return;
  task.classList.add('d-none');
}
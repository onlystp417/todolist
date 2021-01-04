// 要從 @testing-library/dom 中 import 一些必要的 method
// 查找 element 的 getByText 和 getByTestId 還有執行事件觸發的 fireEvent
const { getByTestId, fireEvent } = require('@testing-library/dom');

// 引入 task 的操作功能
import taskOperator from '../js/module/data/taskOperator.js';
import { addEvent4TaskStatus } from '../js/module/UI/taskUIRender.js'
// 引入 tab 的操作功能
import { initTabEvent } from '../js/module/data/tabOperator.js';

describe('測試 tab 操作', () => {
  // 每個 test 結束後清空 body
  afterEach(() => {
    document.body.innerHTML = '';
  });

  // 每個測試開始前 init fake DOM
  beforeEach(() => {
    // fake DOM & action
    document.body.innerHTML = `
      <header class="body-header" data-testid="tabGroup">
        <a href="##" class="label-link current" data-tabname="allTasks">My Tasks</a>
        <a href="##" class="label-link" data-tabname="progress">In Progress</a>
        <a href="##" data-testid="tab" class="label-link" data-tabname="completed">Completed</a>
      </header>
      <main>
        <div class="tasks-list" data-testid="todoList">
          <!-- area shows task lists -->
          <form class="task" id="task-item-1">
            <header class="task-title ">
              <h2>
                <span class="checkbox">
                  <input class="check-is-complete task-data" id="check-1" type="checkbox" data-keyname="isComplete">
                  <label class="check-custom" for="check-1"><i class="fas fa-check"></i></label>
                </span>
                <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="吃飯" data-keyname="name">
              </h2>
              <div class="task-mark">
                <input class="task-mark-star task-data" id="isStar-1" type="checkbox" data-keyname="isStar">
                <label class="task-mark-star-custom" for="isStar-1"></label>
                <input class="task-mark-pen" id="isEdit-1" type="checkbox" data-keyname="isEdit">
                <label class="task-mark-pen-custom" for="isEdit-1" id="edit-pen-1"></label>
                <button type="submit" class="task-mark-delete" id="delete-1"><i class="far fa-trash-alt"></i></button>
              </div>
              <div class="task-tag">
                <span class="tag-item tag-time ">
                  <i class="far fa-calendar-alt"></i><time>2020-12-15</time>
                </span>
                <span class="tag-item tag-file ">
                  <i class="far fa-file"></i>
                </span>
                <span class="tag-item tag-comment ">
                  <i class="far fa-comment-dots"></i>
                </span>
              </div>
            </header>
            <section class="task-form d-none">
              <div class="task-form-edit">
                <section class="task-form-item task-form-deadline">
                  <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                  <div>
                    <input class="task-data" type="date" value="2020-12-15" data-keyname="date">
                    <input class="task-data" type="time" value="22:45" data-keyname="time">
                  </div>
                </section>
                <section class="task-form-item task-form-file">
                  <h3><i class="far fa-file"></i>File</h3>
                  <div class="file-caption">
                    <h4>往水源路.jpg</h4>
                    <time>2020.11.30</time>
                  </div>
                  <label class="file-add-button" for="add-file-1"><i class="fas fa-plus"></i></label>
                  <input class="task-data file-input" type="file" data-keyname="file" id="add-file-1">
                  <div class="file-add">
                  </div>
                </section>
                <section class="task-form-item task-form-comment">
                  <h3><i class="far fa-comment-dots"></i>Comment</h3>
                  <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">吃吃吃</textarea>
                </section>
              </div>
              <div class="task-btn">
                <button class="task-btn-basic task-btn-cancel" id="save-button-1"><i class="fas fa-times"></i>Cancel</button>
                <button class="task-btn-basic task-btn-save" id="cancel-button-1"><i class="fas fa-plus"></i>Save</button>
              </div>
            </section>
          </form>
            
          <form class="task" id="task-item-2">
            <header class="task-title ">
              <h2>
                <span class="checkbox">
                  <input class="check-is-complete task-data" id="check-2" type="checkbox" data-keyname="isComplete">
                  <label class="check-custom" for="check-2"><i class="fas fa-check"></i></label>
                </span>
                <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="放大假" data-keyname="name">
              </h2>
              <div class="task-mark">
                <input class="task-mark-star task-data" id="isStar-2" type="checkbox" data-keyname="isStar">
                <label class="task-mark-star-custom" for="isStar-2"></label>
                <input class="task-mark-pen" id="isEdit-2" type="checkbox" data-keyname="isEdit">
                <label class="task-mark-pen-custom" for="isEdit-2" id="edit-pen-2"></label>
                <button type="submit" class="task-mark-delete" id="delete-2"><i class="far fa-trash-alt"></i></button>
              </div>
              <div class="task-tag">
                <span class="tag-item tag-time d-none">
                  <i class="far fa-calendar-alt"></i><time></time>
                </span>
                <span class="tag-item tag-file d-none">
                  <i class="far fa-file"></i>
                </span>
                <span class="tag-item tag-comment ">
                  <i class="far fa-comment-dots"></i>
                </span>
              </div>
            </header>
            <section class="task-form d-none">
              <div class="task-form-edit">
                <section class="task-form-item task-form-deadline">
                  <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                  <div action="">
                    <input class="task-data" type="date" value="" data-keyname="date">
                    <input class="task-data" type="time" value="" data-keyname="time">
                  </div>
                </section>
                <section class="task-form-item task-form-file">
                  <h3><i class="far fa-file"></i>File</h3>
                  <div class="file-caption">
                    <h4></h4>
                    <time></time>
                  </div>
                  <label class="file-add-button" for="add-file-2"><i class="fas fa-plus"></i></label>
                  <input class="task-data file-input" type="file" data-keyname="file" id="add-file-2">
                  <div class="file-add">
                  </div>
                </section>
                <section class="task-form-item task-form-comment">
                  <h3><i class="far fa-comment-dots"></i>Comment</h3>
                  <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">放爽爽</textarea>
                </section>
              </div>
              <div class="task-btn">
                <button class="task-btn-basic task-btn-cancel" id="save-button-2"><i class="fas fa-times"></i>Cancel</button>
                <button class="task-btn-basic task-btn-save" id="cancel-button-2"><i class="fas fa-plus"></i>Save</button>
              </div>
            </section>
          </form>
            
          <form class="task" id="task-item-3">
            <header class="task-title ">
              <h2>
                <span class="checkbox">
                  <input class="check-is-complete task-data" id="check-3" type="checkbox" data-keyname="isComplete">
                  <label class="check-custom" for="check-3"><i class="fas fa-check"></i></label>
                </span>
                <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="睡覺" data-keyname="name">
              </h2>
              <div class="task-mark">
                <input class="task-mark-star task-data" id="isStar-3" type="checkbox" data-keyname="isStar">
                <label class="task-mark-star-custom" for="isStar-3"></label>
                <input class="task-mark-pen" id="isEdit-3" type="checkbox" data-keyname="isEdit">
                <label class="task-mark-pen-custom" for="isEdit-3" id="edit-pen-3"></label>
                <button type="submit" class="task-mark-delete" id="delete-3"><i class="far fa-trash-alt"></i></button>
              </div>
              <div class="task-tag">
                <span class="tag-item tag-time ">
                  <i class="far fa-calendar-alt"></i><time>2020-12-31</time>
                </span>
                <span class="tag-item tag-file ">
                  <i class="far fa-file"></i>
                </span>
                <span class="tag-item tag-comment ">
                  <i class="far fa-comment-dots"></i>
                </span>
              </div>
            </header>
            <section class="task-form d-none">
              <div class="task-form-edit">
                <section class="task-form-item task-form-deadline">
                  <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                  <div action="">
                    <input class="task-data" type="date" value="2020-12-31" data-keyname="date">
                    <input class="task-data" type="time" value="19:50" data-keyname="time">
                  </div>
                </section>
                <section class="task-form-item task-form-file">
                  <h3><i class="far fa-file"></i>File</h3>
                  <div class="file-caption">
                    <h4>imag0029.jpg</h4>
                    <time>2020.11.30</time>
                  </div>
                  <label class="file-add-button" for="add-file-3"><i class="fas fa-plus"></i></label>
                  <input class="task-data file-input" type="file" data-keyname="file" id="add-file-3">
                  <div class="file-add"></div>
                </section>
                <section class="task-form-item task-form-comment">
                  <h3><i class="far fa-comment-dots"></i>Comment</h3>
                  <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">測試aaa</textarea>
                </section>
              </div>
              <div class="task-btn">
                <button class="task-btn-basic task-btn-cancel" id="save-button-3"><i class="fas fa-times"></i>Cancel</button>
                <button class="task-btn-basic task-btn-save" id="cancel-button-3"><i class="fas fa-plus"></i>Save</button>
              </div>
            </section>
          </form>
        </div>
      </main>
    `;
    initTabEvent([{"isComplete":false,"name":"吃飯","isStar":false,"date":"2020-12-15","time":"22:45","file":"往水源路.jpg","fileTime":"2020.11.30","comment":"吃吃吃"},{"isComplete":false,"name":"放大假","isStar":false,"date":"","time":"","file":"","fileTime":"","comment":"放爽爽"},{"isComplete":true,"name":"睡覺","isStar":false,"date":"2020-12-31","time":"19:50","file":"imag0029.jpg","fileTime":"2020.11.30","comment":"測試aaa"}]);
    const tab = getByTestId(document.body, 'tab');
    fireEvent.click(tab);
  })

  // assertion
  test('測試 tab 切換資料更新', () => {
    const todoList = getByTestId(document.body, 'todoList');
    const expectedResult = `
      <form class="task" id="task-item-1">
        <header class="task-title ">
          <h2>
            <span class="checkbox">
              <input class="check-is-complete task-data" id="check-1" type="checkbox" checked="" data-keyname="isComplete">
              <label class="check-custom" for="check-1"><i class="fas fa-check"></i></label>
            </span>
            <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data cross-off" type="text" placeholder="Type Something Here..." value="睡覺" data-keyname="name">
          </h2>
          <div class="task-mark">
            <input class="task-mark-star task-data" id="isStar-1" type="checkbox" data-keyname="isStar">
            <label class="task-mark-star-custom" for="isStar-1"></label>
            <input class="task-mark-pen" id="isEdit-1" type="checkbox" data-keyname="isEdit">
            <label class="task-mark-pen-custom" for="isEdit-1" id="edit-pen-1"></label>
            <button type="submit" class="task-mark-delete" id="delete-1"><i class="far fa-trash-alt"></i></button>
          </div>
          <div class="task-tag">
            <span class="tag-item tag-time ">
              <i class="far fa-calendar-alt"></i><time>2020-12-31</time>
            </span>
            <span class="tag-item tag-file ">
              <i class="far fa-file"></i>
            </span>
            <span class="tag-item tag-comment ">
              <i class="far fa-comment-dots"></i>
            </span>
          </div>
        </header>
        <section class="task-form d-none">
          <div class="task-form-edit">
            <section class="task-form-item task-form-deadline">
              <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
              <div action="">
                <input class="task-data" type="date" value="2020-12-31" data-keyname="date">
                <input class="task-data" type="time" value="19:50" data-keyname="time">
              </div>
            </section>
            <section class="task-form-item task-form-file">
              <h3><i class="far fa-file"></i>File</h3>
              <div class="file-caption">
                <h4>imag0029.jpg</h4>
                <time>2020.11.30</time>
              </div>
              <label class="file-add-button" for="add-file-1"><i class="fas fa-plus"></i></label>
              <input class="task-data file-input" type="file" data-keyname="file" id="add-file-1">
              <div class="file-add">
            </div></section>
            <section class="task-form-item task-form-comment">
              <h3><i class="far fa-comment-dots"></i>Comment</h3>
              <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">測試aaa</textarea>
            </section>
          </div>
          <div class="task-btn">
            <button class="task-btn-basic task-btn-cancel" id="save-button-1"><i class="fas fa-times"></i>Cancel</button>
            <button class="task-btn-basic task-btn-save" id="cancel-button-1"><i class="fas fa-plus"></i>Save</button>
          </div>
        </section>
      </form>
    `;
    expect(todoList.innerHTML.replace(/\s/g, '')).toBe(expectedResult.replace(/\s/g, ''));
  })

  test('當前 tab 樣式', () => {
    const tabGroup = getByTestId(document.body, 'tabGroup');
    const expectedResult = `
      <a href="##" class="label-link" data-tabname="allTasks">My Tasks</a>
      <a href="##" class="label-link" data-tabname="progress">In Progress</a>
      <a href="##" data-testid="tab" class="label-link current" data-tabname="completed">Completed</a>
    `;
    expect(tabGroup.innerHTML.replace(/\s/g, '')).toBe(expectedResult.replace(/\s/g, ''));
  })
})

describe('測試 task 操作', () => {
  describe('新增任務', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    beforeEach(() => {
      // fake DOM select
      document.body.innerHTML = `
        <header class="body-header" data-testid="tabGroup">
          <a href="##" data-testid="tab" class="label-link current" data-tabname="my-tasks">My Tasks</a>
          <a href="##" class="label-link" data-tabname="progress">In Progress</a>
          <a href="##" class="label-link" data-tabname="completed">Completed</a>
        </header>
        <main>
          <section class="add">
            <button data-testid="taskFormOpenButton" class="add-form">
              <span><i class="fas fa-plus"></i></span>
              <span>Add Task</span>
            </button>
          </section>
          <form data-testid="taskForm" class="task d-none">
            <header class="task-title major-task-bg">
              <h2>
                <span class="checkbox">
                  <!-- check-is-complete 的 id 值要用 js 賦予新的值  -->
                  <input class="check-is-complete task-data" id="check" type="checkbox" data-keyname="isComplete">
                  <label class="check-custom" for="check"><i class="fas fa-check"></i></label>
                </span>
                <input data-testid="taskNameInput" onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data" type="text" placeholder="Type Something Here..." data-keyname="name">
              </h2>
              <div class="task-mark">
                <input class="task-mark-star task-data" id="isStar" type="checkbox" data-keyname="isStar">
                <label class="task-mark-star-custom" for="isStar"></label>
                <input class="task-mark-pen" id="isEdit" type="checkbox" data-keyname="isEdit">
                <label class="task-mark-pen-custom" for="isEdit"></label>
              </div>
            </header>
            <section class="task-form">
              <div class="task-form-edit">
                <section class="task-form-item task-form-deadline">
                  <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                  <div class="task-deadline">
                    <input data-testid="taskDateInput" class="task-data" type="date" data-keyname="date">
                    <input class="task-data" type="time" data-keyname="time">
                  </div>
                </section>
                <section class="task-form-item task-form-file">
                  <h3><i class="far fa-file"></i>File</h3>
                  <div class="file-caption">
                    <h4></h4>
                    <time></time>
                  </div>
                  <label class="file-add-button" for="add-file"><i class="fas fa-plus"></i></label>
                  <input class="task-data file-input" type="file" data-keyname="file" id="add-file">
                </section>
                <section class="task-form-item task-form-comment">
                  <h3><i class="far fa-comment-dots"></i>Comment</h3>
                  <textarea data-testid="taskCommentInput" class="task-data" data-keyname="comment" cols="30" rows="3" placeholder="Type your meno here..."></textarea>
                </section>
              </div>
              <div class="task-btn">
                <button class="task-btn-basic task-btn-cancel"><i class="fas fa-times"></i>Cancel</button>
                <button data-testid="taskAddButton" class="task-btn-basic task-btn-add"><i class="fas fa-plus"></i>Add Task</button>
              </div>
            </section>
          </form>
          <div data-testid="tasksList" class="tasks-list">
          </div>
          <p class="task-counter"><span data-testid="taskCounter">0</span> task left</p>
        </main>
      `;
      const tab = getByTestId(document.body, 'tab');
      const taskFormOpenButton = getByTestId(document.body, 'taskFormOpenButton');
      const taskNameInput = getByTestId(document.body, 'taskNameInput');
      const taskDateInput = getByTestId(document.body, 'taskDateInput');
      const taskCommentInput = getByTestId(document.body, 'taskCommentInput');
      const taskAddButton = getByTestId(document.body, 'taskAddButton');
      
      let taskListArray = [];
      taskOperator.initTaskEvent(taskListArray);
      initTabEvent(taskListArray);
  
      // action: open task form
      fireEvent.click(taskFormOpenButton);
  
      // fill in form data
      taskNameInput.value = '測試任務';
      taskDateInput.value = '2020-12-05';
      taskCommentInput.value = '單元測試';
  
      // action: task adding form submit & check all tasks
      fireEvent.click(taskAddButton);
      fireEvent.click(tab);
    })

    // assertion
    test('點擊 Add Task 按鈕顯示 task 表單', () => {
      const taskForm = getByTestId(document.body, 'taskForm');
      expect(taskForm.classList).toEqual(expect.not.arrayContaining(['d-none']));
    })
    test('任務是否新增到清單中', () => {
      const tasksList = getByTestId(document.body, 'tasksList');
      const expectResult = `
        <form class="task" id="task-item-1">
          <header class="task-title ">
            <h2>
              <span class="checkbox">
                <input class="check-is-complete task-data" id="check-1" type="checkbox" data-keyname="isComplete">
                <label class="check-custom" for="check-1"><i class="fas fa-check"></i></label>
              </span>
              <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="測試任務" data-keyname="name">
            </h2>
            <div class="task-mark">
              <input class="task-mark-star task-data" id="isStar-1" type="checkbox" data-keyname="isStar">
              <label class="task-mark-star-custom" for="isStar-1"></label>
              <input class="task-mark-pen" id="isEdit-1" type="checkbox" data-keyname="isEdit">
              <label class="task-mark-pen-custom" for="isEdit-1" id="edit-pen-1"></label>
              <button type="submit" class="task-mark-delete" id="delete-1"><i class="far fa-trash-alt"></i></button>
            </div>
            <div class="task-tag">
              <span class="tag-item tag-time ">
                <i class="far fa-calendar-alt"></i><time>2020-12-05</time>
              </span>
              <span class="tag-item tag-file d-none">
                <i class="far fa-file"></i>
              </span>
              <span class="tag-item tag-comment ">
                <i class="far fa-comment-dots"></i>
              </span>
            </div>
          </header>
          <section class="task-form d-none">
            <div class="task-form-edit">
              <section class="task-form-item task-form-deadline">
                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                <div action="">
                  <input class="task-data" type="date" value="2020-12-05" data-keyname="date">
                  <input class="task-data" type="time" value="" data-keyname="time">
                </div>
              </section>
              <section class="task-form-item task-form-file">
                <h3><i class="far fa-file"></i>File</h3>
                <div class="file-caption">
                  <h4></h4>
                  <time></time>
                </div>
                <label class="file-add-button" for="add-file-1"><i class="fas fa-plus"></i></label>
                <input class="task-data file-input" type="file" data-keyname="file" id="add-file-1">
                <div class="file-add">
              </div></section>
              <section class="task-form-item task-form-comment">
                <h3><i class="far fa-comment-dots"></i>Comment</h3>
                <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">單元測試</textarea>
              </section>
            </div>
            <div class="task-btn">
              <button class="task-btn-basic task-btn-cancel" id="save-button-1"><i class="fas fa-times"></i>Cancel</button>
              <button class="task-btn-basic task-btn-save" id="cancel-button-1"><i class="fas fa-plus"></i>Save</button>
            </div>
          </section>
        </form>
      `;
      expect(tasksList.innerHTML.replace(/\s/g, '')).toBe(expectResult.replace(/\s/g, ''));
    })
    test('待辦清單數量為 1', () => {
      const taskCounter = getByTestId(document.body, 'taskCounter');
      expect(taskCounter.textContent).toBe('1');
    })
  })
  describe('編輯任務', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    })
    beforeEach(() => {
      document.body.innerHTML = `
        <main>
          <div data-testid="tasksList" class="tasks-list">
            <form class="task" id="task-item-1">
              <header class="task-title ">
                <h2>
                  <span class="checkbox">
                    <input class="check-is-complete task-data" id="check-1" type="checkbox" data-keyname="isComplete">
                    <label class="check-custom" for="check-1"><i class="fas fa-check"></i></label>
                  </span>
                  <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="吃飯" data-keyname="name">
                </h2>
                <div class="task-mark">
                  <input class="task-mark-star task-data" id="isStar-1" type="checkbox" data-keyname="isStar">
                  <label class="task-mark-star-custom" for="isStar-1"></label>
                  <input data-testid="taskEditCheck" class="task-mark-pen" id="isEdit-1" type="checkbox" data-keyname="isEdit">
                  <label class="task-mark-pen-custom" for="isEdit-1" id="edit-pen-1"></label>
                  <button type="submit" class="task-mark-delete" id="delete-1"><i class="far fa-trash-alt"></i></button>
                </div>
                <div class="task-tag">
                  <span class="tag-item tag-time ">
                    <i class="far fa-calendar-alt"></i><time>2020-12-15</time>
                  </span>
                  <span class="tag-item tag-file ">
                    <i class="far fa-file"></i>
                  </span>
                  <span class="tag-item tag-comment ">
                    <i class="far fa-comment-dots"></i>
                  </span>
                </div>
              </header>
              <section data-testid="taskEditForm" class="task-form d-none">
                <div class="task-form-edit">
                  <section class="task-form-item task-form-deadline">
                    <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                    <div>
                      <input class="task-data" type="date" value="2020-12-15" data-keyname="date">
                      <input data-testid="taskTimeInput" class="task-data" type="time" value="22:45" data-keyname="time">
                    </div>
                  </section>
                  <section class="task-form-item task-form-file">
                    <h3><i class="far fa-file"></i>File</h3>
                    <div class="file-caption">
                      <h4>往水源路.jpg</h4>
                      <time>2020.11.30</time>
                    </div>
                    <label class="file-add-button" for="add-file-1"><i class="fas fa-plus"></i></label>
                    <input class="task-data file-input" type="file" data-keyname="file" id="add-file-1">
                    <div class="file-add">
                    </div>
                  </section>
                  <section class="task-form-item task-form-comment">
                    <h3><i class="far fa-comment-dots"></i>Comment</h3>
                    <textarea data-testid="taskCommentInput" class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">吃吃吃</textarea>
                  </section>
                </div>
                <div class="task-btn">
                  <button class="task-btn-basic task-btn-cancel" id="save-button-1"><i class="fas fa-times"></i>Cancel</button>
                  <button data-testid="taskEditSubmit" class="task-btn-basic task-btn-save" id="cancel-button-1"><i class="fas fa-plus"></i>Save</button>
                </div>
              </section>
            </form>
            
            <form class="task" id="task-item-2">
              <header class="task-title ">
                <h2>
                  <span class="checkbox">
                    <input class="check-is-complete task-data" id="check-2" type="checkbox" data-keyname="isComplete">
                    <label class="check-custom" for="check-2"><i class="fas fa-check"></i></label>
                  </span>
                  <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="放大假" data-keyname="name">
                </h2>
                <div class="task-mark">
                  <input class="task-mark-star task-data" id="isStar-2" type="checkbox" data-keyname="isStar">
                  <label class="task-mark-star-custom" for="isStar-2"></label>
                  <input class="task-mark-pen" id="isEdit-2" type="checkbox" data-keyname="isEdit">
                  <label class="task-mark-pen-custom" for="isEdit-2" id="edit-pen-2"></label>
                  <button type="submit" class="task-mark-delete" id="delete-2"><i class="far fa-trash-alt"></i></button>
                </div>
                <div class="task-tag">
                  <span class="tag-item tag-time d-none">
                    <i class="far fa-calendar-alt"></i><time></time>
                  </span>
                  <span class="tag-item tag-file d-none">
                    <i class="far fa-file"></i>
                  </span>
                  <span class="tag-item tag-comment ">
                    <i class="far fa-comment-dots"></i>
                  </span>
                </div>
              </header>
              <section class="task-form d-none">
                <div class="task-form-edit">
                  <section class="task-form-item task-form-deadline">
                    <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                    <div action="">
                      <input class="task-data" type="date" value="" data-keyname="date">
                      <input class="task-data" type="time" value="" data-keyname="time">
                    </div>
                  </section>
                  <section class="task-form-item task-form-file">
                    <h3><i class="far fa-file"></i>File</h3>
                    <div class="file-caption">
                      <h4></h4>
                      <time></time>
                    </div>
                    <label class="file-add-button" for="add-file-2"><i class="fas fa-plus"></i></label>
                    <input class="task-data file-input" type="file" data-keyname="file" id="add-file-2">
                    <div class="file-add">
                    </div>
                  </section>
                  <section class="task-form-item task-form-comment">
                    <h3><i class="far fa-comment-dots"></i>Comment</h3>
                    <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">放爽爽</textarea>
                  </section>
                </div>
                <div class="task-btn">
                  <button class="task-btn-basic task-btn-cancel" id="save-button-2"><i class="fas fa-times"></i>Cancel</button>
                  <button class="task-btn-basic task-btn-save" id="cancel-button-2"><i class="fas fa-plus"></i>Save</button>
                </div>
              </section>
            </form>   
          </div>
          <p class="task-counter"><span>0</span> task left</p>
        </main>
      `;

      let taskListArray = [[{"isComplete":false,"name":"吃飯","isStar":false,"date":"2020-12-15","time":"22:45","file":"","fileTime":"","comment":"吃吃吃"},{"isComplete":false,"name":"放大假","isStar":false,"date":"","time":"","file":"","fileTime":"","comment":"放爽爽"}]];
      // taskOperator.initTaskEvent(taskListArray);
      addEvent4TaskStatus(taskListArray);
      const taskEditCheck = getByTestId(document.body, 'tasksList');
      fireEvent.change(taskEditCheck);
    })

    test('任務編輯表單是否顯示', () => {
      const taskEditForm = getByTestId(document.body, 'taskEditForm');
      expect(taskEditForm.classList).toEqual(expect.not.arrayContaining(['d-none']));
    })
    test('任務編輯的內容是否正確顯示', () => {
      const taskTimeInput = getByTestId(document.body, 'taskTimeInput');
      const taskCommentInput = getByTestId(document.body, 'taskCommentInput');
      const taskEditSubmit = getByTestId(document.body, 'taskEditSubmit');
      const tasksList = getByTestId(document.body, 'tasksList');

      taskTimeInput.value = '22:00';
      taskCommentInput.value = '改改改測試';
      fireEvent.click(taskEditSubmit);

      const expectResult = `
        <form class="task" id="task-item-1">
          <header class="task-title ">
            <h2>
              <span class="checkbox">
                <input class="check-is-complete task-data" id="check-1" type="checkbox" data-keyname="isComplete">
                <label class="check-custom" for="check-1"><i class="fas fa-check"></i></label>
              </span>
              <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="吃飯" data-keyname="name">
            </h2>
            <div class="task-mark">
              <input class="task-mark-star task-data" id="isStar-1" type="checkbox" data-keyname="isStar">
              <label class="task-mark-star-custom" for="isStar-1"></label>
              <input class="task-mark-pen" id="isEdit-1" type="checkbox" data-keyname="isEdit">
              <label class="task-mark-pen-custom" for="isEdit-1" id="edit-pen-1"></label>
              <button type="submit" class="task-mark-delete" id="delete-1"><i class="far fa-trash-alt"></i></button>
            </div>
            <div class="task-tag">
              <span class="tag-item tag-time ">
                <i class="far fa-calendar-alt"></i><time>2020-12-15</time>
              </span>
              <span class="tag-item tag-file d-none">
                <i class="far fa-file"></i>
              </span>
              <span class="tag-item tag-comment ">
                <i class="far fa-comment-dots"></i>
              </span>
            </div>
          </header>
          <section class="task-form d-none">
            <div class="task-form-edit">
              <section class="task-form-item task-form-deadline">
                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                <div action="">
                  <input class="task-data" type="date" value="2020-12-15" data-keyname="date">
                  <input class="task-data" type="time" value="22:00" data-keyname="time">
                </div>
              </section>
              <section class="task-form-item task-form-file">
                <h3><i class="far fa-file"></i>File</h3>
                <div class="file-caption">
                  <h4></h4>
                  <time></time>
                </div>
                <label class="file-add-button" for="add-file-1"><i class="fas fa-plus"></i></label>
                <input class="task-data file-input" type="file" data-keyname="file" id="add-file-1">
                <div class="file-add">
              </div></section>
              <section class="task-form-item task-form-comment">
                <h3><i class="far fa-comment-dots"></i>Comment</h3>
                <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">改改改測試</textarea>
              </section>
            </div>
            <div class="task-btn">
              <button class="task-btn-basic task-btn-cancel" id="save-button-1"><i class="fas fa-times"></i>Cancel</button>
              <button class="task-btn-basic task-btn-save" id="cancel-button-1"><i class="fas fa-plus"></i>Save</button>
            </div>
          </section>
        </form>
        
        `
        // <form class="task" id="task-item-2">
        //   <header class="task-title ">
        //     <h2>
        //       <span class="checkbox">
        //         <input class="check-is-complete task-data" id="check-2" type="checkbox" data-keyname="isComplete">
        //         <label class="check-custom" for="check-2"><i class="fas fa-check"></i></label>
        //       </span>
        //       <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="放大假" data-keyname="name">
        //     </h2>
        //     <div class="task-mark">
        //       <input class="task-mark-star task-data" id="isStar-2" type="checkbox" data-keyname="isStar">
        //       <label class="task-mark-star-custom" for="isStar-2"></label>
        //       <input class="task-mark-pen" id="isEdit-2" type="checkbox" data-keyname="isEdit">
        //       <label class="task-mark-pen-custom" for="isEdit-2" id="edit-pen-2"></label>
        //       <button type="submit" class="task-mark-delete" id="delete-2"><i class="far fa-trash-alt"></i></button>
        //     </div>
        //     <div class="task-tag">
        //       <span class="tag-item tag-time d-none">
        //         <i class="far fa-calendar-alt"></i><time></time>
        //       </span>
        //       <span class="tag-item tag-file d-none">
        //         <i class="far fa-file"></i>
        //       </span>
        //       <span class="tag-item tag-comment ">
        //         <i class="far fa-comment-dots"></i>
        //       </span>
        //     </div>
        //   </header>
        //   <section class="task-form d-none">
        //     <div class="task-form-edit">
        //       <section class="task-form-item task-form-deadline">
        //         <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
        //         <div action="">
        //           <input class="task-data" type="date" value="" data-keyname="date">
        //           <input class="task-data" type="time" value="" data-keyname="time">
        //         </div>
        //       </section>
        //       <section class="task-form-item task-form-file">
        //         <h3><i class="far fa-file"></i>File</h3>
        //         <div class="file-caption">
        //           <h4></h4>
        //           <time></time>
        //         </div>
        //         <label class="file-add-button" for="add-file-2"><i class="fas fa-plus"></i></label>
        //         <input class="task-data file-input" type="file" data-keyname="file" id="add-file-2">
        //         <div class="file-add">
        //       </div></section>
        //       <section class="task-form-item task-form-comment">
        //         <h3><i class="far fa-comment-dots"></i>Comment</h3>
        //         <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">放爽爽</textarea>
        //       </section>
        //     </div>
        //     <div class="task-btn">
        //       <button class="task-btn-basic task-btn-cancel" id="save-button-2"><i class="fas fa-times"></i>Cancel</button>
        //       <button class="task-btn-basic task-btn-save" id="cancel-button-2"><i class="fas fa-plus"></i>Save</button>
        //     </div>
        //   </section>
        // </form>
      expect(tasksList.innerHTML.replace(/\s/g, '')).toBe(expectResult.replace(/\s/g, ''));
    })
  })
  describe('刪除任務', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    })
    beforeEach(() => {
      document.body.innerHTML = `
        <main>
          <div data-testid="tasksList" class="tasks-list">
            <form class="task" id="task-item-1">
              <header class="task-title ">
                <h2>
                  <span class="checkbox">
                    <input class="check-is-complete task-data" id="check-1" type="checkbox" data-keyname="isComplete">
                    <label class="check-custom" for="check-1"><i class="fas fa-check"></i></label>
                  </span>
                  <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="吃飯" data-keyname="name">
                </h2>
                <div class="task-mark">
                  <input class="task-mark-star task-data" id="isStar-1" type="checkbox" data-keyname="isStar">
                  <label class="task-mark-star-custom" for="isStar-1"></label>
                  <input class="task-mark-pen" id="isEdit-1" type="checkbox" data-keyname="isEdit">
                  <label class="task-mark-pen-custom" for="isEdit-1" id="edit-pen-1"></label>
                  <button type="submit" class="task-mark-delete" id="delete-1"><i class="far fa-trash-alt"></i></button>
                </div>
                <div class="task-tag">
                  <span class="tag-item tag-time ">
                    <i class="far fa-calendar-alt"></i><time>2020-12-15</time>
                  </span>
                  <span class="tag-item tag-file ">
                    <i class="far fa-file"></i>
                  </span>
                  <span class="tag-item tag-comment ">
                    <i class="far fa-comment-dots"></i>
                  </span>
                </div>
              </header>
              <section class="task-form d-none">
                <div class="task-form-edit">
                  <section class="task-form-item task-form-deadline">
                    <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                    <div>
                      <input class="task-data" type="date" value="2020-12-15" data-keyname="date">
                      <input class="task-data" type="time" value="22:45" data-keyname="time">
                    </div>
                  </section>
                  <section class="task-form-item task-form-file">
                    <h3><i class="far fa-file"></i>File</h3>
                    <div class="file-caption">
                      <h4>往水源路.jpg</h4>
                      <time>2020.11.30</time>
                    </div>
                    <label class="file-add-button" for="add-file-1"><i class="fas fa-plus"></i></label>
                    <input class="task-data file-input" type="file" data-keyname="file" id="add-file-1">
                    <div class="file-add">
                    </div>
                  </section>
                  <section class="task-form-item task-form-comment">
                    <h3><i class="far fa-comment-dots"></i>Comment</h3>
                    <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">吃吃吃</textarea>
                  </section>
                </div>
                <div class="task-btn">
                  <button class="task-btn-basic task-btn-cancel" id="save-button-1"><i class="fas fa-times"></i>Cancel</button>
                  <button class="task-btn-basic task-btn-save" id="cancel-button-1"><i class="fas fa-plus"></i>Save</button>
                </div>
              </section>
            </form>
            
            <form class="task" id="task-item-2">
              <header class="task-title ">
                <h2>
                  <span class="checkbox">
                    <input class="check-is-complete task-data" id="check-2" type="checkbox" data-keyname="isComplete">
                    <label class="check-custom" for="check-2"><i class="fas fa-check"></i></label>
                  </span>
                  <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="放大假" data-keyname="name">
                </h2>
                <div class="task-mark">
                  <input class="task-mark-star task-data" id="isStar-2" type="checkbox" data-keyname="isStar">
                  <label class="task-mark-star-custom" for="isStar-2"></label>
                  <input class="task-mark-pen" id="isEdit-2" type="checkbox" data-keyname="isEdit">
                  <label class="task-mark-pen-custom" for="isEdit-2" id="edit-pen-2"></label>
                  <button data-testid="taskDeleteButton" type="submit" class="task-mark-delete" id="delete-2"><i class="far fa-trash-alt"></i></button>
                </div>
                <div class="task-tag">
                  <span class="tag-item tag-time d-none">
                    <i class="far fa-calendar-alt"></i><time></time>
                  </span>
                  <span class="tag-item tag-file d-none">
                    <i class="far fa-file"></i>
                  </span>
                  <span class="tag-item tag-comment ">
                    <i class="far fa-comment-dots"></i>
                  </span>
                </div>
              </header>
              <section class="task-form d-none">
                <div class="task-form-edit">
                  <section class="task-form-item task-form-deadline">
                    <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                    <div action="">
                      <input class="task-data" type="date" value="" data-keyname="date">
                      <input class="task-data" type="time" value="" data-keyname="time">
                    </div>
                  </section>
                  <section class="task-form-item task-form-file">
                    <h3><i class="far fa-file"></i>File</h3>
                    <div class="file-caption">
                      <h4></h4>
                      <time></time>
                    </div>
                    <label class="file-add-button" for="add-file-2"><i class="fas fa-plus"></i></label>
                    <input class="task-data file-input" type="file" data-keyname="file" id="add-file-2">
                    <div class="file-add">
                    </div>
                  </section>
                  <section class="task-form-item task-form-comment">
                    <h3><i class="far fa-comment-dots"></i>Comment</h3>
                    <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">放爽爽</textarea>
                  </section>
                </div>
                <div class="task-btn">
                  <button class="task-btn-basic task-btn-cancel" id="save-button-2"><i class="fas fa-times"></i>Cancel</button>
                  <button class="task-btn-basic task-btn-save" id="cancel-button-2"><i class="fas fa-plus"></i>Save</button>
                </div>
              </section>
            </form>

            <form class="task" id="task-item-3">
              <header class="task-title ">
                <h2>
                  <span class="checkbox">
                    <input class="check-is-complete task-data" id="check-3" type="checkbox" checked="" data-keyname="isComplete">
                    <label class="check-custom" for="check-3"><i class="fas fa-check"></i></label>
                  </span>
                  <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data cross-off" type="text" placeholder="Type Something Here..." value="睡覺" data-keyname="name">
                </h2>
                <div class="task-mark">
                  <input class="task-mark-star task-data" id="isStar-3" type="checkbox" data-keyname="isStar">
                  <label class="task-mark-star-custom" for="isStar-3"></label>
                  <input class="task-mark-pen" id="isEdit-3" type="checkbox" data-keyname="isEdit">
                  <label class="task-mark-pen-custom" for="isEdit-3" id="edit-pen-3"></label>
                  <button type="submit" class="task-mark-delete" id="delete-3"><i class="far fa-trash-alt"></i></button>
                </div>
                <div class="task-tag">
                  <span class="tag-item tag-time ">
                    <i class="far fa-calendar-alt"></i><time>2020-12-31</time>
                  </span>
                  <span class="tag-item tag-file ">
                    <i class="far fa-file"></i>
                  </span>
                  <span class="tag-item tag-comment ">
                    <i class="far fa-comment-dots"></i>
                  </span>
                </div>
              </header>
              <section class="task-form d-none">
                <div class="task-form-edit">
                  <section class="task-form-item task-form-deadline">
                    <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                    <div action="">
                      <input class="task-data" type="date" value="2020-12-31" data-keyname="date">
                      <input class="task-data" type="time" value="19:50" data-keyname="time">
                    </div>
                  </section>
                  <section class="task-form-item task-form-file">
                    <h3><i class="far fa-file"></i>File</h3>
                    <div class="file-caption">
                      <h4>imag0029.jpg</h4>
                      <time>2020.11.30</time>
                    </div>
                    <label class="file-add-button" for="add-file-3"><i class="fas fa-plus"></i></label>
                    <input class="task-data file-input" type="file" data-keyname="file" id="add-file-3">
                    <div class="file-add">
                  </div></section>
                  <section class="task-form-item task-form-comment">
                    <h3><i class="far fa-comment-dots"></i>Comment</h3>
                    <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">測試aaa</textarea>
                  </section>
                </div>
                <div class="task-btn">
                  <button class="task-btn-basic task-btn-cancel" id="save-button-3"><i class="fas fa-times"></i>Cancel</button>
                  <button class="task-btn-basic task-btn-save" id="cancel-button-3"><i class="fas fa-plus"></i>Save</button>
                </div>
              </section>
            </form>
          </div>
          <!-- task counter -->
          <p class="task-counter"><span data-testid="taskLeft">0</span> task left</p>
        </main>
      `;
      
      const taskListArray = [[{"isComplete":false,"name":"吃飯","isStar":false,"date":"2020-12-15","time":"22:45","file":"","fileTime":"","comment":"吃吃吃"},{"isComplete":false,"name":"放大假","isStar":false,"date":"","time":"","file":"","fileTime":"","comment":"放爽爽"},{"isComplete":true,"name":"睡覺","isStar":false,"date":"2020-12-31","time":"19:50","file":"imag0029.jpg","fileTime":"2020.11.30","comment":"測試aaa"}]];
      addEvent4TaskStatus(taskListArray);
      const taskDeleteButton = getByTestId(document.body, 'taskDeleteButton');
      fireEvent.click(taskDeleteButton);
    })
    test('任務是否正確刪除', () => {
      const tasksList = getByTestId(document.body, 'tasksList');
      const expectedResult = `
        <form class="task" id="task-item-1">
          <header class="task-title ">
            <h2>
              <span class="checkbox">
                <input class="check-is-complete task-data" id="check-1" type="checkbox" data-keyname="isComplete">
                <label class="check-custom" for="check-1"><i class="fas fa-check"></i></label>
              </span>
              <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data " type="text" placeholder="Type Something Here..." value="吃飯" data-keyname="name">
            </h2>
            <div class="task-mark">
              <input class="task-mark-star task-data" id="isStar-1" type="checkbox" data-keyname="isStar">
              <label class="task-mark-star-custom" for="isStar-1"></label>
              <input class="task-mark-pen" id="isEdit-1" type="checkbox" data-keyname="isEdit">
              <label class="task-mark-pen-custom" for="isEdit-1" id="edit-pen-1"></label>
              <button type="submit" class="task-mark-delete" id="delete-1"><i class="far fa-trash-alt"></i></button>
            </div>
            <div class="task-tag">
              <span class="tag-item tag-time ">
                <i class="far fa-calendar-alt"></i><time>2020-12-15</time>
              </span>
              <span class="tag-item tag-file ">
                <i class="far fa-file"></i>
              </span>
              <span class="tag-item tag-comment ">
                <i class="far fa-comment-dots"></i>
              </span>
            </div>
          </header>
          <section class="task-form d-none">
            <div class="task-form-edit">
              <section class="task-form-item task-form-deadline">
                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                <div>
                  <input class="task-data" type="date" value="2020-12-15" data-keyname="date">
                  <input class="task-data" type="time" value="22:45" data-keyname="time">
                </div>
              </section>
              <section class="task-form-item task-form-file">
                <h3><i class="far fa-file"></i>File</h3>
                <div class="file-caption">
                  <h4>往水源路.jpg</h4>
                  <time>2020.11.30</time>
                </div>
                <label class="file-add-button" for="add-file-1"><i class="fas fa-plus"></i></label>
                <input class="task-data file-input" type="file" data-keyname="file" id="add-file-1">
                <div class="file-add">
                </div>
              </section>
              <section class="task-form-item task-form-comment">
                <h3><i class="far fa-comment-dots"></i>Comment</h3>
                <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">吃吃吃</textarea>
              </section>
            </div>
            <div class="task-btn">
              <button class="task-btn-basic task-btn-cancel" id="save-button-1"><i class="fas fa-times"></i>Cancel</button>
              <button class="task-btn-basic task-btn-save" id="cancel-button-1"><i class="fas fa-plus"></i>Save</button>
            </div>
          </section>
        </form>
  
        <form class="task" id="task-item-2">
          <header class="task-title ">
            <h2>
              <span class="checkbox">
                <input class="check-is-complete task-data" id="check-3" type="checkbox" checked="" data-keyname="isComplete">
                <label class="check-custom" for="check-3"><i class="fas fa-check"></i></label>
              </span>
              <input onkeypress="if (event.keyCode == 13) {return false;}" class="task-name task-data cross-off" type="text" placeholder="Type Something Here..." value="睡覺" data-keyname="name">
            </h2>
            <div class="task-mark">
              <input class="task-mark-star task-data" id="isStar-3" type="checkbox" data-keyname="isStar">
              <label class="task-mark-star-custom" for="isStar-3"></label>
              <input class="task-mark-pen" id="isEdit-3" type="checkbox" data-keyname="isEdit">
              <label class="task-mark-pen-custom" for="isEdit-3" id="edit-pen-3"></label>
              <button type="submit" class="task-mark-delete" id="delete-3"><i class="far fa-trash-alt"></i></button>
            </div>
            <div class="task-tag">
              <span class="tag-item tag-time ">
                <i class="far fa-calendar-alt"></i><time>2020-12-31</time>
              </span>
              <span class="tag-item tag-file ">
                <i class="far fa-file"></i>
              </span>
              <span class="tag-item tag-comment ">
                <i class="far fa-comment-dots"></i>
              </span>
            </div>
          </header>
          <section class="task-form d-none">
            <div class="task-form-edit">
              <section class="task-form-item task-form-deadline">
                <h3><i class="far fa-calendar-alt"></i>Deadline</h3>
                <div action="">
                  <input class="task-data" type="date" value="2020-12-31" data-keyname="date">
                  <input class="task-data" type="time" value="19:50" data-keyname="time">
                </div>
              </section>
              <section class="task-form-item task-form-file">
                <h3><i class="far fa-file"></i>File</h3>
                <div class="file-caption">
                  <h4>imag0029.jpg</h4>
                  <time>2020.11.30</time>
                </div>
                <label class="file-add-button" for="add-file-3"><i class="fas fa-plus"></i></label>
                <input class="task-data file-input" type="file" data-keyname="file" id="add-file-3">
                <div class="file-add">
              </div></section>
              <section class="task-form-item task-form-comment">
                <h3><i class="far fa-comment-dots"></i>Comment</h3>
                <textarea class="task-data" name="" id="" cols="3" rows="3" placeholder="Type your meno here..." data-keyname="comment">測試aaa</textarea>
              </section>
            </div>
            <div class="task-btn">
              <button class="task-btn-basic task-btn-cancel" id="save-button-3"><i class="fas fa-times"></i>Cancel</button>
              <button class="task-btn-basic task-btn-save" id="cancel-button-3"><i class="fas fa-plus"></i>Save</button>
            </div>
          </section>
        </form>
      `;
      expect(tasksList.innerHTML.replace(/\s/g, '')).toBe(expectedResult.replace(/\s/g, ''));
    })
    test('代辦任務數量是否剩下 1 個', () => {
      const taskLeft = getByTestId(document.body, 'taskLeft');
      expect(taskLeft.textContent).toBe('1');
    })
  })
})
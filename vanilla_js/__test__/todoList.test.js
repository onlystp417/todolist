// 要從 @testing-library/dom 中 import 一些必要的 method
// 查找 element 的 getByText 和 getByTestId 還有執行事件觸發的 fireEvent
const {
  getByTestId, getAllByTestId, fireEvent
} = require('@testing-library/dom');

const { buildTaskForm } = require('../js/BuildElement.js');

// 引入 tab 的操作功能
import { initTabEvent } from '../js/module/data/tabOperator.js';

describe('測試 tab 操作', () => {
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

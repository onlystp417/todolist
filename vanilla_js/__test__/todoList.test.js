// 要從 @testing-library/dom 中 import 一些必要的 method
// 查找 element 的 getByText 和 getByTestId 還有執行事件觸發的 fireEvent
const {
  getByText, getByTestId, fireEvent
} = require('@testing-library/dom');

const { buildTaskForm } = require('../js/BuildElement.js');

describe('測試 todoList 功能', () => {
  describe('任務卡片的內容是否正常', () => {
    const todoData = {
      comment: "睡個好覺",
      date: "2020-11-30",
      file: "imag0014.jpg",
      fileTime: "2020.11.25",
      isComplete: false,
      isStar: true,
      name: "吃飯",
      time: "22:00"
    };
    const index = 1;

    const resultComment = "睡個好覺";
    const resultDate = "2020-11-30";
    const resultFile = "imag0014.jpg";
    const resultFileTime = "2020.11.25";
    const resultIsComplete = "<inputclass=\"check-is-completetask-data\"id=\"check-2\"type=\"checkbox\"data-keyname=\"isComplete\">";
    const resultIsStar = "<inputclass=\"task-mark-startask-data\"id=\"isStar-2\"type=\"checkbox\"data-keyname=\"isStar\"checkeddata-keyname=\"isStar\">";
    const resultName = "吃飯";
    const resultTime = "22:00";

    test('任務備註內容', () => {
      expect(buildTaskForm(todoData, index)).toEqual(expect.stringContaining(resultComment));
    });
    test('任務日期', () => {
      expect(buildTaskForm(todoData, index)).toEqual(expect.stringContaining(resultDate));
    });
    test('任務附檔名稱', () => {
      expect(buildTaskForm(todoData, index)).toEqual(expect.stringContaining(resultFile));
    });
    test('任務完成UI', () => {
      expect(buildTaskForm(todoData, index).replace(/\s/g, '')).toEqual(expect.stringContaining(resultIsComplete.replace(/\s/g, '')));
    });
    test('任務附檔上傳時間', () => {
      expect(buildTaskForm(todoData, index)).toEqual(expect.stringContaining(resultFileTime));
    });
    test('任務標星星UI', () => {
      expect(buildTaskForm(todoData, index).replace(/\s/g, '')).toEqual(expect.stringContaining(resultIsStar.replace(/\s/g, '')));
    });
    test('任務名稱', () => {
      expect(buildTaskForm(todoData, index)).toEqual(expect.stringContaining(resultName));
    });
    test('任務時間', () => {
      expect(buildTaskForm(todoData, index)).toEqual(expect.stringContaining(resultTime));
    });
  })
})
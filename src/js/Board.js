/* eslint-disable class-methods-use-this */
import Column from './Column';
import Task from './Task';
import StateService from './StateService';

export default class Board {
  constructor(container) {
    this.container = container;
    this.onClickAddTask = this.onClickAddTask.bind(this);
    this.state = [];
    this.stateService = new StateService();
  }

  init() {
    // Рисуем доску
    this.bintToDOM();

    // Рисуем колонку 1
    this.toDoColumn = new Column(this.boardContainer, 'todo');
    this.toDoColumn.bindToDOM();
    // Рисуем колонку 2
    this.inProgressColumn = new Column(this.boardContainer, 'progress');
    this.inProgressColumn.bindToDOM();
    // Рисуем колонку 3
    this.doneColumn = new Column(this.boardContainer, 'done');
    this.doneColumn.bindToDOM();
    this.addEvents();
  }

  addEvents() {
    const allForms = this.container.querySelectorAll('.add-task');
    const addCardButtonElements = this.boardContainer.querySelectorAll('.task-add-card button');
    addCardButtonElements.forEach((element) => element.addEventListener('click', (event) => this.onClickAddTask(event)));
    const cancelTaskButtonElements = this.boardContainer.querySelectorAll('.add-task-close');
    cancelTaskButtonElements.forEach((element) => element.addEventListener('click', (event) => this.onClickCancelTask(event)));

    allForms.forEach((element) => {
      element.addEventListener('submit', (event) => {
        this.createNewTask(event);
        this.onClickCancelTask(event);
      });
    });

    allForms.forEach((element) => {
      element.addEventListener('submit', (event) => {
        this.createNewTask(event);
        // this.onClickCancelTask();
      });
    });
  }

  static get markup() {
    return '<div class="board"></div>';
  }

  bintToDOM() {
    this.container.insertAdjacentHTML('beforeend', Board.markup);
  }

  get boardContainer() {
    return this.container.querySelector('.board');
  }

  onClickAddTask(event) {
    const parentElement = event.currentTarget.closest('.column-container');
    const addTaskElement = parentElement.querySelector('.add-task');
    addTaskElement.classList.toggle('hidden');
  }

  onClickCancelTask(event) {
    event.preventDefault();
    const parentElement = event.currentTarget.closest('.column-container');
    const addTaskElement = parentElement.querySelector('.add-task');
    addTaskElement.reset();
    addTaskElement.classList.toggle('hidden');
  }

  createNewTask(event) {
    console.log(`event - ${event}`);
    console.log(`event value - ${event.currentTarget[0].value}`);
    console.log(event[0]);
    event.preventDefault();
    const parentElement = event.currentTarget.closest('.column-container');
    const taskContainer = parentElement.querySelector('.task-items');
    const title = event.currentTarget[0].value;
    const id = performance.now();
    const newTask = new Task(taskContainer);
    const infoTask = {
      title,
      column: parentElement.dataset.idColumn,
      id,
    };
    newTask.bintToDOM(title, id);
    console.log(`tasks - ${infoTask}`);
    // event.currentTarget[0].value = '';
  }
}

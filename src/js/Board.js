/* eslint-disable class-methods-use-this */
import Column from './Column';
import Task from './Task';
import StateService from './StateService';

export default class Board {
  constructor(container) {
    this.container = container;
    this.onClickAddTask = this.onClickAddTask.bind(this);
    this.tasks = [];
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
    // Загрузка задач из хранилища
    this.tasks = this.stateService.getTasks();
    this.loadInitialState(this.tasks);
    this.addEvents();
  }

  addEvents() {
    const allForms = this.container.querySelectorAll('.add-task');
    const allTasks = this.container.querySelectorAll('.task-items');
    const ulElements = this.container.querySelectorAll('ul');

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
    allTasks.forEach((element) => {
      element.addEventListener('click', (event) => {
        if (event.target.classList.contains('task-del') || event.target.tagName === 'SPAN') {
          this.deleteTask(event);
        }
      });
    });
    ulElements.forEach((element) => {
      element.addEventListener('mouseover', (event) => {
        // console.log(event);
        // console.log(event.target);
        if (event.target.tagName === 'LI' || event.target.classList.contains('task-header')) {
          this.showDelete(event);
        }
      });
      element.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('task-header') || event.target.tagName === 'SPAN') {
          return;
        }
        if (event.target.tagName === 'LI') {
          this.hideDelete(event);
        }
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
    // console.log(`event - ${event}`);
    // console.log(`event value - ${event.currentTarget[0].value}`);
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
    newTask.bindToDOM(title, id);
    // console.log(`tasks - ${infoTask}`);
    this.tasks.push(infoTask);
    this.stateService.saveTasks(this.tasks);
  }

  deleteTask(event) {
    const parentElement = event.target.closest('li');
    const idx = this.tasks.findIndex((el) => el.id === parentElement.dataset.id);
    this.tasks.splice(idx, 1);
    this.stateService.saveTasks(this.tasks);
    parentElement.remove();
  }

  showDelete(event) {
    const del = event.target.querySelector('button');
    del.classList.remove('hidden');
  }

  hideDelete(event) {
    const del = event.target.querySelector('button');
    del.classList.add('hidden');
  }

  loadInitialState(tasks) {
    for (const task of tasks) {
      // console.log(task)
      const columnContainer = this.container.querySelector(`.column-container[data-id-column="${task.column}"]`);
      const taskContainer = columnContainer.querySelector('.task-items');
      const newTask = new Task(taskContainer);
      newTask.bindToDOM(task.title, task.id);
    }
  }
}

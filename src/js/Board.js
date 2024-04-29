import Column from './Column';

export default class Board {
  constructor(container) {
    this.container = container;
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
}

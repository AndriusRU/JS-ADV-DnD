export default class Column {
  constructor(container, columnName) {
    this.container = container;
    this.name = columnName;
  }

  static markup(columnTitle) {
    return `<div class="column-container" data-id-column="${columnTitle}">
              <div class="column-header">
                <h3 class="column-title">${columnTitle}</h3>
              </div>
              <div class="tasks-container">
                <ul class="task-items"></ul>
              </div>
              <div class="column-footer">
                  <div class="task-add-card">
                    <button>+ <span>Add card<span></button>
                  </div>
                  <form class="add-task hidden">
                    <div class="wrapper-input">
                      <input type="text" class="add-task-input" placeholder="Введите название новой карточки..."/>
                    </div>               
                    <button class="add-task-newcard btn btn-primary">Add Card</button>
                    <button class="add-task-delete"><span></span></button>
                  </form>
              </div>
            </div>`;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML('beforeend', Column.markup(this.name));
  }
}

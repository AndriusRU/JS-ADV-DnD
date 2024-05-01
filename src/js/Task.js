export default class Task {
  constructor(container) {
    this.container = container;
  }

  static markup(title, id) {
    return `<li class="task" data-id="${id}">
              <div class="task-header">
                <h4>${title}</h4>
                <button class="task-del hidden"><span>&#10060</span></button>
              </div>
            </li>`;
  }

  bindToDOM(title, id) {
    this.container.insertAdjacentHTML('beforeend', Task.markup(title, id));
  }

  // static onClickAddTask(event) {
  //   const parentElement = event.currentTarget.closest('.tasks-container');
  //   const addTaskElement = parentElement.querySelector('.add-task');
  //   addTaskElement.classList.toggle('hidden');
  // }

  // init() {
  //   const addCardButtomElements = Board.boardContainer.querySelectorAll('.task-add-card button');
  //   addCardButtomElements.forEach((element) => {
  //     element.addEventListener('click', (event) => this.onClickAddTask(event));
  //   });
  // }
}

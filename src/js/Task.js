export default class Task {
  constructor(container) {
    this.container = container;
  }

  static markup(title, id) {
    return `<li class="task" data-id="${id}">
              <div class="task-header">
                <h4>${title}</h4>
                <button class="task-del hidden"><span></span></button>
              </div>
            </li>`;
  }

  bintToDOM(title, id) {
    this.container.insertAdjacentHTML('beforeend', Task.markup(title, id));
  }
}

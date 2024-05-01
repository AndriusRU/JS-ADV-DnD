export default class Task {
  constructor(container) {
    this.container = container;
  }

  static markup(title, column, id) {
    return `<li class="task" data-id="${id}" data-column="${column}">
              <div class="task-header">
                <h4>${title}</h4>
                <button class="task-del hidden"><span>&#10060</span></button>
              </div>
            </li>`;
  }

  bindToDOM(title, column, id) {
    this.container.insertAdjacentHTML('beforeend', Task.markup(title, column, id));
  }
}

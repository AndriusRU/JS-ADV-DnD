/* eslint-disable class-methods-use-this */
export default class StateService {
  getTasks() {
    const tasks = localStorage.getItem('tasks');
    let result;
    if (typeof tasks === 'string') {
      result = tasks;
    } else {
      result = [];
    }

    if (result.length !== 0) {
      return JSON.parse(result);
    }

    return result;
  }

  saveTasks(data) {
    localStorage.setItem('tasks', JSON.stringify(data));
  }
}

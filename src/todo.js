class Todo {
  #id;
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
  set id(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }
}

class Project {
  #id = 1;
  constructor(name) {
    this.name = name;
    this.Todos = [];
  }

  addTodo(todo) {
    todo.id = this.#id;
    this.#id++;
    this.Todos.push(todo);
  }

  removeTodo(id) {
    this.Todos = this.Todos.filter((todo) => todo.id != id);
  }
}

export { Todo, Project };

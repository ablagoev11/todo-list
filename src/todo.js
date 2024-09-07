import {
  createProject,
  createTask,
  resetTasks,
  selectProject,
  unselectProject,
  updateTasks,
  enableButton,
  disableButton,
} from "./create-todos";

class Task {
  #id;
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
  set id(id) {
    this.#id = "task-" + id;
  }

  get id() {
    return this.#id;
  }
}

class Project {
  #id;
  #taskId = 1;
  constructor(name) {
    this.name = name;
    this.Tasks = [];
  }

  addTask(task) {
    task.id = this.#taskId;
    this.#taskId++;
    this.Tasks.push(task);
    createTask(task);
  }

  removeTask(id) {
    this.Tasks = this.Tasks.filter((task) => task.id !== id);
    updateTasks(this);
  }

  set id(id) {
    this.#id = "project-" + id;
  }

  get id() {
    return this.#id;
  }
}

function ProjectController() {
  let id = 1;
  let projects = [];
  let current;

  function addProject(Project) {
    enableButton();
    Project.id = id;
    id++;
    projects.push(Project);
    createProject(Project);
    setCurrent(Project.id);
  }

  function getProject(id) {
    for (const project of projects) {
      if (project.id === id) return project;
    }
    return -1;
  }

  function removeProject(id) {
    projects = projects.filter((project) => project.id !== id);
    console.log(projects);
    if (id === getCurrent().id) resetTasks();
    if (projects.length === 0) disableButton();
  }

  function getCurrent() {
    if (current) return current;
    return -1;
  }
  function setCurrent(id) {
    if (getCurrent() != -1) unselectProject(current.id);
    current = getProject(id);
    updateTasks(current);
    selectProject(id);
  }

  return { addProject, getProject, getCurrent, setCurrent, removeProject };
}

export { Task, Project, ProjectController };

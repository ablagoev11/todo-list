import { Task, Project } from "./todo.js";
import { openModal, closeModal } from "./Modal/modal.js";

function createTask(Task) {
  const body = document.querySelector(".task-container");
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("id", Task.id);
  const title = document.createElement("h1");
  title.textContent = Task.title;
  const buttonClose = document.createElement("button");
  const flexDiv = document.createElement("div");
  flexDiv.classList.add("flex");
  flexDiv.appendChild(title);
  flexDiv.appendChild(buttonClose);
  const description = document.createElement("p");
  description.textContent = Task.description;
  const priority = document.createElement("h4");
  priority.textContent = Task.priority;
  const date = document.createElement("h4");
  date.textContent = Task.dueDate;
  task.appendChild(flexDiv);
  task.appendChild(description);
  task.appendChild(priority);
  task.appendChild(date);
  body.appendChild(task);
}

function updateTasks(Project) {
  const body = document.querySelector(".task-container");
  const Tasks = Project.Tasks;
  body.replaceChildren();
  for (const task of Tasks) {
    createTask(task);
  }
}

function resetTasks() {
  const body = document.querySelector(".task-container");
  body.replaceChildren();
}

function createProject(Project) {
  const projects = document.querySelector(".projects");
  const projectBody = document.createElement("div");
  const projectHeading = document.createElement("h3");
  projectHeading.textContent = Project.name;
  const projectButton = document.createElement("button");
  projectBody.appendChild(projectHeading);
  projectBody.appendChild(projectButton);
  projectBody.classList.add("project");
  projectBody.setAttribute("id", Project.id);
  projects.appendChild(projectBody);
}

function selectProject(id) {
  const projectDom = document.querySelector("#" + id);
  if (projectDom) projectDom.classList.add("selected");
}

function unselectProject(id) {
  const projectDom = document.querySelector("#" + id);
  if (projectDom && projectDom.classList.contains("selected"))
    projectDom.classList.remove("selected");
}

function handleProjectSelect(projectController) {
  const projectsDiv = document.querySelector(".projects");

  projectsDiv.addEventListener("click", (e) => {
    const projectDiv = e.target.closest(".project");
    if (projectDiv && e.target.tagName != "BUTTON")
      projectController.setCurrent(projectDiv.id);
  });
}
function enableButton() {
  const button = document.querySelector(".add-task");
  button.disabled = false;
}
function disableButton() {
  const button = document.querySelector(".add-task");
  button.disabled = true;
}
function handleProjectDelete(projectController) {
  const projectsDiv = document.querySelector(".projects");
  projectsDiv.addEventListener("click", (e) => {
    const projectDiv = e.target.closest(".project");
    if (e.target.tagName === "BUTTON" && projectDiv) {
      document.getElementById(projectDiv.id).remove();
      projectController.removeProject(projectDiv.id);
    }
  });
}

function handleTaskDelete(projectController) {
  const taskContainer = document.querySelector(".task-container");
  taskContainer.addEventListener("click", (e) => {
    const taskDiv = e.target.closest(".task");
    if (e.target.tagName === "BUTTON" && !e.target.textContent) {
      console.log("1111");
      projectController.getCurrent().removeTask(taskDiv.id);
    }
  });
}

export {
  createTask,
  createProject,
  updateTasks,
  selectProject,
  unselectProject,
  handleProjectSelect,
  handleProjectDelete,
  resetTasks,
  enableButton,
  disableButton,
  handleTaskDelete,
};

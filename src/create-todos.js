import { Todo, Project } from "./todo.js";

function createTask(Todo) {
  const body = document.querySelector(".body");
  const task = document.createElement("div");
  task.classList.add("task");
  const title = document.createElement("h1");
  title.textContent = Todo.title;
  const description = document.createElement("p");
  description.textContent = Todo.description;
  const priority = document.createElement("h4");
  priority.textContent = Todo.priority;
  const date = document.createElement("h4");
  date.textContent = Todo.dueDate;

  task.appendChild(title);
  task.appendChild(description);
  task.appendChild(priority);
  task.appendChild(date);
  body.appendChild(task);
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

const openButton = document.querySelector(".add-task");
const closeButton = document.querySelector(".close-button");
openButton.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);
export { createTask, openModal };

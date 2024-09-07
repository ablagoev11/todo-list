import style from "./modal-style.css";
import { Project, Task } from "../todo";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

function openModal(type) {
  const modalTitle = document.querySelector(".modal-title");
  const modalContent = document.querySelector(".modal-content");
  const modalAddButton = document.querySelector(".add-modal");

  if (type === "task") {
    modalContent.innerHTML = `
     <div class="label-container">
        <label for="title">Title</label>
        <input type="text" id="title" />
      </div>
      <div class="label-container">
        <label for="due-date">Due Date</label>
        <input type="date" id="due-date" />
      </div>
      <div class="label-container">
        <label for="note">Note</label>
        <textarea id="note"></textarea>
      </div>
      <fieldset>
        <legend>Priority</legend>
        <input type="radio" name="priority" id="not-urgent" />
        <label for="not-urgent">Can Wait</label>
        <input type="radio" name="priority" id="urgent" />
        <label for="urgent">Urgent</label>
      </fieldset>
    `;
    modalAddButton.textContent = "Add Task";
    modalTitle.textContent = "Task";
  } else {
    modalContent.innerHTML = `
    <div class="label-container">
        <label for="title">Title</label>
        <input type="text" id="title" />
      </div>`;
    modalAddButton.textContent = "Add Project";
    modalTitle.textContent = "Project";
  }
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function handleModalTask(projectController) {
  const modalAdd = document.querySelector(".add-modal");
  modalAdd.addEventListener("click", () => {
    const modalTitle = document.querySelector(".modal-title");
    const title = document.querySelector("#title").value;

    if (modalTitle.textContent === "Task") {
      const dueDate = document.querySelector("#due-date").value;
      const note = document.querySelector("#note").value;
      const notUrgent = document.querySelector("#not-urgent").checked;
      const urgent = document.querySelector("#urgent").checked;
      let task;
      if (title && dueDate && note && (notUrgent || urgent)) {
        task = new Task(title, note, dueDate, urgent ? "Urgent" : "Can Wait");
        projectController.getCurrent().addTask(task);
        closeModal();
      } else {
        console.log("Missing");
      }
    } else {
      let project;
      if (title) {
        project = new Project(title);
        projectController.addProject(project);
        closeModal();
      } else {
        console.log("Missing");
      }
    }
  });
}

const ModalController = (() => {
  const openButton = document.querySelector(".add-task");
  const projectOpenButton = document.querySelector(".add");
  const closeButton = document.querySelector(".close-button");
  openButton.addEventListener("click", () => {
    openModal("task");
  });
  projectOpenButton.addEventListener("click", () => {
    openModal("project");
  });
  overlay.addEventListener("click", closeModal);
  closeButton.addEventListener("click", closeModal);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const isNotCombinedKey = !(e.ctrlKey || e.altKey || e.shiftKey);
      if (isNotCombinedKey) {
        closeModal();
      }
    }
  });
})();

export { handleModalTask };

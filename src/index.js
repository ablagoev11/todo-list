import {
  handleProjectSelect,
  handleProjectDelete,
  createTask,
  handleTaskDelete,
} from "./create-todos";
import { handleModalTask } from "./Modal/modal";
import style from "./styles.css";
import { Todo, Project, ProjectController, Task } from "./todo";

const projectController = ProjectController();
projectController.addProject(new Project("Default"));

projectController
  .getCurrent()
  .addTask(
    new Task(
      "Do the dishes",
      "Load the dishawasher, turn the dishwasher on, unload the dishwasher",
      new Date(2024, 8, 9),
      "Urgent"
    )
  );
handleProjectDelete(projectController);
handleProjectSelect(projectController);
handleModalTask(projectController);
handleTaskDelete(projectController);

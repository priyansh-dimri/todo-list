import createTask from "../task/createTask";
import populateDisplay from "./display";

const priorityName = {
  0: "low",
  1: "medium",
  2: "high",
};

const addTaskFormDialog = document.getElementById("add-task-form");

const clearTaskForm = () => {
  const taskTitle = document.getElementById("task-title");
  taskTitle.value = "";

  const taskDescription = document.getElementById("task-description");
  taskDescription.value = "";

  const dueDate = document.getElementById("due-date");
  dueDate.value = "";

  const priority = document.getElementById("priority");
  priority.value = 1;
};

const confirmTaskCreate = () => {
  const taskTitle = document.getElementById("task-title").value;
  if (!taskTitle) return;

  const taskDescription =
    document.getElementById("task-description").value;

  const dueDate = document.getElementById("due-date").value;
  if (!dueDate) return;

  const projectName = document.getElementById("select-project").value;

  const priority = priorityName[document.getElementById("priority").value];

  createTask(projectName, taskTitle, taskDescription, dueDate, priority);
  clearTaskForm();
  addTaskFormDialog.close();
  populateDisplay();
};

const setupCreateTaskElements = () => {
  const addTaskCancelBtn = document.getElementById("add-task-cancel");
  addTaskCancelBtn.addEventListener("click", () => {
    clearTaskForm();
    addTaskFormDialog.close();
  });

  const addTaskConfirmBtn = document.getElementById("add-task-confirm");
  addTaskConfirmBtn.addEventListener("click", () => confirmTaskCreate());
};

export default setupCreateTaskElements;

import { addTask } from "../storage/setData";

function createTask(projectName, title, description, dueDate, priority) {
  addTask(projectName, {
    title,
    description,
    dueDate,
    priority,
    checked: false,
  });
}

export default createTask;
import deleteIconPath from "./../../assets/delete.svg";
import addTaskIconPath from "./../../assets/add.svg";
import checkedIcon from "./../../assets/checked.svg";
import uncheckedIcon from "./../../assets/unchecked.svg";
import { getAllProjects, getAllNonHiddenProjects, getTask } from "../storage/getData";
import { deleteProject, deleteTask } from "../storage/setData";
import toggleTask from "../task/toggleTask";
import { formatDistanceToNow } from "date-fns";
import populateDisplay from "./display";

const createProjectOption = (projectName) => {
  const projectOption = document.createElement("option");
  projectOption.textContent = projectName;

  return projectOption;
};

const showAddTaskForm = (projectName) => {
  const addTaskForm = document.getElementById("add-task-form");
  addTaskForm.showModal();

  const projectSelect = document.getElementById("select-project");
  projectSelect.replaceChildren();

  const allProjectNames = getAllProjects();
  allProjectNames.forEach((pName) =>
    projectSelect.appendChild(createProjectOption(pName))
  );

  projectSelect.value = projectName;
};

const createProjectCardTitleContainer = (projectName) => {
  const projectCardTitleContainer = document.createElement("div");
  projectCardTitleContainer.className = "project-card-title-container";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = deleteIconPath;
  deleteIcon.alt = "Delete project";
  deleteIcon.role = "button";
  deleteIcon.className = "icon";
  deleteIcon.dataset.value = projectName;
  deleteIcon.addEventListener("click", (e) => {
    let projectToDelete = e.target.dataset.value;
    deleteProject(projectToDelete);
    populateDisplay();
  });

  const projectCardTitle = document.createElement("div");
  projectCardTitle.className = "project-card-title";
  projectCardTitle.textContent = projectName;

  const addTaskIcon = document.createElement("img");
  addTaskIcon.src = addTaskIconPath;
  addTaskIcon.alt = "Add task";
  addTaskIcon.role = "button";
  addTaskIcon.className = "icon";
  addTaskIcon.dataset.value = projectName;
  addTaskIcon.addEventListener("click", (e) => {
    let taskProjectName = e.target.dataset.value;
    showAddTaskForm(taskProjectName);
  });

  projectCardTitleContainer.append(deleteIcon, projectCardTitle, addTaskIcon);
  return projectCardTitleContainer;
};

const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const createTaskCard = (task, idx, projectName) => {
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";

  const taskChecked = task.checked;
  const taskCheckedIcon = document.createElement("img");
  taskCheckedIcon.src = taskChecked ? checkedIcon : uncheckedIcon;
  taskCheckedIcon.alt = taskChecked ? "Uncheck" : "Check";
  taskCheckedIcon.role = "button";
  taskCheckedIcon.classList.add("icon", "task-check");
  taskCheckedIcon.dataset.value = projectName;
  taskCheckedIcon.dataset.idx = idx;
  taskCheckedIcon.addEventListener("click", (e) => {
    let projectTaskToToggle = e.target.dataset.value;
    let taskIdx = e.target.dataset.idx;
    toggleTask(projectTaskToToggle, taskIdx);
    populateDisplay();
  });

  const deleteTaskIcon = document.createElement("img");
  deleteTaskIcon.src = deleteIconPath;
  deleteTaskIcon.classList.add("icon", "task-delete");
  deleteTaskIcon.dataset.value = projectName;
  deleteTaskIcon.dataset.idx = idx;
  deleteTaskIcon.addEventListener("click", (e) => {
    let projectTaskToDelete = e.target.dataset.value;
    let taskIdx = e.target.dataset.idx;
    deleteTask(projectTaskToDelete, taskIdx);
    populateDisplay();
  });

  const showTaskDetails = (task, projectName) => {
    const taskDetailDialog = document.getElementById("task-detail");
    taskDetailDialog.showModal();

    const taskTitle = document.getElementById("task-detail-title");
    taskTitle.textContent = task.title;

    const taskDetailDescription = document.getElementById("task-detail-description");
    taskDetailDescription.textContent = task.description;

    const taskDetailProjectName = document.getElementById("task-detail-project-name");
    taskDetailProjectName.textContent = projectName;

    const taskDetailDueDate = document.getElementById("task-detail-due-date");
    taskDetailDueDate.textContent = formatDistanceToNow(task.dueDate);

    const taskPriority = document.getElementById("task-detail-priority");
    taskPriority.className = `${task.priority}-priority`;
    taskPriority.textContent = capitalizeFirstLetter(task.priority) + " Priority";
  }

  const taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = task.title;
  taskTitle.dataset.idx = idx;
  taskTitle.dataset.value = projectName;
  taskTitle.addEventListener("click", (e) => {
    let taskIdx = e.target.dataset.idx;
    let taskProjectName = e.target.dataset.value;

    const taskDetails = getTask(taskProjectName, taskIdx);
    showTaskDetails(taskDetails, projectName);
  });

  const dueDate = document.createElement("div");
  dueDate.className = "due-date";
  dueDate.textContent = formatDistanceToNow(task.dueDate);

  const priority = document.createElement("div");
  priority.classList.add("priority", `${task.priority}-priority`);
  priority.textContent = capitalizeFirstLetter(task.priority) + " Priority";

  taskCard.append(
    taskCheckedIcon,
    taskTitle,
    dueDate,
    priority,
    deleteTaskIcon
  );
  return taskCard;
};

const createTaskCardsContainer = (tasks, projectName) => {
  const taskCardsContainer = document.createElement("div");
  taskCardsContainer.className = "task-cards-container";

  tasks.forEach((task, idx) => {
    taskCardsContainer.appendChild(createTaskCard(task, idx, projectName));
  });

  return taskCardsContainer;
};

const createProjectCard = (projectName, project) => {
  const projectCard = document.createElement("div");
  projectCard.className = "project-card";

  projectCard.append(
    createProjectCardTitleContainer(projectName),
    createTaskCardsContainer(project.tasks, projectName)
  );

  return projectCard;
};

const populateMain = () => {
  const main = document.getElementById("main-sub-container");
  main.replaceChildren();
  const allNonHiddenProjects = getAllNonHiddenProjects();
  Object.keys(allNonHiddenProjects).forEach((projectName) => {
    main.appendChild(
      createProjectCard(projectName, allNonHiddenProjects[projectName])
    );
  });
};

export default populateMain;

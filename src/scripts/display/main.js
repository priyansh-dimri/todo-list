import deleteIconPath from "./../../assets/delete.svg";
import addTaskIconPath from "./../../assets/add.svg";
import checkedIcon from "./../../assets/checked.svg";
import uncheckedIcon from "./../../assets/unchecked.svg";
import { getAllProjects } from "../storage/getData";
import { deleteProject } from "../storage/setData";
import toggleTask from "../task/toggleTask";
import { formatDistanceToNow } from "date-fns";

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
    console.log(e.target);
    let projectToDelete = e.target.dataset.value;
    deleteProject(projectToDelete);
    populateMain(); // TODO: Change this to populate entire site data function. Similarly in sidebar's hide button
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
    // TODO: add function to display add task dialog
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
    console.log(e.target);
    let projectTaskToToggle = e.target.dataset.value;
    let taskIdx = e.target.dataset.idx;
    toggleTask(projectTaskToToggle, idx);
    populateMain(); // TODO: add page entire site populate function here too.
  });

  const taskTitle = document.createElement("div");
  taskTitle.className = "task-title";
  taskTitle.textContent = task.title;

  const dueDate = document.createElement("div");
  dueDate.className = "due-date";
  dueDate.textContent = formatDistanceToNow(task.dueDate);

  const priority = document.createElement("div");
  priority.classList.add("priority", `${task.priority}-priority`);
  priority.textContent = capitalizeFirstLetter(task.priority) + " Priority";

  taskCard.append(taskCheckedIcon, taskTitle, dueDate, priority);
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
  const allNonHiddenProjects = getAllProjects();
  Object.keys(allNonHiddenProjects).forEach((projectName) => {
    main.appendChild(
      createProjectCard(projectName, allNonHiddenProjects[projectName])
    );
  });
};

export default populateMain;
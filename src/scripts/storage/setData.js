function addProject(projectName, project) {
  let localStorage = window["localStorage"];
  localStorage.setItem(projectName, JSON.stringify(project));
}

function deleteProject(projectName) {
  let localStorage = window["localStorage"];
  localStorage.removeItem(projectName);
}

function toggleProjectHide(projectName) {
  let localStorage = window["localStorage"];

  const project = JSON.parse(localStorage.getItem(projectName));
  project.hide = !project.hide;

  addProject(projectName, project);
}

function addTask(projectName, task) {
  let localStorage = window["localStorage"];

  const project = JSON.parse(localStorage.getItem(projectName));
  project.tasks.push(task);

  addProject(projectName, project);
}

function deleteTask(projectName, idx) {
  let localStorage = window["localStorage"];

  const project = JSON.parse(localStorage.getItem(projectName));
  project.tasks.splice(idx, 1);

  addProject(projectName, project);
}

function toggleTaskChecked(projectName, idx) {
  let localStorage = window["localStorage"];

  const project = JSON.parse(localStorage.getItem(projectName));
  project.task.checked = !project.task.checked;

  addProject(projectName, project);
}

export { addProject, deleteProject, toggleProjectHide, addTask, deleteTask, toggleTaskChecked };
g
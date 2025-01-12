function addProject(projectName, project) {
  let localStorage = window["localStorage"];
  localStorage.setItem(projectName, JSON.stringify(project));
}

function deleteProject(projectName) {
  let localStorage = window["localStorage"];
  localStorage.removeItem(projectName);
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

export { addProject, deleteProject, addTask, deleteTask };

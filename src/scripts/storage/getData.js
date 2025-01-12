function getAllProjects() {
  let allProjects = {};

  Object.keys(localStorage).forEach((key) => {
    const project = localStorage.getItem(key);
    allProjects[key] = JSON.parse(project);
  });

  return allProjects;
}

function getAllProjectNames() {
    return Object.keys(localStorage);
}

function getTask(projectName, idx) {
  const project = localStorage.getItem(projectName);
  if(!project) return undefined;

  const parsedProject = JSON.parse(project);
  if (parsedProject.tasks.length > idx) return parsedProject.tasks[idx];
  return undefined;
}

function projectExists(projectName) {
    return localStorage.getItem(projectName) ? true : false;
}

export { getAllProjects, getAllProjectNames, getTask, projectExists };

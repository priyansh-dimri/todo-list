function getAllProjects() {
  return Object.keys(localStorage);
}

// Returns non hidden projects
function getAllNonHiddenProjects() {
  let allProjects = {};

  Object.keys(localStorage).forEach((key) => {
    const project = JSON.parse(localStorage.getItem(key));
    if(!project.hide) allProjects[key] = project;
  });

  return allProjects;
}

function getAllProjectNamesAndVisibility() {
    const projectVisibility = {};
    
    Object.keys(localStorage).forEach((key) => {
      const project = localStorage.getItem(key);
      projectVisibility[key] = (JSON.parse(project)).hide;
    });

    return projectVisibility;
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

export { getAllProjects, getAllNonHiddenProjects, getAllProjectNamesAndVisibility, getTask, projectExists };

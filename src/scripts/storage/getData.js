// Returns non hidden projects
function getAllProjects() {
  let allProjects = {};

  Object.keys(localStorage).forEach((key) => {
    const project = localStorage.getItem(key);
    if(!project.hide) allProjects[key] = JSON.parse(project);
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

export { getAllProjects, getAllProjectNamesAndVisibility, getTask, projectExists };

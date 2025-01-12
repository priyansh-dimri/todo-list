import { projectExists } from "../storage/getData";
import { addProject } from "../storage/setData";

function createProject(projectName) {
  if (!projectExists(projectName)) {
    addProject(projectName, {
      hide: false,
      tasks: [],
    });
  }
}

export {createProject};
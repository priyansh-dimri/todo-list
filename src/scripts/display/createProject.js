import createProject from "../project/createProject";
import populateDisplay from "./display";

const clearCreateProjectForm = () => {
  const projectNameInput = document.getElementById("project-name");
  projectNameInput.value = "";
};

const confirmProjectCreate = () => {
  const projectName = document.getElementById("project-name").value;
  if (!projectName) return; // Do nothing on empty project name

  createProject(projectName);
  populateDisplay();
};

const setupCreateProjectElements = () => {
  const addProjectDialog = document.getElementById("add-project-form");

  const addProjectBtn = document.getElementById("add-project");
  addProjectBtn.addEventListener("click", () => addProjectDialog.showModal());

  const addProjectCancelBtn = document.getElementById("add-project-cancel");
  addProjectCancelBtn.addEventListener("click", () => {
    clearCreateProjectForm();
    addProjectDialog.close();
  });

  const addProjectConfirmBtn = document.getElementById("add-project-confirm");
  addProjectConfirmBtn.addEventListener("click", () => {
    confirmProjectCreate();
    clearCreateProjectForm();
    addProjectDialog.close();
  });
};

export default setupCreateProjectElements;

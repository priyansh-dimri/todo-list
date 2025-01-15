import hashIconPath from "./../../assets/project-icon.svg";
import hideEye from "./../../assets/hide.svg";
import showEye from "./../../assets/show.svg";
import { getAllProjectNamesAndVisibility } from "../storage/getData";
import toggleProject from "./../project/hideProject";
import populateDisplay from "./display";

const createHashIcon = () => {
  const hashIcon = document.createElement("img");
  hashIcon.className = "icon";
  hashIcon.alt = "Hash icon";
  hashIcon.src = hashIconPath;

  return hashIcon;
}

const createVisibilityImage = (visible) => {
  const visibilityImage = document.createElement("img");
  visibilityImage.className = "icon";
  visibilityImage.alt = visible ? "Hide" : "Show";
  visibilityImage.src = visible ? hideEye : showEye;

  return visibilityImage;
};

const createProjectVisibleButton = (projectName, visible) => {
  const toggleButton = document.createElement("button");
  toggleButton.className = "toggle-project";
  toggleButton.type = "button";
  toggleButton.ariaLabel = "Toggle project visibility";
  toggleButton.value = projectName;

  toggleButton.appendChild(createVisibilityImage(visible));
  toggleButton.addEventListener("click", (e) => {
    const projectNameToToggle = e.target.parentNode.value;
    if (projectNameToToggle) {
      toggleProject(projectNameToToggle);
      populateDisplay();
    }
  });
  return toggleButton;
};

const createProjectTitleSubContainer = (projectName, visible) => {
  const projectTitleSubContainer = document.createElement("div");
  projectTitleSubContainer.className = "projects-title-sub-container";

  const projectTitle = document.createElement("div");
  projectTitle.className = "project-title";
  projectTitle.textContent = projectName;

  projectTitleSubContainer.append(
    createHashIcon(),
    projectTitle,
    createProjectVisibleButton(projectName, visible)
  );

  return projectTitleSubContainer;
};

const populateSidebar = () => {
  const projectTitlesContainer = document.getElementById(
    "projects-titles-container"
  );
  projectTitlesContainer.replaceChildren();

  const allProjectNamesVisibility = getAllProjectNamesAndVisibility();

  for (let projectName in allProjectNamesVisibility) {
    const visible = allProjectNamesVisibility[projectName];
    projectTitlesContainer.append(
      createProjectTitleSubContainer(projectName, visible)
    );
  }
};

export default populateSidebar;

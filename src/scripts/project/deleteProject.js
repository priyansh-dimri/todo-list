import { deleteProject } from "../storage/setData";
import { projectExists } from "../storage/getData";

function removeProject(projectName) {
    if(projectExists(projectName)) {
        deleteProject(projectName);
    }
}

export default removeProject;
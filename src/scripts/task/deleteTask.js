import { deleteTask } from "../storage/setData";

function removeTask(projectName, idx) {
    deleteTask(projectName, idx);
}

export default removeTask;
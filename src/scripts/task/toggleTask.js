import { toggleTaskChecked } from "../storage/setData";

function toggleTask(projectName, idx) {
    toggleTaskChecked(projectName, idx);
}

export default toggleTask;
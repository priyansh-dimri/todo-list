import './styles/reset.css';
import './styles/styles.css';
import populateDisplay from './scripts/display/display';
import setupCreateProjectElements from './scripts/display/createProject';
import setupCreateTaskElements from './scripts/display/createTask';
import setupTaskDetailsElements from './scripts/display/taskDetail';

populateDisplay();
setupCreateProjectElements();
setupCreateTaskElements();
setupTaskDetailsElements();
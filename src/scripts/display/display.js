import populateMain from "./main";
import populateSidebar from "./sidebar";

const populateDisplay = () => {
  populateMain();
  populateSidebar();
};

export default populateDisplay;
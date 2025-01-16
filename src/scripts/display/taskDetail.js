const taskDetailDialog = document.getElementById("task-detail");

const setupTaskDetailsElements = () => {
  const taskDetailCancelBtn = document.getElementById("task-detail-cancel");
  taskDetailCancelBtn.addEventListener("click", () => {
    taskDetailDialog.close();
  });
};

export default setupTaskDetailsElements;

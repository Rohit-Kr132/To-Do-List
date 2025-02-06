// Get DOM elements
const taskInput = document.querySelector(".input-box");
const addButton = document.querySelector(".add-button");
const displaySection = document.querySelector(".display-section");

// Initialize tasks array
let tasks = [];
let completedTasks = [];

// Add task function
function addTask() {
  if (taskInput.value.trim() === "") return;

  const task = {
    id: Date.now(),
    text: taskInput.value,
    completed: false,
  };

  tasks.push(task);
  renderTask(task);
  taskInput.value = "";
}

// Render task function
function renderTask(task) {
  const taskLine = document.createElement("li");
  taskLine.classList.add("task-line");
  taskLine.setAttribute("data-id", task.id);

  taskLine.innerHTML = `
    <span class="taskbox">${task.text}</span>
            <span class="task-buttons">
              <ion-icon
                name="checkmark-circle-outline"
                class="task-button checkbox"></ion-icon>
              <ion-icon
                name="close-circle-outline"
                class="task-button delete"></ion-icon>
            </span>
  `;

  displaySection.appendChild(taskLine);

  // Add event listeners for buttons
  const checkBtn = taskLine.querySelector(".checkbox");
  const closeBtn = taskLine.querySelector(".delete");

  checkBtn.addEventListener("click", () =>
    completeTask(task.id, taskLine, checkBtn, closeBtn)
  );
  closeBtn.addEventListener("click", () => deleteTask(task.id, taskLine));
}

// Complete task function
function completeTask(taskId, taskLine, checkBtn, closeBtn) {
  taskLine.classList.add("checked");
  checkBtn.classList.add("hidden");

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    completedTasks.push(tasks[taskIndex]);
    tasks.splice(taskIndex, 1);
  }
}

// Delete task function
function deleteTask(taskId, taskLine) {
  taskLine.remove();
  const taskIndex = completedTasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    completedTasks.splice(taskIndex, 1);
  }
}

// Event listeners
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

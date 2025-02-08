// Get DOM elements
const inputFieldEl = document.querySelector(".input-box");
const addButtonEl = document.querySelector(".add-button");
const taskListEl = document.querySelector(".task-list");

//Event Listeners
addButtonEl.addEventListener("click", addTask);

// Enter key event
inputFieldEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Task list event
taskListEl.addEventListener("click", function (e) {
  const taskEl = e.target.parentElement.parentElement;
  if (e.target.classList.contains("checkbox")) {
    taskEl.classList.toggle("checked");
    if (taskEl.classList.contains("checked"))
      e.target.name = "checkmark-circle";
    else e.target.name = "checkmark-circle-outline";
  } else if (e.target.classList.contains("delete")) {
    taskEl.remove();
  }
});

//Functions
function addTask() {
  const task = inputFieldEl.value;

  if (task) {
    const taskEl = document.createElement("li");
    taskEl.classList.add("task-line");
    taskEl.innerHTML = `
    <span class="taskbox">${task}</span>
    <span class="task-buttons">
      <ion-icon
        name="checkmark-circle-outline"
        class="task-button checkbox"></ion-icon>
      <ion-icon
        name="close-circle-outline"
        class="task-button delete"></ion-icon>
    </span>
  `;
    inputFieldEl.value = "";
    taskListEl.appendChild(taskEl);
  }
}

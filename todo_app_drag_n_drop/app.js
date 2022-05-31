// const trash = "https://image.flaticon.com/icons/svg/1214/1214428.svg";

// Add an event listener to the #add-task input field
// Only addTask if there is text in the input
// Remove the task text in the input once its added

document.getElementById("add-task").addEventListener("click", function () {
  let taskValue = document.getElementById("task-value").value;
  if (taskValue) addTask(taskValue);
  document.getElementById("task-value").value = "";
});

////// TASK FUNCTIONS

// Create a function addTask

const addTask = (taskValue) => {
  let task = document.createElement("li");
  task.classList.add("task");
  task.draggable = true;
  //   task.textContent = taskValue;
  task.addEventListener("dragstart", dragStart);
  task.addEventListener("dragend", dragEnd);
  let taskContent = document.createElement("div");
  taskContent.classList.add("task-content");
  taskContent.textContent = taskValue;
  task.appendChild(taskContent);

  let trash = document.createElement("div");
  trash.classList.add("trash");
  trash.innerText = "X";
  trash.addEventListener("click", removeTask);
  task.appendChild(trash);

  let container = document.getElementById("tasks-added");
  container.prepend(task);
  console.log("task", task);
};

// Create a function removeTask

const removeTask = (event) => {
  let task = event.target.parentNode;
  console.log(task);
  task.remove();
};

////// DRAG & DROP

// Create a variable task to store the selected task
let task;

// Add an event listener dragstart to task

const dragStart = (event) => {
  console.log("START", event);
  event.target.className += " hold";
  task = event.target;
  setTimeout(() => (event.target.className = "invisible"), 0);
};

// Create a dragEnd function

const dragEnd = () => {
  console.log("END");
  event.target.className = "task fill";
};

// Create dropzones by selecting .dropzone
const dropzones = document.querySelectorAll(".dropzone");

// Add eventlisteners to each dropzone
for (const dropzone of dropzones) {
  dropzone.addEventListener("dragEnter", dragEnter);
  dropzone.addEventListener("dragover", dragOver);
  dropzone.addEventListener("dragleave", dragLeave);
  dropzone.addEventListener("drop", dragDrop);
}

// Create a function dragEnter
const dragEnter = (event) => {
  // console.log("ENTER");
  event.preventDefault();
  if (event.target.className === "column dropzone") {
    event.target.className += " hovered";
  }
};

const dragOver = (event) => {
  // console.log("OVER");
  event.preventDefault();
};

const dragLeave = (event) => {
  // console.log("LEAVE");
  if (event.target.className === "column dropzone hovered") {
    event.target.className = "column dropzone";
  }
};

const dragDrop = (event) => {
  // console.log("DROP");
  if (event.target.className === "column dropzone hovered") {
    event.target.className = "column dropzone";
  }
  event.target.append(task);
};
// Create a function dragDrop

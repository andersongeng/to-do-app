const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const toDoList = document.getElementById("toDoList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const emptyInput = () => {
    alert("Invalid input");
};
function renderTasks() {
    toDoList.innerHTML = "";
    tasks.forEach((task) => createNewTask(task));
};
function createNewTask(taskContent) {
        const savedTask = document.createElement("li");
        savedTask.className = "task";
        const taskCheck = document.createElement("input");
        taskCheck.type = "checkbox";
        taskCheck.className = "taskCheck";
        taskCheck.setAttribute("name", "checkTask");
        taskCheck.checked = taskContent.done;
        const taskText = document.createElement("span");
        taskText.textContent = taskContent.text;
        taskText.style.textDecoration = taskContent.done ? "line-through" : "none";
        const deleteTask = document.createElement("i");
        deleteTask.classList.add("fa-solid", "fa-trash", "deleteTask");
        savedTask.append(taskCheck, taskText, deleteTask);
        toDoList.appendChild(savedTask);
        taskStatement(taskCheck, taskText, taskContent);
        taskDeleted(deleteTask, taskContent, savedTask);
};
function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
function taskStatement(taskCheck, taskText, taskContent) {
    taskCheck.addEventListener("change", () => {
            taskContent.done = taskCheck.checked;
            saveTask();
            taskText.style.textDecoration = taskContent.done ? "line-through" : "none";
    });
};
function taskDeleted(deleteTask, taskContent, savedTask) {
    deleteTask.addEventListener("click", () => {
            tasks = tasks.filter(task => task.id !== taskContent.id);
            saveTask();
            toDoList.removeChild(savedTask);
            console.log(tasks);
    });
};
addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") {
        emptyInput();
        return
    };
    const taskContent = {
        text: taskInput.value,
        done: false,
        id: Date.now()
    };
    createNewTask(taskContent);
    tasks.push(taskContent);
    saveTask();
    taskInput.value = "";
});
renderTasks();
console.log("js ready");
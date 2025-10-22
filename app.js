const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const toDoList = document.getElementById("toDoList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const emptyInput = () => {
    alert("Invalid input")
};

function createNewTask(element) {
    const task = document.createElement("li");
    task.className = "task";

    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.classList.add("taskCheck");
    taskCheck.setAttribute("name", "checkTask")

    const newTaskText = document.createElement("span");
    newTaskText.textContent = element.taskText;

    const deleteTask = document.createElement("i");
    deleteTask.classList.add("fa-solid", "fa-trash", "deleteTask");


    task.appendChild(taskCheck);
    task.appendChild(newTaskText);
    task.appendChild(deleteTask);

    taskCheck.addEventListener("change", () => {
            element.done = taskCheck.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            newTaskText.style.textDecoration = element.done ? "line-through" : "none";
    });
    
    deleteTask.addEventListener("click", () => {
        tasks = tasks.filter(task => task.id !== element.id)
        localStorage.setItem("tasks", JSON.stringify(tasks));
        toDoList.removeChild(task)
        console.log(tasks)
    });

  toDoList.appendChild(task);
};

function renderTasks() {
     

    tasks.forEach((element) => {
        const taskCheck = document.createElement("input");
        taskCheck.type = "checkbox";
        taskCheck.className = "taskCheck";
        taskCheck.setAttribute("name", "checkTask")
        taskCheck.checked = element.done;
        
        const newTaskText = document.createElement("span");
        newTaskText.textContent = element.taskText;
        newTaskText.style.textDecoration = element.done ? "line-through" : "none";
        const savedTask = document.createElement("li");
        savedTask.className = "task";

        const deleteTask = document.createElement("i");
        deleteTask.classList.add("fa-solid", "fa-trash", "deleteTask");
        

        savedTask.appendChild(taskCheck);
        savedTask.appendChild(newTaskText);
        savedTask.appendChild(deleteTask);
        toDoList.appendChild(savedTask);

        taskCheck.addEventListener("change", () => {
            element.done = taskCheck.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            newTaskText.style.textDecoration = element.done ? "line-through" : "none";
        });

        deleteTask.addEventListener("click", () => {
            tasks = tasks.filter(task => task.id !== element.id)
            localStorage.setItem("tasks", JSON.stringify(tasks));
            toDoList.removeChild(savedTask)
            console.log(tasks)
        });
    });

   
};

addTaskBtn.addEventListener("click", () => {
    if (taskInput.value === "") {
        emptyInput();
        return
    };
    const taskContent = {
        taskText: taskInput.value,
        done: false,
        id: Date.now()
    };
    createNewTask(taskContent);
    tasks.push(taskContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
});

renderTasks();
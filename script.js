
window.onload = function() {
    var savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        var taskList = document.getElementById("taskList");
        taskList.innerHTML = savedTasks;
        
        
        var tasks = document.querySelectorAll("li");
        tasks.forEach(function(task) {
            task.addEventListener("click", function() {
                task.remove();
                saveTasks();
            });
        });
    }
};

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    
    if (taskInput.value === "") {
        alert("Lütfen bir iş girin!");
        return;
    }
    
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            li.style.textDecoration = "line-through";
        } else {
            li.style.textDecoration = "none";
        }
        saveTasks();
    });
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(taskInput.value));

    var removeIcon = document.createElement("span");
    removeIcon.innerHTML = "&#10005;";
    removeIcon.className = "remove-icon";
    removeIcon.addEventListener("click", function() {
        li.remove();
        saveTasks();
    });
    li.appendChild(removeIcon);

    taskList.appendChild(li);
    
    taskInput.value = "";

    saveTasks();
}

function clearList() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    saveTasks();
}

function saveTasks() {
    var taskList = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", taskList);
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function searchTasks() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var tasks = document.querySelectorAll("li");
    tasks.forEach(function(task) {
        var text = task.textContent.toLowerCase();
        if (text.includes(searchInput)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

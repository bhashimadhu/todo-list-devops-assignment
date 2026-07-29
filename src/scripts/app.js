const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const progressPercent = document.getElementById("progressPercent");
const emptyState = document.getElementById("emptyState");
const currentDateEl = document.getElementById("currentDate");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

/* ===== Date Display ===== */

function updateCurrentDate() {
    if (!currentDateEl) return;

    var options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    currentDateEl.textContent = new Date().toLocaleDateString("en-US", options);
}

updateCurrentDate();

/* ===== Local Storage ===== */

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ===== Add Task ===== */

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = "";

    saveTasks();
    renderTasks();
}

/* ===== Toggle (Complete / Undo) ===== */

function toggleTask(taskId) {
    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

/* ===== Delete Task ===== */

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);

    saveTasks();
    renderTasks();
}

/* ===== Filtering ===== */

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter((task) => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter((task) => task.completed);
    }

    return tasks;
}

/* ===== Update Statistics ===== */

function updateTaskCount() {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    taskCount.textContent = total;

    if (activeCount) {
        activeCount.textContent = active;
    }

    if (completedCount) {
        completedCount.textContent = completed;
    }

    if (progressPercent) {
        progressPercent.textContent = progress + "%";
    }
}

/* ===== Update Filter Buttons ===== */

function updateFilterButtons() {
    filterButtons.forEach((button) => {
        if (button.dataset.filter === currentFilter) {
            button.classList.add("filter-active");
        } else {
            button.classList.remove("filter-active");
        }
    });
}

/* ===== Update Empty State ===== */

function updateEmptyState(filteredCount) {
    if (!emptyState) return;

    if (filteredCount === 0) {
        emptyState.classList.add("visible");
    } else {
        emptyState.classList.remove("visible");
    }
}

/* ===== Render Tasks ===== */

function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach((task) => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        /* Circular checkbox */
        const checkbox = document.createElement("div");
        checkbox.className = "task-checkbox";
        checkbox.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        checkbox.addEventListener("click", () => {
            toggleTask(task.id);
        });

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.className = "task-text";

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.className = "complete-button";

        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(actions);

        taskList.appendChild(listItem);
    });

    updateTaskCount();
    updateFilterButtons();
    updateEmptyState(filteredTasks.length);
}

/* ===== Event Listeners ===== */

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

/* ===== Initial Render ===== */

renderTasks();
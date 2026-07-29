/* ===== DOM References ===== */

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

/* New form fields */
const taskDueDate = document.getElementById("taskDueDate");
const taskDueTime = document.getElementById("taskDueTime");
const taskPriority = document.getElementById("taskPriority");
const taskReminder = document.getElementById("taskReminder");
const formValidation = document.getElementById("formValidation");

/* Sort */
const sortSelect = document.getElementById("sortSelect");

/* Summary stats */
const dueTodayCount = document.getElementById("dueTodayCount");
const overdueCount = document.getElementById("overdueCount");

/* Notification button */
const notificationBtn = document.getElementById("notificationBtn");
const notificationBtnText = document.getElementById("notificationBtnText");

/* Edit modal */
const editModalOverlay = document.getElementById("editModalOverlay");
const editModalClose = document.getElementById("editModalClose");
const editModalCancel = document.getElementById("editModalCancel");
const editModalSave = document.getElementById("editModalSave");
const editTaskTitle = document.getElementById("editTaskTitle");
const editDueDate = document.getElementById("editDueDate");
const editDueTime = document.getElementById("editDueTime");
const editPriority = document.getElementById("editPriority");
const editReminder = document.getElementById("editReminder");
const editFormValidation = document.getElementById("editFormValidation");

/* ===== State ===== */

let tasks = [];
let currentFilter = "all";
let currentSort = "created";
let editingTaskId = null;
let reminderInterval = null;

/* ===== Load Tasks with Backward Compatibility ===== */

function loadTasks() {
    var stored = [];
    try {
        stored = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (e) {
        stored = [];
    }

    tasks = stored.map(function (task) {
        return {
            id: task.id,
            text: task.text !== undefined ? task.text : (task.title || ""),
            title: task.title !== undefined ? task.title : (task.text || ""),
            completed: !!task.completed,
            createdAt: task.createdAt || task.id || Date.now(),
            dueDate: task.dueDate || "",
            dueTime: task.dueTime || "",
            priority: task.priority || "medium",
            reminder: task.reminder || "none",
            reminderTriggered: !!task.reminderTriggered
        };
    });
}

loadTasks();

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

/* ===== Helpers ===== */

function getTodayString() {
    var d = new Date();
    var yyyy = d.getFullYear();
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    return yyyy + "-" + mm + "-" + dd;
}

function getTomorrowString() {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    var yyyy = d.getFullYear();
    var mm = String(d.getMonth() + 1).padStart(2, "0");
    var dd = String(d.getDate()).padStart(2, "0");
    return yyyy + "-" + mm + "-" + dd;
}

function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    var now = new Date();
    var dueStr = task.dueDate;
    if (task.dueTime) {
        dueStr += "T" + task.dueTime;
    } else {
        dueStr += "T23:59:59";
    }
    var dueDate = new Date(dueStr);
    return now > dueDate;
}

function isDueToday(task) {
    if (!task.dueDate) return false;
    return task.dueDate === getTodayString();
}

function isDueTomorrow(task) {
    if (!task.dueDate) return false;
    return task.dueDate === getTomorrowString();
}

function getDueStatus(task) {
    if (!task.dueDate) return null;
    if (!task.completed && isOverdue(task)) return "overdue";
    if (isDueToday(task)) return "today";
    if (isDueTomorrow(task)) return "tomorrow";
    return "future";
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    var parts = dateStr.split("-");
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(timeStr) {
    if (!timeStr) return "";
    var parts = timeStr.split(":");
    var h = parseInt(parts[0], 10);
    var m = parts[1];
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return h + ":" + m + " " + ampm;
}

function getReminderLabel(reminder) {
    var labels = {
        "none": "",
        "at-time": "At due time",
        "5-min": "5 min before",
        "15-min": "15 min before",
        "30-min": "30 min before",
        "1-hour": "1 hour before",
        "1-day": "1 day before"
    };
    return labels[reminder] || "";
}

function getPriorityWeight(priority) {
    if (priority === "high") return 3;
    if (priority === "medium") return 2;
    return 1;
}

/* ===== Validation ===== */

function showValidation(el, msg) {
    if (el) el.textContent = msg;
}

function clearValidation(el) {
    if (el) el.textContent = "";
}

function validateTaskForm(title, dueDate, dueTime, validationEl) {
    clearValidation(validationEl);

    if (title.trim() === "") {
        showValidation(validationEl, "Please enter a task title.");
        return false;
    }

    if (!dueDate && dueTime) {
        showValidation(validationEl, "Please select a due date when setting a due time.");
        return false;
    }

    return true;
}

/* ===== Add Task ===== */

function addTask() {
    var titleVal = taskInput.value.trim();
    var dueDateVal = taskDueDate ? taskDueDate.value : "";
    var dueTimeVal = taskDueTime ? taskDueTime.value : "";
    var priorityVal = taskPriority ? taskPriority.value : "medium";
    var reminderVal = taskReminder ? taskReminder.value : "none";

    if (!validateTaskForm(titleVal, dueDateVal, dueTimeVal, formValidation)) {
        return;
    }

    var newTask = {
        id: Date.now(),
        text: titleVal,
        title: titleVal,
        completed: false,
        createdAt: Date.now(),
        dueDate: dueDateVal,
        dueTime: dueTimeVal,
        priority: priorityVal,
        reminder: reminderVal,
        reminderTriggered: false
    };

    tasks.push(newTask);

    /* Reset form */
    taskInput.value = "";
    if (taskDueDate) taskDueDate.value = "";
    if (taskDueTime) taskDueTime.value = "";
    if (taskPriority) taskPriority.value = "medium";
    if (taskReminder) taskReminder.value = "none";
    clearValidation(formValidation);

    saveTasks();
    renderTasks();
}

/* ===== Toggle (Complete / Undo) ===== */

function toggleTask(taskId) {
    tasks = tasks.map(function (task) {
        if (task.id === taskId) {
            return Object.assign({}, task, {
                completed: !task.completed,
                reminderTriggered: !task.completed ? true : task.reminderTriggered
            });
        }
        return task;
    });

    saveTasks();
    renderTasks();
}

/* ===== Delete Task ===== */

function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    saveTasks();
    renderTasks();
}

/* ===== Edit Task ===== */

function openEditModal(taskId) {
    var task = tasks.find(function (t) { return t.id === taskId; });
    if (!task) return;

    editingTaskId = taskId;

    editTaskTitle.value = task.title || task.text || "";
    editDueDate.value = task.dueDate || "";
    editDueTime.value = task.dueTime || "";
    editPriority.value = task.priority || "medium";
    editReminder.value = task.reminder || "none";
    clearValidation(editFormValidation);

    editModalOverlay.classList.add("visible");
    editTaskTitle.focus();
}

function closeEditModal() {
    editModalOverlay.classList.remove("visible");
    editingTaskId = null;
    clearValidation(editFormValidation);
}

function saveEditedTask() {
    if (editingTaskId === null) return;

    var titleVal = editTaskTitle.value.trim();
    var dueDateVal = editDueDate.value;
    var dueTimeVal = editDueTime.value;
    var priorityVal = editPriority.value;
    var reminderVal = editReminder.value;

    if (!validateTaskForm(titleVal, dueDateVal, dueTimeVal, editFormValidation)) {
        return;
    }

    tasks = tasks.map(function (task) {
        if (task.id === editingTaskId) {
            var reminderChanged = task.reminder !== reminderVal ||
                                  task.dueDate !== dueDateVal ||
                                  task.dueTime !== dueTimeVal;
            return Object.assign({}, task, {
                text: titleVal,
                title: titleVal,
                dueDate: dueDateVal,
                dueTime: dueTimeVal,
                priority: priorityVal,
                reminder: reminderVal,
                reminderTriggered: reminderChanged ? false : task.reminderTriggered
            });
        }
        return task;
    });

    saveTasks();
    closeEditModal();
    renderTasks();
}

/* ===== Filtering ===== */

function getFilteredTasks() {
    var today = getTodayString();

    if (currentFilter === "active") {
        return tasks.filter(function (t) { return !t.completed; });
    }
    if (currentFilter === "completed") {
        return tasks.filter(function (t) { return t.completed; });
    }
    if (currentFilter === "today") {
        return tasks.filter(function (t) { return t.dueDate === today; });
    }
    if (currentFilter === "overdue") {
        return tasks.filter(function (t) { return isOverdue(t); });
    }
    return tasks;
}

/* ===== Sorting ===== */

function sortTasks(list) {
    var sorted = list.slice();

    if (currentSort === "due") {
        sorted.sort(function (a, b) {
            var aKey = a.dueDate ? (a.dueDate + (a.dueTime || "23:59")) : "9999-12-31T23:59";
            var bKey = b.dueDate ? (b.dueDate + (b.dueTime || "23:59")) : "9999-12-31T23:59";
            return aKey < bKey ? -1 : aKey > bKey ? 1 : 0;
        });
    } else if (currentSort === "priority") {
        sorted.sort(function (a, b) {
            return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
        });
    } else {
        sorted.sort(function (a, b) {
            return (a.createdAt || a.id) - (b.createdAt || b.id);
        });
    }

    return sorted;
}

/* ===== Update Statistics ===== */

function updateTaskCount() {
    var total = tasks.length;
    var completed = tasks.filter(function (t) { return t.completed; }).length;
    var active = total - completed;
    var progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    taskCount.textContent = total;
    if (activeCount) activeCount.textContent = active;
    if (completedCount) completedCount.textContent = completed;
    if (progressPercent) progressPercent.textContent = progress + "%";

    /* Summary stats */
    var today = getTodayString();
    var dueToday = tasks.filter(function (t) { return t.dueDate === today && !t.completed; }).length;
    var overdue = tasks.filter(function (t) { return isOverdue(t); }).length;

    if (dueTodayCount) dueTodayCount.textContent = dueToday;
    if (overdueCount) overdueCount.textContent = overdue;
}

/* ===== Update Filter Buttons ===== */

function updateFilterButtons() {
    filterButtons.forEach(function (button) {
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

    var filteredTasks = getFilteredTasks();
    var sortedTasks = sortTasks(filteredTasks);

    sortedTasks.forEach(function (task) {
        var listItem = document.createElement("li");
        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        /* Due status coloring */
        var dueStatus = getDueStatus(task);
        if (dueStatus === "overdue") listItem.classList.add("task-overdue");
        if (dueStatus === "today") listItem.classList.add("task-due-today");

        /* Circular checkbox - using button for accessibility */
        var checkbox = document.createElement("button");
        checkbox.className = "task-checkbox";
        checkbox.type = "button";
        checkbox.setAttribute("aria-label", task.completed ? "Undo complete" : "Mark complete");
        checkbox.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        checkbox.addEventListener("click", function () {
            toggleTask(task.id);
        });

        /* Task body container */
        var taskBody = document.createElement("div");
        taskBody.className = "task-body";

        var titleEl = document.createElement("div");
        titleEl.className = "task-title";
        titleEl.textContent = task.title || task.text || "";

        taskBody.appendChild(titleEl);

        /* Meta info row */
        var hasMeta = task.dueDate || task.priority || (task.reminder && task.reminder !== "none");
        if (hasMeta) {
            var metaRow = document.createElement("div");
            metaRow.className = "task-meta";

            /* Due date */
            if (task.dueDate) {
                var dateItem = document.createElement("span");
                dateItem.className = "task-meta-item";

                dateItem.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>';

                var dateText = document.createTextNode(" " + formatDate(task.dueDate));
                dateItem.appendChild(dateText);

                if (task.dueTime) {
                    var timeText = document.createTextNode(" " + formatTime(task.dueTime));
                    dateItem.appendChild(timeText);
                }

                metaRow.appendChild(dateItem);

                /* Due status badge */
                if (dueStatus && dueStatus !== "future") {
                    var dueBadge = document.createElement("span");
                    dueBadge.className = "due-badge";
                    if (dueStatus === "overdue") {
                        dueBadge.classList.add("due-badge-overdue");
                        dueBadge.textContent = "Overdue";
                    } else if (dueStatus === "today") {
                        dueBadge.classList.add("due-badge-today");
                        dueBadge.textContent = "Due Today";
                    } else if (dueStatus === "tomorrow") {
                        dueBadge.classList.add("due-badge-tomorrow");
                        dueBadge.textContent = "Due Tomorrow";
                    }
                    metaRow.appendChild(dueBadge);
                }
            }

            /* Priority badge */
            if (task.priority) {
                var priBadge = document.createElement("span");
                priBadge.className = "priority-badge priority-" + task.priority;
                priBadge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
                metaRow.appendChild(priBadge);
            }

            /* Reminder badge */
            if (task.reminder && task.reminder !== "none") {
                var remLabel = getReminderLabel(task.reminder);
                if (remLabel) {
                    var remBadge = document.createElement("span");
                    remBadge.className = "reminder-badge";
                    remBadge.innerHTML = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>';
                    var remText = document.createTextNode(" " + remLabel);
                    remBadge.appendChild(remText);
                    metaRow.appendChild(remBadge);
                }
            }

            taskBody.appendChild(metaRow);
        }

        /* Actions */
        var actions = document.createElement("div");
        actions.className = "task-actions";

        var completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.className = "complete-button";
        completeButton.type = "button";
        completeButton.setAttribute("aria-label", task.completed ? "Undo task" : "Complete task");
        completeButton.addEventListener("click", function () {
            toggleTask(task.id);
        });

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-button";
        editButton.type = "button";
        editButton.setAttribute("aria-label", "Edit task");
        editButton.addEventListener("click", function () {
            openEditModal(task.id);
        });

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.setAttribute("aria-label", "Delete task");
        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        actions.appendChild(completeButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        listItem.appendChild(checkbox);
        listItem.appendChild(taskBody);
        listItem.appendChild(actions);

        taskList.appendChild(listItem);
    });

    updateTaskCount();
    updateFilterButtons();
    updateEmptyState(sortedTasks.length);
}

/* ===== Notification Permission ===== */

function updateNotificationButton() {
    if (!notificationBtn) return;

    if (!("Notification" in window)) {
        notificationBtnText.textContent = "Not Supported";
        notificationBtn.classList.add("denied");
        notificationBtn.disabled = true;
        return;
    }

    var perm = Notification.permission;
    if (perm === "granted") {
        notificationBtnText.textContent = "Notifications On";
        notificationBtn.classList.remove("denied");
        notificationBtn.classList.add("granted");
    } else if (perm === "denied") {
        notificationBtnText.textContent = "Blocked";
        notificationBtn.classList.remove("granted");
        notificationBtn.classList.add("denied");
    } else {
        notificationBtnText.textContent = "Notifications";
        notificationBtn.classList.remove("granted", "denied");
    }
}

function requestNotificationPermission() {
    if (!("Notification" in window)) {
        return;
    }

    if (Notification.permission === "granted") {
        return;
    }

    if (Notification.permission === "denied") {
        showValidation(formValidation, "Notifications are blocked. Please enable them in browser settings.");
        setTimeout(function () { clearValidation(formValidation); }, 4000);
        return;
    }

    Notification.requestPermission().then(function (result) {
        updateNotificationButton();
        if (result === "denied") {
            showValidation(formValidation, "Notification permission was denied. You can enable it in browser settings.");
            setTimeout(function () { clearValidation(formValidation); }, 4000);
        }
    });
}

updateNotificationButton();

/* ===== Reminder Checker ===== */

function getReminderOffsetMs(reminder) {
    var offsets = {
        "at-time": 0,
        "5-min": 5 * 60 * 1000,
        "15-min": 15 * 60 * 1000,
        "30-min": 30 * 60 * 1000,
        "1-hour": 60 * 60 * 1000,
        "1-day": 24 * 60 * 60 * 1000
    };
    return offsets[reminder] !== undefined ? offsets[reminder] : null;
}

function checkReminders() {
    if (!("Notification" in window) || Notification.permission !== "granted") {
        return;
    }

    var now = new Date();
    var changed = false;

    tasks.forEach(function (task) {
        if (task.completed || task.reminderTriggered) return;
        if (!task.dueDate || task.reminder === "none" || !task.reminder) return;

        var dueStr = task.dueDate + "T" + (task.dueTime || "00:00");
        var dueMs = new Date(dueStr).getTime();
        var offsetMs = getReminderOffsetMs(task.reminder);
        if (offsetMs === null) return;

        var triggerMs = dueMs - offsetMs;

        if (now.getTime() >= triggerMs) {
            task.reminderTriggered = true;
            changed = true;

            var bodyText = task.title || task.text || "Task";
            if (task.dueTime) {
                bodyText += " — Due at " + formatTime(task.dueTime);
            }
            if (task.dueDate) {
                bodyText += " on " + formatDate(task.dueDate);
            }

            try {
                new Notification("TaskFlow Reminder", {
                    body: bodyText,
                    icon: undefined
                });
            } catch (e) {
                /* notification failed silently */
            }
        }
    });

    if (changed) {
        saveTasks();
    }
}

/* Start reminder interval — check every 30 seconds */
reminderInterval = setInterval(checkReminders, 30000);
checkReminders();

/* ===== Event Listeners ===== */

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

if (sortSelect) {
    sortSelect.addEventListener("change", function () {
        currentSort = sortSelect.value;
        renderTasks();
    });
}

/* Edit modal events */
if (editModalClose) {
    editModalClose.addEventListener("click", closeEditModal);
}
if (editModalCancel) {
    editModalCancel.addEventListener("click", closeEditModal);
}
if (editModalSave) {
    editModalSave.addEventListener("click", saveEditedTask);
}
if (editModalOverlay) {
    editModalOverlay.addEventListener("click", function (e) {
        if (e.target === editModalOverlay) {
            closeEditModal();
        }
    });
}

/* Close modal on Escape key */
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && editModalOverlay && editModalOverlay.classList.contains("visible")) {
        closeEditModal();
    }
});

/* Notification button */
if (notificationBtn) {
    notificationBtn.addEventListener("click", requestNotificationPermission);
}

/* ===== Initial Render ===== */

renderTasks();
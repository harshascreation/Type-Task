import { addTask, advanceTask, deleteTask, filterByStatus, } from "./model.js";
let tasks = [];
let filter = "all";
const titleInput = document.getElementById("title");
const statusSelect = document.getElementById("status");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
const chipsEl = document.getElementById("chips");
// Add a new task
addBtn.onclick = () => {
    const title = titleInput.value.trim();
    if (title === "") {
        return;
    }
    const selectedStatus = statusSelect.value;
    if (!isTaskStatus(selectedStatus)) {
        statusSelect.setCustomValidity("Select a valid task status.");
        statusSelect.reportValidity();
        return;
    }
    statusSelect.setCustomValidity("");
    tasks = addTask(tasks, title, selectedStatus);
    titleInput.value = "";
    render();
};
// Display tasks
function render() {
    listEl.innerHTML = "";
    const visibleTasks = filter === "all" ? tasks : filterByStatus(tasks, filter);
    visibleTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task";
        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";
        const taskTitle = document.createElement("span");
        taskTitle.textContent = task.title;
        const badge = document.createElement("span");
        badge.className = "task-status";
        badge.textContent = task.status;
        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(badge);
        // Advance task status
        const advanceBtn = document.createElement("button");
        advanceBtn.textContent = "Advance →";
        advanceBtn.onclick = () => {
            tasks = advanceTask(tasks, task.id);
            render();
        };
        // Delete task
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.style.background = "#e74c3c";
        deleteBtn.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        li.appendChild(taskInfo);
        li.appendChild(advanceBtn);
        li.appendChild(deleteBtn);
        listEl.appendChild(li);
    });
}
// Filter tasks
chipsEl.onclick = (event) => {
    const eventTarget = event.target;
    if (!(eventTarget instanceof Element)) {
        return;
    }
    const button = eventTarget.closest("button");
    if (!button || !chipsEl.contains(button)) {
        return;
    }
    const selectedFilter = button.dataset.filter;
    if (selectedFilter !== "all" && !isTaskStatus(selectedFilter)) {
        return;
    }
    filter = selectedFilter;
    render();
    // Update active filter button
    const buttons = chipsEl.querySelectorAll("button");
    buttons.forEach((button) => {
        button.classList.remove("active");
    });
    button.classList.add("active");
};
function isTaskStatus(value) {
    return (value === "todo" ||
        value === "in-progress" ||
        value === "done");
}
// Initial rendering
render();
//# sourceMappingURL=app.js.map
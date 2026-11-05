// model.ts
let nextId = 1;
/**
 * 3. Adds a new task to the array with status "todo".
 */
export function addTask(tasks, title, status = "todo") {
    const newTask = {
        id: nextId++,
        title,
        status,
    };
    return [...tasks, newTask];
}
/**
 * 4. Marks a task as "done" by its ID.
 */
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
/**
 * 5. Filters tasks by a valid TaskStatus.
 */
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
// ============================================================================
// Extra Typed Operations (Required for Originality)
// ============================================================================
/**
 * Removes a task by its ID.
 */
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}
/**
 * Advances a task through stages: "todo" -> "in-progress" -> "done".
 */
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id)
            return task;
        let nextStatus = task.status;
        if (task.status === "todo") {
            nextStatus = "in-progress";
        }
        else if (task.status === "in-progress") {
            nextStatus = "done";
        }
        return { ...task, status: nextStatus };
    });
}
//# sourceMappingURL=model.js.map
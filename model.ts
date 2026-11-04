// model.ts

// 1. Literal union type for TaskStatus
type TaskStatus = "todo" | "in-progress" | "done";

// 2. Task interface defining the exact shape of a task
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

/**
 * 3. Adds a new task to the array with status "todo".
 */
function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = {
    id: nextId++,
    title,
    status: "todo",
  };
  return [...tasks, newTask];
}

/**
 * 4. Marks a task as "done" by its ID.
 */
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

/**
 * 5. Filters tasks by a valid TaskStatus.
 */
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

// ============================================================================
// Extra Typed Operations (Required for Originality)
// ============================================================================

/**
 * Removes a task by its ID.
 */
function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

/**
 * Advances a task through stages: "todo" -> "in-progress" -> "done".
 */
function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) return task;

    let nextStatus: TaskStatus = task.status;
    if (task.status === "todo") {
      nextStatus = "in-progress";
    } else if (task.status === "in-progress") {
      nextStatus = "done";
    }

    return { ...task, status: nextStatus };
  });
}
/**
 * Tiny Tasks API (Node + Express)
 * --------------------------------
 * Small backend to practice API fundamentals:
 * - CRUD routes for "tasks"
 * - In-memory data (no database yet)
 * - Basic validation + status codes
 *
 * Routes:
 * - GET    /tasks
 * - GET    /tasks/:id
 * - POST   /tasks
 * - PATCH  /tasks/:id
 * - DELETE /tasks/:id
 */

const express = require("express");
const cors = require("cors");
const app = express();

/* ---------- Middleware ---------- */

// Parse JSON bodies (POST/PATCH)
app.use(express.json());

// Allow requests from frontend dev server
app.use(
  cors({
    origin: true,
  })
);

/* ---------- In-memory "DB" ---------- */

let tasks = [
  { id: 1, title: "Test task", completed: false },
  { id: 2, title: "Another task", completed: true },
];

let nextId = 3;

/* ---------- Helpers ---------- */

// Find a task by numeric id
function findTaskById(id) {
  return tasks.find((t) => t.id === id);
}

// Convert :id param to a number
function parseId(param) {
  return Number(param);
}

/* ---------- Routes ---------- */

// GET /tasks -> all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id -> one task
app.get("/tasks/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const task = findTaskById(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// POST /tasks -> create a task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id -> partial update
app.patch("/tasks/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const task = findTaskById(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, completed } = req.body;

  // Update title if provided
  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res
        .status(400)
        .json({ error: "title must be a non-empty string" });
    }
    task.title = title.trim();
  }

  // Update completed if provided
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "completed must be a boolean" });
    }
    task.completed = completed;
  }

  res.json(task);
});

// DELETE /tasks/:id -> delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const [deletedTask] = tasks.splice(index, 1);
  res.json(deletedTask);
});

/* ---------- Start server ---------- */

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Tiny Tasks API running on http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/tasks`);
  });
}

module.exports = app;




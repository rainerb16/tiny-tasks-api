/**
 * Tiny Tasks API (Node + Express)
 * --------------------------------
 * This is a small backend to practice API fundamentals:
 * - CRUD routes for "tasks"
 * - In-memory data (no database yet)
 * - Basic validation + status codes
 *
 * TODO: swap the in-memory array for SQLite/Postgres, while keeping
 * the same API contract (routes + response shapes).
 */

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
// -----------------------------

// Allow JSON request bodies (e.g., POST/PUT with {"title": "..."})
app.use(express.json());

// Allow requests from a frontend dev server.
app.use(
  cors({
    origin: true,
  })
);

// In-memory "database"
// -----------------------------
let tasks = [
  { id: 1, title: "Test task", completed: false },
  { id: 2, title: "Another task", completed: true },
];

let nextId = 3;

// Helper functions
// -----------------------------

/**
 * Find a task by ID (number). Returns undefined if not found.
 */
function findTaskById(id) {
  return tasks.find((t) => t.id === id);
}

/**
 * Parse an ID from req.params and return a number.
 * Returns NaN if invalid.
 */
function parseId(param) {
  return Number(param);
}

// Routes
// -----------------------------

/**
 * GET /health -> { ok: true }
 */
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/**
 * GET /tasks
 * Returns all tasks.
 */
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

/**
 * GET /tasks/:id
 * Returns one task by id.
 */
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

/**
 * POST /tasks
 * Creates a new task.
 * Body: { title: string }
 */
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  // Basic validation
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);

  // 201 Created is a standard status code for successful creation
  res.status(201).json(newTask);
});

/**
 * PUT /tasks/:id
 * Toggles completion (simple update).
 */
app.put("/tasks/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const task = findTaskById(id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = !task.completed;
  res.json(task);
});

/**
 * DELETE /tasks/:id
 * Deletes a task.
 */
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

// Start server
// -----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Tiny Tasks API running on http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/tasks`);
});

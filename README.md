# Tiny Tasks API

A simple REST API built with Node.js and Express to support a frontend task manager application.

This project is designed to demonstrate backend fundamentals, clean routing, and frontend integration.

## Live API
https://tiny-tasks-api.onrender.com/tasks

---

## Tech Stack

- Node.js
- Express
- Jest & Supertest
- Render (deployment)

## Features
- RESTful CRUD endpoints
- PATCH-based partial updates
- In-memory data store
- Jest + Supertest API tests

---

## Purpose

This API was built to practice and demonstrate:

- RESTful API design
- CRUD operations
- Input validation and error handling
- Clear route structure
- Frontend ↔ backend communication

The API is intentionally simple and can be extended later with a database or authentication.

## Getting Started

### Prerequisites
- Node.js 18+
- npm (comes with Node)

---

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/tiny-tasks-api.git
cd tiny-tasks-api
npm install

### Runniing the Server

Start the API locally:
```node index.js

The Server will run at:
http://localhost:3000

You can verify it's working by visiting:
http://localhost:3000/tasks


## Design Decisions

- **PATCH for updates:** Supports partial updates (e.g., `title` or `completed`) without requiring full task replacement.
- **In-memory data store:** Keeps the project focused on API fundamentals; easy to swap for a DB later without changing routes.
- **Validation + status codes:** Returns clear `400/404` errors to make frontend integration predictable.
- **Testability:** The Express `app` is exported so Jest/Supertest can test routes without opening a real network port.

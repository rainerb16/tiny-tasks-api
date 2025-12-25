# Tiny Tasks API (Express)

Small practice API for learning CRUD fundamentals using Node.js and Express.

This project is intentionally simple and uses in-memory data to focus on core API concepts.

---

## Run

Install dependencies and start the server:

```bash
npm install
node index.js
```

The server will run at:

```
http://localhost:3000
```

---

## How to Test

Use `curl` to interact with the API locally.

### Get all tasks
```bash
curl http://localhost:3000/tasks
```

### Create a new task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New task"}'
```

### Update a task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated task"}'
```

### Delete a task
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/tasks`     | Get all tasks     |
| POST   | `/tasks`     | Create a task     |
| PUT    | `/tasks/:id` | Update a task     |
| DELETE | `/tasks/:id` | Delete a task     |

---

## Notes

- Data is stored in memory (no database)
- Restarting the server resets all tasks

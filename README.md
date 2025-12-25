# Tiny Tasks API (Express)

Small practice API for CRUD fundamentals.

## Run
bash
npm install
node index.js

## How to Test
curl http://localhost:3000/tasks
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"New task"}'
curl -X PUT http://localhost:3000/tasks/1
curl -X DELETE http://localhost:3000/tasks/1


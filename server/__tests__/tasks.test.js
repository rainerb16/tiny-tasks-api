const request = require("supertest");
const app = require("../index");

describe("Tiny Tasks API", () => {

  test("GET /tasks returns an array", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /tasks creates a task", async () => {
    const res = await request(app).post("/tasks").send({ title: "New test task" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("New test task");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("completed", false);
  });

  test("PATCH /tasks/:id updates title", async () => {
    const created = await request(app).post("/tasks").send({ title: "Old title" });
    const id = created.body.id;

    const updated = await request(app)
      .patch(`/tasks/${id}`)
      .send({ title: "New title" });

    expect(updated.status).toBe(200);
    expect(updated.body.title).toBe("New title");
  });
});

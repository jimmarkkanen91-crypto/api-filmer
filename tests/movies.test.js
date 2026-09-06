const request = require("supertest");
const { app } = require("../index");

describe("GET /movies", () => {
  it("listar alla filmer", async () => {
    const res = await request(app).get("/movies");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
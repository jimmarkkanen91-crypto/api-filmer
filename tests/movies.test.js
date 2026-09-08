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

describe("GET /movies/:genre", () => {
  it("filtrerar filmer på genre", async () => {
    const res = await request(app).get("/movies/sci-fi");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((movie) => {
      expect(movie.genre).toBe("sci-fi");
    });
  });

  it("returnerar tom lista för en genre som inte finns", async () => {
    const res = await request(app).get("/movies/finns-inte");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
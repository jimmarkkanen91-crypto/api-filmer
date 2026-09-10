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

describe("GET /movies/id/:id", () => {
  it("hämtar en specifik film", async () => {
    const res = await request(app).get("/movies/id/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it("returnerar 404 om filmen inte finns", async () => {
    const res = await request(app).get("/movies/id/999");

    expect(res.statusCode).toBe(404);
  });
});

describe("POST /movies", () => {
  it("skapar en ny film", async () => {
    const nyFilm = {
      titel: "Testfilmen",
      genre: "test",
      ar: 2026,
      regissor: "Test Testsson",
      betyg: 5.0,
    };

    const res = await request(app).post("/movies").send(nyFilm);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.titel).toBe("Testfilmen");
  });
});

describe("PUT /movies/:id", () => {
  it("uppdaterar en befintlig film", async () => {
    const res = await request(app)
      .put("/movies/id/1")
      .send({ betyg: 9.9 });

    expect(res.statusCode).toBe(200);
    expect(res.body.betyg).toBe(9.9);
  });
});

describe("DELETE /movies/:id", () => {
  it("raderar en film", async () => {
    const createRes = await request(app).post("/movies").send({
      titel: "Ska raderas",
      genre: "test",
      ar: 2026,
      regissor: "Test",
      betyg: 1,
    });
    const { id } = createRes.body;

    const res = await request(app).delete(`/movies/id/${id}`);

    expect(res.statusCode).toBe(200);
  });
});
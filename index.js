const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data", "movies.json");

function readMovies() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

app.get("/", (req, res) => {
  res.send("Film-API är igång");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/movies", (req, res) => {
  try {
    const movies = readMovies();
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte hämta filmer" });
  }
});

app.get("/movies/id/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const movies = readMovies();
    const movie = movies.find((m) => m.id === id);

    if (!movie) {
      return res.status(404).json({ error: "Filmen hittades inte" });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte hämta filmen" });
  }
});

app.post("/movies", (req, res) => {
  try {
    const movies = readMovies();
    const newId = movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1;

    const newMovie = { id: newId, ...req.body };
    movies.push(newMovie);

    fs.writeFileSync(DATA_FILE, JSON.stringify(movies, null, 2));

    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte skapa filmen" });
  }
});

app.put("/movies/id/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const movies = readMovies();
    const index = movies.findIndex((m) => m.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Filmen hittades inte" });
    }

    movies[index] = { ...movies[index], ...req.body };
    fs.writeFileSync(DATA_FILE, JSON.stringify(movies, null, 2));

    res.status(200).json(movies[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte uppdatera filmen" });
  }
});

app.delete("/movies/id/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const movies = readMovies();
    const filtered = movies.filter((m) => m.id !== id);

    if (filtered.length === movies.length) {
      return res.status(404).json({ error: "Filmen hittades inte" });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));

    res.status(200).json({ message: "Filmen raderad" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte radera filmen" });
  }
});

app.get("/movies/:genre", (req, res) => {
  try {
    const { genre } = req.params;
    const movies = readMovies();
    const filtered = movies.filter((movie) => movie.genre === genre);
    res.status(200).json(filtered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kunde inte filtrera filmer" });
  }
});

module.exports = { app };
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
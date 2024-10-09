const express = require("express");
const {
  getGames,
  getGameById,
  getGenres,
  getGenreById
} = require("./games.js");

const app = express();
app.use(express.json());

// API to get all games
app.get("/api/games", async (req, res) => {
  try {
    const games = await getGames();
    if (games.length === 0) {
      return res.status(404).json({ error: "Games not found" });
    }
    return res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to get a game by Id
app.get("/api/games/:id", async (req, res) => {
  try {
    const game = await getGameById(parseInt(req.params.id));
    if (!game) {
      return res.status(404).json({ error: "No game found" });
    }
    return res.status(200).json(game); // Fixed 'gane' to 'game'
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to get all genres
app.get("/api/genres", async (req, res) => {
  try {
    const genres = await getGenres();
    if (genres.length === 0) {
      return res.status(404).json({ error: "No genres found" });
    }
    return res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API to get a genre by Id
app.get("/api/genres/:id", async (req, res) => {
  try {
    const genre = await getGenreById(parseInt(req.params.id));
    if (!genre) { // Fixed logical error
      return res.status(404).json({ error: "No genre found" });
    }
    return res.status(200).json(genre);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { app };

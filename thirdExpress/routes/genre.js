import { Router } from "express";
import validateInput from "../validateInput.js";
const router = Router();

const Genres = [
  { id: 1, genre: "Horror" },
  { id: 2, genre: "RomCom" },
  { id: 3, genre: "Comedy" },
  { id: 4, genre: "Thriller" },
  { id: 5, genre: "SciFi" },
  { id: 6, genre: "Drama" },
  { id: 7, genre: "Romance" },
];

router.get("/", (req, res) => {
  res.send(Genres);
});

router.get("/:id", (req, res) => {
  const genre = 
    Genres.find((g) => g.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("Resource not found");

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error, value } = validateInput(req.body);
  if (error) return res.status(400).send(error.message);

  const newGenre = {
    id: Genres.length + 1,
    genre: req.body.genre,
  };

  Genres.push(newGenre);
  res.send(newGenre);
});

router.put("/:id", (req, res) => {
  const genre = Genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Resource not found");

  const { error, value } = validateInput(req.body);
  if (error) return res.status(400).send(error.message);

  genre.genre = req.body.genre;

  res.status(200).send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = Genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("resource not found");

  const index = Genres.indexOf(genre);

  Genres.splice(index, 1);
  res.send(genre);
});



export default router;

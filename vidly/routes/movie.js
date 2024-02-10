import express from "express";
import Movie from "../models/Movies.js";
import { validateMovie } from "../validate.js";
import { Genre } from "../models/Genre.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().select("title genre");

  if (!movies) return res.status(404).send("resource not found");

  res.status(201).send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send("resource not found");

  res.status(201).send(movie);
});

//create movie

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);

  if (error) return res.status(400).send(error.message);

  const { title, numberInStock, dailyRentalRate } = req.body;

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  const newMovie = new Movie({
    title,
    // listed it out like this because these are the only prrperies of genre that we need
    genre: {
      _id: genre._id,
      title: genre.title,
    },
    numberInStock,
    dailyRentalRate,
  });

  const savedMovie = await newMovie.save();

  res.status(201).send(savedMovie);
});

//Update Movie
router.put("/:id", auth, async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("resource not found");

  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.message);

  const { title, numberInStock, dailyRentalRate } = req.body;

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  movie.title = title;
  movie.genre = {
    _id: genre._id,
    title: genre.title,
  };
  movie.numberInStock = numberInStock;
  movie.dailyRentalRate = dailyRentalRate;

  await movie.save();
  res.status(201).send(movie);
});

router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove({ _id: req.params.id });

  if (!movie) return res.status(404).send("resource not found");

  res.status(201).send(movie);
});

export default router;

import express from "express";
import { Genre } from "../models/Genre.js";
import {validateGenre} from "../validate.js";
import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";
import { asyncMiddleware } from "../middlewares/async.js";

const router = express.Router();

//Get all genres
router.get("/", asyncMiddleware(async(req, res) => {


    
    const allGenre = await Genre.find().sort({ title: 1 }).select({ title: 1 });
    if (!allGenre) return res.status(404).send("No resource found");
  
    return res.status(200).json(allGenre);

 
}));

router.get("/:id", asyncMiddleware(async(req, res) => {
  const genreById = await Genre.findById(req.params.id);
  if (!genreById) return res.status(404).send("resource not found");

  return res.status(201).json(genreById);
}));

router.post("/", auth,  asyncMiddleware(async (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(500).send(error.message);

  let newGenre = new Genre({
    title: req.body.title,
  });

  newGenre = await newGenre.save();

  res.send(newGenre);
}));

router.put("/:id", auth,  asyncMiddleware(async (req, res) => {
  let genre = await Genre.findById(req.params.id);

if(!genre) return res.status(404).send("Resource not found")

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  genre.title = req.body.title;

  genre = await genre.save();

  res.send(genre);
}));

// router.put('/:id',async(req,res) => {

//     const {error} = validateGenre(req.body)
//     if(error) return res
//     const genres = Genre.findByIdAndUpdate({_id:req.body.id})
// })

router.delete("/:id", [auth,admin],  asyncMiddleware(async(req,res) => {
    const genre = await Genre.findByIdAndRemove({ _id: req.params.id });

    if (!genre) return res.status(404).send("Resource Not found");

    res.send(genre);
}));

export default router;
 
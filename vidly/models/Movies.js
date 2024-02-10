import { Schema, model } from "mongoose";
import { genreSchema } from "./Genre.js";

export const movieSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 255,
      trim: true,
      required: true,
    },
    genre: {
      type: genreSchema,
    },
    numberInStock: {
      type: Number,
      default: 0,
    },
    dailyRentalRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Movie = model("Movie", movieSchema);

export default Movie;

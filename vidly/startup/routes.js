import { json } from "express";
import genreRouter from "../routes/genre.js";
import customerRouter from "../routes/customer.js";
import movieRouter from "../routes/movie.js"
import rentalRouter from "../routes/rental.js"
import userRouter from "../routes/user.js"
import authRouter from "../routes/auth.js"
import { error } from "../middlewares/error.js";

export function routes(app){
    app.use(json())
    app.use('/api/genre', genreRouter)
    app.use('/api/customer',customerRouter)
    app.use('/api/movie', movieRouter)
    app.use('/api/rental', rentalRouter)
    app.use('/api/user', userRouter)
    app.use('/api/auth', authRouter)
    // This function has to the be below the above middlewares
    // Error middleware
    app.use(error)

}
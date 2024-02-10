import express from "express"
import Rental from "../models/Rental.js"
import { validateRental } from "../validate.js"
import Customer from "../models/Customer.js"
import Movie from "../models/Movies.js"
import  { startSession } from "mongoose"

const router = express.Router()

router.get('/', async (req,res)=> {
    const rentals = await Rental.find().sort({dateOut: -1})

    if(!rentals) return res.status(404).send("resource not found")

    res.status(201).send(rentals)
})

router.get('/:id', async (req,res)=> {
    const rental = await Rental.findById(req.params.id)

    if(!rental) return res.status(404).send("resource not found")

    res.status(201).send(rental)
})


router.post("/", async(req,res) => {
    const {error} = validateRental(req.body)
    if(error) return res.status(400).send(error.message)

    const {customerId ,movieId} = req.body

     

    const customer = await Customer.findById(movieId);
    if(!customer) return res.status(400).send("Invalid Customer ...")

    const movie = await Movie.findById(movieId)
    if(!movie) return res.status(400).send("Invalid movie ...")

   let newRental = new Rental({
        customer:{
            _id:customer._id,
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id : movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate 
        }
    })

    // transactions
    const session = await startSession()
    try {
        session.startTransaction()

        newRental =  await newRental.save();

        movie.numberInStock--;
        movie.save();

        await session.commitTransaction()
        session.endSession()
        res.status(201).send(newRental);
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error)
        res.send('Error')
    }


})


export default router
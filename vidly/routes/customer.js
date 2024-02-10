import express from "express"
import Customer from "../models/Customer.js"
import { validateCustomer } from "../validate.js"

const router = express.Router()


router.get('/',async (req,res) => {
    const customers = await Customer.find().sort({name: 1})

    if(!customers) return res.status(404).send("Resources not found")

    res.status(200).send(customers)
})

// Get one customer
router.get('/:id',async (req,res) => {
    const customer = await Customer.findById(req.params.id)

    if(!customer) return res.status(404).send("Resource not found")

    res.status(200).send(customer)
})


//Create a new customer 

router.post('/', async (req,res) => {
    
    const {error} = validateCustomer(req.body)
    
    if(error) return res.status(500).send(error.message)
    
    const {isGold,name,phone} = req.body
    const newCustomer = await new Customer({
        isGold,
        name,
        phone
    })
    
        const savedcustomer = await newCustomer.save()
    res.status(201).send(savedcustomer)

})


router.put('/:id',async(req,res) => {
    const customer = await Customer.findById(req.params.id)

    if(!customer) return res.status(404).send("No resource found")

  const {error} =  validateCustomer(req.body)
  if(error) return res.status(400).send(error.message)

  customer.isGold = req.body.isGold
  customer.phone = req.body.phone
  customer.name = req.body.name


    const updatedCustomer = await customer.save()
    return res.status(201).send(updatedCustomer)

})


router.delete('/:id',async(req,res) => {
    const customer = await Customer.findByIdAndRemove({_id:req.params.id})

    if(!customer) return res.status(404).send("Resource Not found")
    
    return res.send(customer)

})

export default router


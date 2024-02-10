import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js";
import { compare } from "bcrypt";
import { validateLogin } from "../validate.js";
import config from "config";

const router = express.Router();



router.post('/login', async (req,res) => {
    const {error} = validateLogin(req.body)
    if(error) return res.status(400).send("Bad request")

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Invalid email or password")

    const password = await compare(req.body.password, user.password)
    if(!password) return res.status(400).send("Invalid email or password")

    
    const token =  req.generateAuthToken()

    res.status(200).send(token)

})

export default router
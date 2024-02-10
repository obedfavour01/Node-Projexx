import express from "express"
import _ from "lodash";
import User from "../models/User.js";
import { validateRegisterUser } from "../validate.js";
import { genSalt, hash } from "bcrypt";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

//Get curreny user 

router.get("/me", auth, async(req, res) => {
   const user =   await User.findById(req.user._id).select('-password')

   if(!user) return res.status(400).send("Bad Request")



   res.status(200).send(user)
})  

router.post('/',async(req,res) => {
    
    const {error} = validateRegisterUser(req.body);
    if (error) return res.status(400).send(error.message)

    const user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).send("User already exist")

    const{email,password,name} = req.body
    const newUser = new User({
        name,
        email,
        password
    })

    const salt = await genSalt(10);
    newUser.password = await hash(newUser.password,salt)

    await newUser.save();
    
    const token = newUser.generateAuthToken()

    res.header('x-auth-token', token).send(_.pick(newUser,  ['_id','name','email']))

})


export default router
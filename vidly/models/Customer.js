import { Schema, model } from "mongoose";

const customerSchema = new Schema({
    isGold:{
        type: Boolean,
        required: true,
    },
    name : {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true
    },
    phone : {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        lowercase: true
    }
},{timestamps:true})

 const Customer = model('Customer', customerSchema)

 export default Customer
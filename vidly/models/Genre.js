import { Schema, model } from "mongoose";


export const genreSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        
    }
},{timestamps:true})




export const Genre = model('Genre',genreSchema)
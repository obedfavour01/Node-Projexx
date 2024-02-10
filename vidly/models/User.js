import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import config from "config"


const userSchema = new Schema({
    name: {
        type:String,
        minlength:5,
        maxlength: 255,
        trim: true,
        required: true,
    },
    email:{
        type:String,
        unique: true,
        trim:true,
        maxlength: 255,
        minlength:5,
    },
    password:{
        type:String,
        minlength: 8,
        maxlength: 255,
        
    },
    isAdmin:{
        type:Boolean,
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {
            _id:this._id, 
            isAdmin:this.isAdmin
        },config.get('jwtPrivateKey'))

    return token
}


const User = model('User',userSchema)


export default User
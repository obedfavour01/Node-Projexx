import { Schema, model } from "mongoose";

export const rentalSchema = new Schema({
    customer: {
        type: new Schema({
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
        }),
        required: true
    },

    movie: {
        type: new Schema({
            title:{
                type:String,
                minlength: 3,
                maxlength: 255,
                trim: true,
                required: true,
            },
          
            dailyRentalRate:{
                type:Number,
                default:0,
            }
        }),

        required: true
    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },

    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
})


const Rental = model('Rental', rentalSchema)

export default Rental
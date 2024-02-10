import Joi from "joi";
import joiObjectId from 'joi-objectid';
const JoiWithObjectId = joiObjectId(Joi);
JoiWithObjectId.objectId = JoiWithObjectId;



export function validateGenre(genre){

    const schema = Joi.object({
        title : Joi.string().min(3).max(50).required()
    })

    return  schema.validate(genre)
}



export function validateCustomer(customer){
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).max(50).lowercase().required(),
        phone: Joi.string().min(5).max(50).lowercase().required()
        

    })
    
        return schema.validate(customer)
}




export function validateMovie(movie){

    const schema = Joi.object({
        title : Joi.string().min(3).max(50).required(),
        numberInStock: Joi.number().min(0).max(255),
        genreId: JoiWithObjectId.objectId().required(),
        dailyRentalRate: Joi.number().min(0).max(255),

    })

    return  schema.validate(movie)
}

export function validateRental(rental){
    const schema = Joi.object({
        customerId: JoiWithObjectId.objectId().required(),
        movieId:JoiWithObjectId.objectId().required(),
    })

    return schema.validate(rental)
}


export function validateRegisterUser(user){
    const schema = Joi.object({
        name: Joi.string().min(8).max(255).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,50}$'))
    })


    return schema.validate(user)
}


export function validateLogin(user){
    const schema = Joi.object({
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,50}$'))
    })

    return schema.validate(user)
}
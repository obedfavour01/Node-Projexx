import jwt from "jsonwebtoken"
import config from "config"

export function auth(req,res,next){
    const token = req.header('x-auth-token')
    if(!token) return res.status(401).send("Acess denied. No token provided")

    try {
        const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
        req.user = decoded;
        next()
        //req.user = {_id:user._id}
    } catch (error) {
        res.status(400).send("Invalid token")
    }
}

// person.name = "solo"
//   req = {
 //        user: {
//                _id: user._id
//         }
//    }
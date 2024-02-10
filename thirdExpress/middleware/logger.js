 export function log(req,res,next){
    console.log("logging")
    next()
}


 export function auth(req,res,next){
    console.log("authenticating")
    next()
}



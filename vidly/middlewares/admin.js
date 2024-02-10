// 400 - Bad request
// 401 -UnAuthorized
// 403- Forbidden

export function admin(req,res,next){
    if(!req.user.isAdmin) return res.status(403).send("This is a forbidden request")

    next()
}
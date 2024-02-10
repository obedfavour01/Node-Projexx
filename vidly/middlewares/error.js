import { logger } from "../startup/logging.js"

export function error (err,req,res,next) {

    logger.log('error',err.message)
    res.status(500).send("Something happened")
}
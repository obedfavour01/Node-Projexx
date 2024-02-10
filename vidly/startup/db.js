import mongoose from "mongoose";
import { logger } from "./logging.js";
import config from "config"

export function mongoConnect(){

    const db = config.get("db")
    mongoose.connect(db,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
    )
    .then(() => { logger.log("info", `connected to ${db}..`)} )
}

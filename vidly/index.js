import "express-async-errors"
import express from "express";
import { routes } from "./startup/routes.js";
import { mongoConnect } from "./startup/db.js";
import { configuration } from "./startup/config.js";
import { logger } from "./startup/logging.js";
const app = express()


routes(app);
mongoConnect(); 
configuration();


const port = process.env.PORT || 6000
 const server = app.listen(port, () => {
    logger.log("info", `listening on port ${port}`)
})


export default server;
 
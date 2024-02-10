import express, { json } from "express";
import Joi from "joi";
import { auth, log } from "./middleware/logger.js";
const app = express();
import config from "config"
import Debug from "debug"
const startupDebugger = Debug("app:startUp");
const dbDebugger = Debug("app:db");
import genres from "./routes/genre.js";
import home from "./routes/home.js";

// Rendering template
app.set("view engine", "pug");
app.set("views", "./views");


// Built-in middlewares
app.use(express.json());
app.use(express.static("public"));


// Custom middlewares
app.use(auth);
app.use(log);

// Routes
app.use("/api/genres", genres);
app.use('/',home)


// Configuration
console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail server: ${config.get("mail.host")}`);

if (app.get("env") == "development") {
  startupDebugger("Morgan Loading....");
}

dbDebugger("Db is connected");




const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}...`);
});


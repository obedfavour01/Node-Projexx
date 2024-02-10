import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/mongo-exercises")
.then(() => {
    console.log("Connected to mongodb database..")
})
.catch((err) => console.log("Could not conect to Mongodb ...", err))
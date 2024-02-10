import mongoose, { Schema } from "mongoose";
import { createCourse, getCourses, updateCourse, updateFirstCourse } from "./Model/Courses.js";

mongoose.connect("mongodb://localhost/mongo-exercises")
.then(() => { console.log("connected to Mongodb..")} )
.catch((err) => console.log("could not connect to mongo db...", err))



    createCourse();
    

async function run(){
    // const courses = await getCourses()
    // console.log(courses)
}

// updateCourse("64cbe6209e6bf8a659e94a91")
// updateFirstCourse("64cbe6209e6bf8a659e94a91")
// run();

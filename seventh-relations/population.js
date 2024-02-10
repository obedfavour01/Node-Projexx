import mongoose, { Schema, Types, model } from "mongoose";


mongoose.connect("mongodb://localhost/playzone")
    .then(() => console.log("Connected to db ..."))
    .catch(err => console.log("Error connecting to db :", err))


const Author = model('Author', new Schema({
    name: String,
    bio:String,
    website:String
}))


const Course = model('Course', new Schema({
    name: String,
    author:{
        type: Types.ObjectId,
        ref: "Author"
    }
}))


async function createAuthor(name,bio,website){

    const author = new Author({
        name,
        bio,
        website
    })

    const result = await author.save()
    console.log(result)
}

async function createCourse(name, author){
    const course = new Course({
        name,
        author
    })

    const result = await course.save()
    console.log(result)
}


async function listCourses(){
    const courses = await Course.find().populate('author','name -_id').select({name: 1, author: 1});
    console.log(courses)
}


// createAuthor("Mosh","My bio","My website")
// createCourse("Node")
listCourses()
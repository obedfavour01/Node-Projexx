import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://localhost/playground")
.then(() => { console.log("connected to Mongodb..")} )
.catch((err) => console.log("could not connect to mongo db...", err))

const courseSchema = new Schema({
    name : String,
    author:String,
    tags : [String],
    date : {type : Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course',courseSchema)


async function createCourse(){


    const nodeCourse = new Course({
        name: "Python course",
        author: "Mosh",
        tags : ["Python", "backend","AI"],
        isPublished: true
        
    })
    
    const result = await nodeCourse.save()
    console.log(result)
}


async function getCourse(){
    const courseResult = await Course
        // .find({author:"Mosh"})
        // .find({price: {$gt : 10, $lte : 20}})
        // .find({price : {$in : [10, 15, 20]}})
        // .find()
        // .or([{author:"Mosh"}, {isPublished: false}]) logical

        .find({author: /^Mosh/i})
        .find({author: /.*Mosh.*/i})
        .limit(2)
        .sort({name:"asc"})
        .select({name: 1,tags: 1})



    console.log(courseResult)
}

getCourse()
// createCourse()
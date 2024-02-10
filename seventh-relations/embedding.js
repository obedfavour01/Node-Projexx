import mongoose, { Schema, Types, model } from "mongoose";


mongoose.connect("mongodb://localhost/playzone")
    .then(() => console.log("Connected to db ..."))
    .catch(err => console.log("Error connecting to db :", err))


const authorSchema =  new Schema({
    name: String,
    bio:String,
    website:String
});


const Author = model('Author', authorSchema);

const Course = model('Course', new Schema({
    name: String,
    authors:[authorSchema] 
    
}));



async function createAuthor(name,bio,website){

    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
}

async function createCourse(name, authors){
    const course = new Course({
        name,
        authors
    })

    const result = await course.save()
    console.log(result)
}


async function listCourses(){
    const courses = await Course.find();
    console.log(courses)
}

async function updateAuthor(courseId){
//   const course =  await Course.findById(courseId)
    const course = await Course.findByIdAndUpdate({_id:courseId},{
        'author.name' : 'Code dev'  
    })
   await course.save()
}

async function addAuthor(courseId,author){
    const course = await Course.findById(courseId)
    course.authors.push(author)
    await course.save()
}
//  createCourse("Node Course", [
//     new Author({name: "Mosh"}),
//     new Author({name: "Donnel"}),
//     new Author({name: "Zion"})
// ])


async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    // const author = course.authors.find(val => val._id == authorId)
    const author = course.authors.id(authorId)
    
 const index = course.authors.indexOf(author)

 course.authors.splice(index, 1)

   

  await course.save()
}
// addAuthor("64d20b5bc929adf38e619530",
//         new Author({name: "Paul Washer"}))


        removeAuthor("64d20b5bc929adf38e619530", "64d20b5bc929adf38e61952f")
// updateAuthor("64d2055b426340736609c81a")

// listCourses()

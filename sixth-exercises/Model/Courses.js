import mongoose, { Schema, model } from "mongoose";

const courseSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    author: String,
    price:{
        type: Number,
        required: function(){return this.isPublished}
    },
    category:{
        type:String,
        enum: ['web','mobile','network']
    },
    // tags: [String],
    tags:{
        type:Array,
        validate:{
            validator:function(arr){
                return arr && arr.length > 0
            },
            message:"A course should have at least one tag"
        }
    },
    date: {type: Date, default:Date.now()},
    isPublished: Boolean,
}) 

const Course =  model('Course', courseSchema)

 export async function createCourse(){

    const course = new Course({
        name : "Node course",
        author: "Mosh",
        category:"-",
        price: 25,
        tags: null,
        isPublished: false  
    })
    
    try {
        
        const result = await course.save()
        console.log(result)
    } catch (ex) {
        for (let field in ex.errors){
            console.log(field)
        }
        
    }
}


export async function getCourses(){

    const result = await Course
        .find({isPublished: true})
.or([{price:{$gte : 15}}, {name: /.*by.*/i} ])
        .sort({price:-1})
        .select('name author price');
        
    return result
        
}



export async function updateCourse(id){
    const course = await Course.findById(id)

    if(!course) return;

    course.set({
        isPublished: true,
        author: "Not my business"
    })

    const result = await course.save()
    console.log(result)
}


export async function updateFirstCourse(id){

    const result = await Course.findByIdAndUpdate(id,{
        $set:{
            author:'Jason',
            isPublished: true
        }
    },{new:true})

    console.log(result)
} 







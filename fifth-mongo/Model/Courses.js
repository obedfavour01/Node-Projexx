import mongoose, { Schema } from "mongoose"

const CourseSchema = new Schema({
    name: String,
    author: String,
    tags : [String],
    date: {type: Date, default: Date.now()},
    isPublished: Boolean
})
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quizCreated: {
        type:Number,
        required: true,
        default: 0
    },
    questionsCreated : {
        type:Number,
        required: true,
        default: 0
    },
    totalImpressions: {
        type:Number,
        required: true,
        default: 0
    }

}, { timestamp: true });
const users = mongoose.model('users', userSchema)
export default users;
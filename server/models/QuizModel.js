import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    quizId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["QnA", "Poll"],
    },
    
    impressions: {
        type: Number,
        required: false,
        default: 0,
    },
    questions: {
        type: Array,
        required: true,
        default: [],
    }

}, {
    timestamps: true  
})


const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz;
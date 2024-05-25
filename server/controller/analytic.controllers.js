import Quiz from "../models/QuizModel";
import Question from "../models/QuestionsModel";
import users from "../models/userModel";

const convertToK = (num) => {
    return num > 999 ? (num / 1000).toFixed(1) + "K" : num;
};

export const getAllQuiz = async (req, res) => {
    let success = false;
    const user = req.user;

    try {
        const quizzes = await Quiz.find({ user: user.id }, "name impressions createdOn type quizID");
        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ success, error: "No Quizzes Found!" });
        }

        const formattedQuizzes = quizzes.map((quiz) => ({
            name: quiz.name,
            impressions: convertToK(quiz.impressions),
            createdOn: quiz.createdOn,
            type: quiz.type,
            quizID: quiz.quizID,
        }));

        success = true;
        return res.json({ success, quizzes: formattedQuizzes });
    } catch (error) {
        console.error("Error in getAllQuiz controller:", error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};



export const getQuestions = async (req, res) => {
    let success = false;
    const user = req.user;
    const { quizid } = req.body;

    try {
        const quiz = await Quiz.findOne({ user: user.id, quizID: quizid }, "name impressions createdOn type quizID");
        if (!quiz) {
            return res.status(404).json({ success, error: "Quiz Not Found!" });
        }

        const questions = await Question.find({ quiz: quizid }, "question type options attempts correct incorrect optedOption1 optedOption2 optedOption3 optedOption4");

        success = true;
        return res.json({ success, quiz, questions });
    } catch (error) {
        console.error("Error in getQuestions controller:", error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};



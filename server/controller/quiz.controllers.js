import users from "../models/userModel";
import Quiz from "../models/QuizModel";
import Question from "../models/QuestionsModel";
import generateQuizID from "../utils/generateQuizId";
import convertToTitleCase from "../utils/convertToTitleCase";
export const validateQuestion = (question, i, type) => {
    const { question: questionText, optionType, correctAnswer, options, imageOptions, timer } = question;
    if (questionText.length < 4) return `Question ${i + 1} must be at least 4 characters long!`;
    if (timer && ![0, 5, 10].includes(timer)) return `Question ${i + 1} Timer can only be 5, 10, or 0!`;
    if (!["text", "img", "both"].includes(optionType)) return `Question ${i + 1} Option Type can only be Text, Image, Both!`;
    if (options.length < 2) return `Question ${i + 1} must have at least 2 options!`;

    for (let j = 0; j < options.length; j++) {
        if (options[j] && options[j].length < 1) return `Question ${i + 1} Option ${j + 1} must be at least 1 character long!`;
    }

    for (let j = 0; j < imageOptions.length; j++) {
        if (imageOptions[j] && imageOptions[j].length < 1) return `Question ${i + 1} Image Option ${j + 1} must be at least 1 character long!`;
    }

    if (optionType === "text" || optionType === "both") {
        if (type !== "poll" && correctAnswer.length < 1) return `Question ${i + 1} Correct Answer must be at least 1 character long!`;
    }

    if (optionType === "img" || optionType === "both") {
        if (type !== "poll" && correctAnswer.length < 1) return `Question ${i + 1} Correct Answer must be at least 1 character long!`;
    }

    return null;
};

export const createQuiz = async (req, res) => {
    let success = false;

    let user = req.user;

    let { name, type, questions } = req.body;

    name = name.toString().toLowerCase();
    type = type.toString().toLowerCase();

    try {
        const foundUser = await users.findOne({ _id: user._id });
        if (!foundUser) {
            return res.status(404).json({ success, error: "User not found" });
        }

        name = convertToTitleCase(name);

        const existingQuiz = await Quiz.findOne({
            name,
            user: foundUser._id,
        });

        if (existingQuiz) {
            return res.status(400).json({ success, error: "Quiz already exists" });
        }

        if (questions.length > 5) {
            return res.status(400).json({ success, error: "Maximum 5 questions are allowed" });
        }
        if (questions.length < 1) {
            return res.status(400).json({ success, error: "Minimum 1 question is required" });
        }

        if (name.length < 3) {
            return res.status(400).json({ success, error: "Quiz name should be at least 3 characters" });
        }

        for (let i = 0; i < questions.length; i++) {
            const error = validateQuestion(questions[i], i, type);
            if (error) return res.status(400).json({ success, error });
        }

        let quizID = generateQuizID();
        let quizidtest = await Quiz.findOne({ quizID });
        while (quizidtest) {
            quizID = generateQuizID();
            quizidtest = await Quiz.findOne({ quizID });
        }

        let finalQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            const { question, optionType, correctAnswer, options, imageOptions, timer } = questions[i];
            const newQuestion = await Question.create({
                question,
                optionType,
                quiz: quizID,
                correctAnswer: type === "poll" ? "NA" : correctAnswer,
                options,
                imageOptions,
                type,
                timer,
            });
            finalQuestions.push(newQuestion._id);
        }

        const newQuiz = await Quiz.create({
            name,
            type,
            questions: finalQuestions,
            quizID,
            user: foundUser._id,
        });

        foundUser.quizCreated += 1;
        foundUser.questionsCreated += questions.length;
        await foundUser.save();

        success = true;
        res.json({
            success,
            info: "Quiz Created Successfully!!",
            quizID: newQuiz.quizID,
        });
    } catch (error) {
        console.log("Error in createQuiz controller", error.message);
        res.status(500).json({ success, error: "Internal Server Error" });
    }
};

export const getQuiz = async (req, res) => {
    let success = false;
    const quizID = req.params.quizID;

    try {
        const quiz = await Quiz.findOne({ quizID });
        if (!quiz) {
            return res.status(404).json({ success, error: "Quiz Not Found!" });
        }

        // Update impressions
        quiz.impressions += 1;
        await quiz.save();

        const user = await users.findOne({ _id: quiz.user });
        if (!user) {
            return res.status(404).json({ success, error: "User Not Found!" });
        }

        user.totalImpressions += 1;
        await user.save();

        success = true;
        return res.json({ success, quiz });
    } catch (error) {
        console.error("Error in getQuiz controller:", error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};

export const takeQuiz = async (req, res) => {
    let success = false;
    const quizID = req.params.quizID;
    const { answers } = req.body;

    try {
        const quiz = await Quiz.findOne({ quizID });
        if (!quiz) {
            return res.status(404).json({ success, error: "Quiz Not Found!" });
        }

        if (quiz.type !== "qna") {
            return res.status(400).json({ success, error: "This is not a QnA Quiz!" });
        }

        const questions = quiz.questions;
        const total = questions.length;
        let score = 0;
        let attempted = 0;
        let correct = 0;
        let incorrect = 0;

        for (let i = 0; i < questions.length; i++) {
            const questionId = questions[i];
            const answer = answers[i];
            const question = await Question.findById(questionId);

            if (!question) {
                return res.status(404).json({ success, error: `Question ${i + 1} Not Found!` });
            }

            if (answer !== "") {
                attempted++;
                question.attempts++;

                if (answer === question.correctAnswer) {
                    correct++;
                    score++;
                    question.correct++;
                } else {
                    incorrect++;
                    question.incorrect++;
                }

                await question.save();
            }
        }

        const result = {
            score,
            total,
            attempted,
            correct,
            incorrect,
        };

        success = true;
        return res.json({ success, result });
    } catch (error) {
        console.error("Error in takeQuiz controller:", error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};

export const takePoll = async (req, res) => {
    let success = false;
    const quizID = req.params.quizID;
    const { answers } = req.body;
    const delimiter = ";"; // Assuming delimiter is a constant, define it here or pass it appropriately.

    try {
        const quiz = await Quiz.findOne({ quizID });
        if (!quiz) {
            return res.status(404).json({ success, error: "Quiz Not Found!" });
        }

        if (quiz.type !== "poll") {
            return res.status(400).json({ success, error: "This is not a Poll!" });
        }

        const questions = quiz.questions;

        for (let i = 0; i < questions.length; i++) {
            const questionId = questions[i];
            let answer = answers[i];
            const question = await Question.findById(questionId);

            if (!question) {
                return res.status(404).json({ success, error: `Question ${i + 1} Not Found!` });
            }

            let selectedOption = "";
            if (question.optionType === "text") {
                selectedOption = answer.split(delimiter)[0];
            } else if (question.optionType === "img") {
                selectedOption = answer.split(delimiter)[1];
            } else if (question.optionType === "both") {
                selectedOption = answer.split(delimiter)[0] + answer.split(delimiter)[1];
            }

            const updateOptedOptionCount = (optionArray, selectedOption, question) => {
                for (let j = 0; j < optionArray.length; j++) {
                    if (selectedOption === optionArray[j]) {
                        question[`optedOption${j + 1}`] += 1;
                        break;
                    }
                }
            };

            if (question.optionType === "text") {
                updateOptedOptionCount(question.options, selectedOption, question);
            } else if (question.optionType === "img") {
                updateOptedOptionCount(question.imageOptions, selectedOption, question);
            } else if (question.optionType === "both") {
                updateOptedOptionCount(
                    question.options.map((opt, idx) => opt + question.imageOptions[idx]),
                    selectedOption,
                    question
                );
            }

            question.attempts += 1;
            await question.save();
        }

        success = true;
        return res.json({ success, info: "Poll Submitted Successfully!!" });
    } catch (error) {
        console.error("Error in takePoll controller:", error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};
export const deleteQuiz = async (req, res) => {
    let success = false;
    const quizID = req.params.quizID;
    let user = req.user;

    try {
        const quiz = await Quiz.findOne({ quizID });
        if (!quiz) {
            return res.status(404).json({ success, error: "Quiz Not Found!" });
        }

        user = await User.findById(user.id);
        if (!user) {
            return res.status(404).json({ success, error: "User Not Found!" });
        }

        if (quiz.user.toString() !== user.id.toString()) {
            return res.status(403).json({
                success,
                error: "You are not authorized to delete this quiz!",
            });
        }

        const questions = quiz.questions;
        for (const questionId of questions) {
            const question = await Question.findById(questionId);
            if (!question) {
                return res.status(404).json({ success, error: "Question Not Found!" });
            }
            await question.deleteOne();
        }

        await quiz.deleteOne();

        user.quizCreated -= 1;
        user.questionsCreated -= questions.length;
        user.totalImpressions -= quiz.impressions;
        await user.save();

        success = true;
        return res.json({ success, info: "Quiz Deleted Successfully!!" });
    } catch (error) {
        console.error("Error in deleteQuiz controller:", error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};

export const getTrending = async (req, res) => {
    let success = false;
    const user = req.user;

    try {
        let quizzes = await Quiz.find({ user: user.id }, "impressions createdOn name")
            .sort({ impressions: -1 })
            .exec();

        quizzes = quizzes.filter(quiz => quiz.impressions > 10);

        success = true;
        return res.json({ success, quizzes });
    } catch (error) {
        console.error("Error in getTrending controller:", error.message);
        return res.status(500).json({ success, error: "Internal Server Error" });
    }
};

export const getQuestion = async (req, res) => {
    const { questionID } = req.params;

    try {
        const question = await Question.findById(questionID);
        if (!question) {
            return res.status(404).json({ success: false, error: "Question Not Found!" });
        }

        return res.json({ success: true, question });
    } catch (error) {
        console.error("Error in getQuestion controller:", error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};





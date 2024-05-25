import express from "express";
import {
    createQuiz,
    deleteQuiz,
    getQuestion,
    getQuiz,
    getTrending,
    takePoll,
    takeQuiz
} from "../controller/quiz.controllers.js";
import protectRoute from "../middleware/protectedRoutes";// Assuming protectRoute is your authentication middleware

const router = express.Router();

router.post("/create", protectRoute, createQuiz);
router.get("/:quizID", getQuiz);
router.post("/:quizID/take", takeQuiz);
router.delete("/:quizID", protectRoute, deleteQuiz);
router.post("/poll/:quizID", takePoll);
router.get("/trending", protectRoute, getTrending);
router.get("/question/:questionID", getQuestion);

export default router;

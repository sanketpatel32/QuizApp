import express from "express";
import protectRoute from "../middleware/protectedRoutes";
import {getAllQuiz,getQuestions} from  "../controller/analytic.controllers"
const router = express.Router();

router.get('/allquiz' , getAllQuiz);
router.get('/getquestions' , getAllQuiz);

export default router;
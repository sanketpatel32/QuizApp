import express from "express";
import { register, login, logout} from "../controller/auth.controllers.js";
import protectRoute from "../middleware/protectedRoutes.js";
const router = express.Router();

//routes for authentication

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

//routes after authentication

export default router;
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors';
import connectToMongoDB from './config/connectToMongoDB.js';
import authRoutes from './routes/auth.routes.js'
import quizRoutes from './routes/quizzes.js';
import analyticsRoutes from './routes/analytics.routes.js'

// const __dirname = path.resolve();

dotenv.config();
const app = express()
const __dirname = path.resolve();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")))
const corsOptions = {
    credentials: true,
    origin: "*",
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//authentication
app.use('/api/auth',authRoutes);
app.use('/api/quiz',quizRoutes);
app.use('/api/analytics',analyticsRoutes);

app.get('/check', (req, res) => {
    res.send('Yes you are working')
})

// app.get("*", (req, res) => {
//     // res.sendFile(path.resolve(__dirname,"client","dist", "index.html"));
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });


const port = process.env.PORT || 8000
app.listen(port, () => {
    connectToMongoDB();
})

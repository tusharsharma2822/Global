import express from "express";
import 'dotenv/config.js';
import morgan from 'morgan';
import connectToDB from "./db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import studentRoutes from './routes/student.routes.js';
const app = express();

connectToDB();

app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello, World!");
})

app.use('/students', studentRoutes)

export default app;
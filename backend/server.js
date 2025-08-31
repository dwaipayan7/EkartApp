import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/index.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(userRouter);

const PORT = process.env.PORT || 3000;

connectDB();


app.listen(PORT, () => {
    console.log(`Server is running in: ${PORT}`);
});


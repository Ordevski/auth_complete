import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 9999;

const allowedOrigins = ['http://localhost:5173'];

// database connection
connectDB();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowedOrigins }));

// routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});


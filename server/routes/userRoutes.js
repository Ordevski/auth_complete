import express from "express";
import authMiddleware from "../middlewares/authMIddleware.js";
import { getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/data', authMiddleware, getUserData);

export default userRouter;
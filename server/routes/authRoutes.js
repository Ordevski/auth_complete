import express from "express";
import authMiddleware from "../middlewares/authMIddleware.js";
import { login, logout, register, sendVerifyOtp, verifyEmail, 
    sendResetOtp, resetPassword, isAuthenticated} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.post('/send-verify-otp', authMiddleware, sendVerifyOtp);
authRouter.post('/verify-account', authMiddleware, verifyEmail);
authRouter.post('/is-auth', authMiddleware, isAuthenticated)

authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);


export default authRouter;
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import transporter from "../config/nodemailer";

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(500).json({
            success: false,
            message: "Missing details"
        })
    }

    try {
        const existingUser = User.findOne({ email });

        if(existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bycrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome!',
            text: `Welcome! Your account has been created with Email ID: ${email}.`
        };

        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "Successfully registered!"});
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.json({
            success: false,
            message: "Email and Password are required",
        });
    }

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.json({
                success: false,
                message: "Invalid Email",
            }); 
        }

        const isMatch = await bycrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({
                success: false, 
                message: "Invalid Password" 
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: "Successfully Logged in!" });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        return res.json({
            success: true,
            message: "Logged Out!"
        });     
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);

        if(user.isAccountVerified){
            return res.json({
                success: false,
                message: "Account already Verified!"
            })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpiryTime = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account Verification OTP",
            text: `Your OTP is ${otp}. Verify your account using this OTP.`,
          };
          
          await transporter.sendMail(mailOptions);
          
          res.json({success: true, message: "Verification OTP Sent!"});
    } catch (error) {
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};

export const verifyEmail = async (req, res) => {

};

export const isAuthenticated = async (req, res) => {

};

export const sendResetOtp = async (req, res) => {

};

export const resetPassword = async (req, res) => {

};
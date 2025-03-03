import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verifyOtp: {
        type: String,
        default: ""
    },
    verifyOtpExpiryTime: {
        type: Number,
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ""
    },
    resetOtpExpiryTime: {
        type: Number,
        default: 0
    }
});

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;
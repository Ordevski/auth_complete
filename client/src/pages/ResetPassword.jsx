import React, { useState } from "react";
import { assets } from "../assets/assets";

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  

  const onSubmitEmail = async (e) => {

  };

  const onSubmitOtp = async (e) => {

  };

  const onSubmitNewPassword = async (e) => {

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <img onClick={() => navigate('/')} src={assets.letter_m} className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" alt="logo"/>
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter your registered email address</p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="mail_icon" className="w-3 h-3" />
            <input className="bg-transparent outline-none text-white" type="email" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">Submit</button>
        </form>
      )}
        
      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOTP} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password OTP</h1>
          <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email</p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
                <input type="text" maxLength="1" key={index} required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md" />
            ))}
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3"> Submit</button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"> 
          <h1 className="text-white text-2xl font-semibold text-center mb-4">New password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter the new password below</p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="lock_icon" className="w-3 h-3" />
            <input type="password" placeholder="Password" className="bg-transparent outline-none text-white"
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
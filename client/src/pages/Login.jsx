import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {

  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-white to-gray-100">
        <img onClick={() => navigate('/')} src={assets.letter_m} className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer" alt="logo"/>
        <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
          <h2 className="text-3xl font-semibold text-white text-center mb-3">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>

          <p className="text-center text-sm mb-6">
            {state === "Sign Up" ? "Create your account!" : "Login to your account!"}
          </p>

          <form onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="person_icon" />
                <input onChange={(e) => setName(e.target.value)} className="bg-transparent outline-none" value={name} type="text" placeholder="Full Name" required />
              </div>
            )}
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="mail_icon" />
              <input onChange={(e) => setEmail(e.target.value)} className="bg-transparent outline-none" value={email} type="email" placeholder="Email" required />
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="lock_icon" />
              <input onChange={(e) => setPassword(e.target.value)} className="bg-transparent outline-none" value={password} type="password" placeholder="Password" required />
            </div>

            <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot password?</p>
            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{state}</button>
          </form>
          
          {state === "Sign Up" ? (
            <p className="text-gray-400 text-center text-xs mt-4">
              Already have an account?{" "}
              <span onClick={() => setState("Login")} className="text-blue-400 cursor-pointer underline">Login</span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-xs mt-4">
              Don't have an account?{" "}
              <span onClick={() => setState("Sign Up")} className="text-blue-400 cursor-pointer underline">Sign up</span>
            </p>
          )}
        </div>
    </div>
  );
};

export default Login;
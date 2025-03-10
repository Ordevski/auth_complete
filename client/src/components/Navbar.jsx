import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    
    const { userData, auth_api_url, setUserData, setIsLoggedIn } = useContext(AppContext);

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;

            const response = await axios.post(auth_api_url + '/send-verify-otp');
            if (response.data.success) {
                navigate("/email-verify");
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post(auth_api_url + '/logout');

            response.data.success &&  setIsLoggedIn(false);
            response.data.success && setUserData(false);
            navigate('/');
        } catch (error) {
            toast.error(error.message);         
        }
    };

    return (
        <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
            <img src={assets.letter_m} alt="logo" className="w-14 sm:w-16" />
            {userData ? (
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
                    {userData.name[0].toUpperCase()}
                    <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                        <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                            {!userData.isAccountVerified && (
                                <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-gray-200 cursor-pointer">Verify Email</li>
                            )}
                            <li onClick={logout} className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10">Logout</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <button onClick={() => navigate('/login')} className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all">
                    Login <img src={assets.arrow_icon} alt="arrow_icon" />
                </button>
            )}
        </div>
    );
}

export default Navbar;
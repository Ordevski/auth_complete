import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const auth_api_url = import.meta.env.VITE_AUTH_API_URL;
    const user_api_url = import.meta.env.VITE_USER_API_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);    

    const getUserData = async () => {
        try {
            const response = await axios.get(user_api_url + '/data');
            response.data.success ? setUserData(response.data.userData) : toast.error(response.data.message);
        } catch (error) {
            toast.error(response.data.message);
        }
    };

    const getAuthState = async () => {
        try {
            const response = await axios.get(auth_api_url + '/is-auth');
            if (response.data.success) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            toast.error(response.data.message);
        }
    };

    useEffect(() => {
        getAuthState();
    }, [])

    const value = {
        auth_api_url,
        isLoggedIn, setIsLoggedIn,
        userData, setUserData, getUserData
    };

    return (
        <AppContext.Provider value={value}> 
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;
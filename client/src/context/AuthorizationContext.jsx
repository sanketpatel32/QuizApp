import { createContext, useState,useEffect } from "react";

export const AuthorizationContext = createContext();

const AuthorizationContextProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const jsonString = localStorage.getItem('currentUser');
        if (jsonString !== null) {
            const retrievedObject = JSON.parse(jsonString);
            setUserDetails(retrievedObject);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthorizationContext.Provider value={{ userDetails, setUserDetails, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export default AuthorizationContextProvider;
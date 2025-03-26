import React, { useState, useEffect, useCallback } from "react";
import UserInactivity from "react-native-user-inactivity";
import useUserContext from "./userProvider";

const AutoLogoutWrapper = ({ children }) => {
    const { signOut, extendToken, isSignedIn } = useUserContext();
    const [isActive, setIsActive] = useState(true);

    const handleInactivity = useCallback((active) => {
        setIsActive(active);
        if (active) {
            extendToken();
        } else {
            signOut();
        }
    }, [extendToken, signOut]);

    return (
        <UserInactivity
            isActive={isSignedIn}
            timeForInactivity={5 * 60 * 1000}
            onAction={handleInactivity}
        >
            {children}
        </UserInactivity>
    );
};

export default AutoLogoutWrapper;
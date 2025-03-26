import React, { useState, useCallback } from "react";
import UserInactivity from "react-native-user-inactivity";
import useUserContext from "./userProvider";
import useSmartAutoSignOut from "./useSmartAutoSignOut";


const AutoLogoutWrapper = ({ children }) => {
    const { isSignedIn, signOut, extendToken } = useUserContext();
    const {trackActivity, setTrackActivity} = useSmartAutoSignOut(isSignedIn, signOut);

    const handleInactivity = useCallback((active) => {
        if (active) {
            extendToken();
            setTrackActivity(false);
        } else {
            signOut();
        }
    }, [extendToken, signOut]);

    return (
        <UserInactivity
            isActive={trackActivity}
            timeForInactivity={60000}
            onAction={handleInactivity}
        >
            {children}
        </UserInactivity>
    );
};

export default AutoLogoutWrapper;
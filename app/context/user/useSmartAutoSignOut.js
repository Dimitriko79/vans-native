import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AppState} from "react-native";

const useSmartAutoSignOut = (isSignedIn, signOut, extendToken, expiresAt) => {
    const appState = useRef(AppState.currentState);
    const [isActive, setIsActive] = useState(appState.current === 'active');

    useEffect(() => {
        let timer;
        const setup = async () => {
            if (!isSignedIn || !expiresAt) return;

            const tokenData = await AsyncStorage.getItem("sign-token");
            if (!tokenData) return;

            // const { expiresAt } = JSON.parse(tokenData);
            const timeLeft = expiresAt - Date.now();

            if (timeLeft <= 0) {
                signOut();
                return;
            }

            const monitorDelay = timeLeft - 60 * 1000;
            console.log(222, 'monitorDelay', monitorDelay)
            timer = setTimeout(() => {
                const isStillActive = appState.current === 'active';
                setIsActive(isStillActive);
            }, monitorDelay);
        };

        setup();

        return () => clearTimeout(timer);
    }, [isSignedIn, expiresAt]);
    console.log(1111, 'isActive', isActive)
    useEffect(() => {
        if(isActive){
            extendToken();
        } else {
            signOut();
        }
    }, [isActive]);
};

export default useSmartAutoSignOut;
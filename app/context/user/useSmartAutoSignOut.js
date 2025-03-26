import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSmartAutoSignOut = (isSignedIn, signOut) => {
    const timeoutRef = useRef(null);
    const [trackActivity, setTrackActivity] = useState(false);
    useEffect(() => {
        const setup = async () => {
            if (!isSignedIn) return;

            const tokenData = await AsyncStorage.getItem("sign-token");
            if (!tokenData) return;

            const { expiresAt } = JSON.parse(tokenData);
            const timeLeft = expiresAt - Date.now();
            if (timeLeft <= 0) {
                signOut();
                return;
            }

            const monitorDelay = timeLeft - (60 * 1000);
            if (monitorDelay <= 0) {
                setTrackActivity(true);
            } else {
                timeoutRef.current = setTimeout(() => {
                    setTrackActivity(true);
                }, monitorDelay);
            }
        };

        setup();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isSignedIn]);

    return {
        trackActivity, setTrackActivity
    }
};

export default useSmartAutoSignOut;
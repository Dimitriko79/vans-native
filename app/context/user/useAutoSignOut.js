import { useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAutoSignOut = (isSignedIn, signOut) => {
    const timeoutRef = useRef(null);

    useEffect(() => {
        const setupTimeout = async () => {
            if (!isSignedIn) return;

            const tokenData = await AsyncStorage.getItem("sign-token");
            if (!tokenData) return;

            const { expiresAt } = JSON.parse(tokenData);
            const timeLeft = expiresAt - Date.now();

            if (timeLeft <= 0) {
                signOut();
            } else {
                timeoutRef.current = setTimeout(() => {
                    signOut();
                }, timeLeft);
            }
        };

        setupTimeout();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isSignedIn, signOut]);
};

export default useAutoSignOut;
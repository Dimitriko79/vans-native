import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

const useSmartAutoSignOut = (isSignedIn, signOut, extendToken, expiresAt) => {
    // const appState = useRef(AppState.currentState);
    // const [isActive, setIsActive] = useState(appState.current === 'active');
    // const timerRef = useRef(null);
    let timer;

    // Подписка на AppState
    // useEffect(() => {
    //     const handleAppStateChange = (nextAppState) => {
    //         appState.current = nextAppState;
    //     };
    //
    //     const subscription = AppState.addEventListener('change', handleAppStateChange);
    //
    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);

    // Основная логика
    useEffect(() => {
        if (!isSignedIn || !expiresAt) return;

        const setup = async () => {
            const tokenData = await AsyncStorage.getItem("sign-token");
            if (!tokenData) return;

            const timeLeft = expiresAt - Date.now();
            if (timeLeft <= 0) {
                signOut();
                return;
            }

            const monitorDelay = timeLeft - 60 * 1000; // за минуту до истечения
            if (monitorDelay <= 0) {
                signOut();
                // // если уже меньше минуты осталось
                // const isStillActive = appState.current === 'active';
                // setIsActive(isStillActive);
                return;
            }

            timer = setTimeout(() => {
                signOut();
                // const isStillActive = appState.current === 'active';
                // setIsActive(isStillActive);
            }, monitorDelay);
        };

        setup();

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isSignedIn, expiresAt]);

    // Результат на основе активности
    // useEffect(() => {
    //     if (!isSignedIn) return;
    //     if (isActive) {
    //         extendToken();
    //     } else {
    //         signOut();
    //     }
    // }, [isActive]);
};

export default useSmartAutoSignOut;
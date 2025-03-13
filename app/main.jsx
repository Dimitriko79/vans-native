import { Animated } from "react-native";
import { router, Slot } from "expo-router";
import React, { useEffect, useState } from "react";

const Main = ({children, scrollY}) => {
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!isRedirecting) {
            setIsRedirecting(true);
            router.replace({ pathname: "/homepage" });
        }
    }, [isRedirecting]);

    return (
        <Animated.ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
        >
            <Slot />
            {children}
        </Animated.ScrollView>
    );
};

export default Main;
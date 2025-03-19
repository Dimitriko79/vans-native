import {Animated} from "react-native";
import { router, Slot } from "expo-router";
import React, {useEffect, useState} from "react";
import useCartProvider from "./context/cart/cartProvider";

const Main = ({children, scrollY}) => {
    const [isRedirecting, setIsRedirecting] = useState(false);
    const {setIsLoadMore} = useCartProvider();

    useEffect(() => {
        if (!isRedirecting) {
            setIsRedirecting(true);
            router.replace({ pathname: "/homepage" });
        }
    }, [isRedirecting]);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    };

    return (
        <Animated.ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false, listener: (event) => {
                        if (isCloseToBottom(event.nativeEvent)) {
                            if(router.pathname !== "/category"){
                                setIsLoadMore(true);
                            }
                        }
                    }}
            )}
            scrollEventThrottle={16}
        >
        <Slot />
            {children}
        </Animated.ScrollView>
    );
};

export default Main;
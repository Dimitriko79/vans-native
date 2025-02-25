import {Dimensions, ScrollView, View} from "react-native";
import { router, Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import Footer from "./components/footer/footer";

const { height } = Dimensions.get("window");

const Main = ({children}) => {
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!isRedirecting) {
            setIsRedirecting(true);
            router.replace({ pathname: "/homepage" });
        }
    }, [isRedirecting]);

    return (
        <ScrollView>
            <Slot />
            {children}
        </ScrollView>
    );
};

export default Main;
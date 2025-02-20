import { ScrollView } from "react-native";
import { router, Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import Footer from "./components/footer/footer";

const Main = () => {
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
            <Footer/>
        </ScrollView>
    );
};

export default Main;
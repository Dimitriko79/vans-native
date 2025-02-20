import { ScrollView } from "react-native";
import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";

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
        </ScrollView>
    );
};

export default Main;
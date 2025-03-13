import { Animated, Dimensions, SafeAreaView, StatusBar } from "react-native";
import Header from "./components/header/header";
import { ApolloProvider } from "@apollo/client";

import Main from "./main";
import SideBarMenu from "./components/sideBarMenu/sideBarMenu";
import React, { useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import { router, SplashScreen } from "expo-router";
import "../index.css";
import Footer from "./components/footer/footer";
import { CartContextProvider } from "./context/cart/cartProvider";
import { apolloClient } from "../servises/client";
import { StoreContextProvider } from "./context/store/storeProvider";
import { UserContextProvider } from "./context/user/userProvider";
import { CheckoutContextProvider } from "./context/checkout/checkoutProvider";

const { width } = Dimensions.get("window");
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const translateX = useRef(new Animated.Value(-width)).current;

    const [loaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        "LibreFranklin-Bold": require("../assets/fonts/LibreFranklin-Bold.ttf"),
        "LibreFranklin-Light": require("../assets/fonts/LibreFranklin-Light.ttf"),
        "LibreFranklin-Medium": require("../assets/fonts/LibreFranklin-Medium.ttf"),
        "LibreFranklin-Regular": require("../assets/fonts/LibreFranklin-Regular.ttf"),
        "LibreFranklin-Thin": require("../assets/fonts/LibreFranklin-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (loaded) SplashScreen.hideAsync();
    }, [loaded, error]);

    const toggleSidebar = () => {
        Animated.timing(translateX, {
            toValue: isSidebarOpen ? -width : 0,
            duration: 200,
            useNativeDriver: false,
        }).start(() => setSidebarOpen(!isSidebarOpen));
    };

    const handlePress = (id) => {
        if (router.pathname !== "/category") {
            router.push({ pathname: "/category", params: { ids: id } });
        }
    };

    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <ApolloProvider client={apolloClient}>
            <UserContextProvider>
                <CheckoutContextProvider>
                    <StoreContextProvider>
                        <CartContextProvider>
                            <SafeAreaView style={{ flex: 1, flexGrow: 1, backgroundColor: "white" }}>
                                <Header onToggle={toggleSidebar} scrollY={scrollY} />
                                <SideBarMenu
                                    onToggle={toggleSidebar}
                                    isSidebarOpen={isSidebarOpen}
                                    onPress={handlePress}
                                    translateX={translateX}
                                />
                                <Main onPress={handlePress} scrollY={scrollY}>
                                    <Footer />
                                </Main>
                            </SafeAreaView>
                            <StatusBar barStyle="dark-content" />
                        </CartContextProvider>
                    </StoreContextProvider>
                </CheckoutContextProvider>
            </UserContextProvider>
        </ApolloProvider>
    );
};

export default RootLayout;
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
        "Heebo-Black": require("../assets/fonts/Heebo/Heebo-Black.ttf"),
        "Heebo-Bold": require("../assets/fonts/Heebo/Heebo-Bold.ttf"),
        "Heebo-ExtraBold": require("../assets/fonts/Heebo/Heebo-ExtraBold.ttf"),
        "Heebo-ExtraLight": require("../assets/fonts/Heebo/Heebo-ExtraLight.ttf"),
        "Heebo-Medium": require("../assets/fonts/Heebo/Heebo-Medium.ttf"),
        "Heebo-Regular": require("../assets/fonts/Heebo/Heebo-Regular.ttf"),
        "Heebo-SemiBold": require("../assets/fonts/Heebo/Heebo-SemiBold.ttf"),
        "Heebo-Thin": require("../assets/fonts/Heebo/Heebo-Thin.ttf"),
        "Helvetica-Bold": require("../assets/fonts/HelveticaNeue/HelveticaNeue-Bold.otf"),
        "Helvetica-Light": require("../assets/fonts/HelveticaNeue/HelveticaNeue-Light.otf"),
        "Helvetica-Medium": require("../assets/fonts/HelveticaNeue/HelveticaNeue-Medium.otf"),
        "Helvetica-Thin": require("../assets/fonts/HelveticaNeue/HelveticaNeue-Thin.otf"),
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
                                <Header onToggle={toggleSidebar} scrollY={scrollY} isSidebarOpen={isSidebarOpen} />
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
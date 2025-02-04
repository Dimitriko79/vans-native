import {Animated, Dimensions, SafeAreaView, StatusBar} from "react-native";
import Header from "./header";
import {ApolloProvider} from "@apollo/client";

import Main from "./main";
import SideBarMenu from "./components/sideBarMenu/sideBarMenu";
import React,{createContext, useEffect, useState} from "react";
import {useFonts} from "expo-font";
import {SplashScreen} from "expo-router";
import {apolloClient, updateApolloClient} from "../servises/client";

const { width } = Dimensions.get('window');
SplashScreen.preventAutoHideAsync();

const StoreContext = createContext();

const RootLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [storeCode, setStoreCode] = useState('en');
    const translateX = new Animated.Value(-width);

    const [loaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf")
    });

    useEffect(() => {
        if(error) throw error;
        if(loaded) SplashScreen.hideAsync();
    }, [loaded, error]);

    if(!loaded && !error) return null;

    const toggleSidebar = () => {
        if (isSidebarOpen) {
            Animated.timing(translateX, {
                toValue: -width,
                duration: 200,
                useNativeDriver: true,
            }).start(() => setSidebarOpen(false));
        } else {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => setSidebarOpen(true));
        }
    };

    const changeStore = (newStore) => {
        setStoreCode(newStore);
        updateApolloClient(newStore);
    };

    return (
        <StoreContext.Provider value={{ storeCode, changeStore }}>
            <ApolloProvider client={apolloClient}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                    <Header onToggle={toggleSidebar}/>
                    <SideBarMenu isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} translateX={translateX}/>
                    <Main/>
                </SafeAreaView>
                <StatusBar barStyle="dark-content"/>
            </ApolloProvider>
        </StoreContext.Provider>
    );
};

export default RootLayout;

import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { images } from "../../../constants";
import { router } from "expo-router";
import HorizontalSlider from "./horizontalSlider/horizontalSlider";
import React, { useCallback } from "react";
import useHeader from "./useHeader";
import MiniCart from "../minicart/miniCart";
import useUserContext from "../../context/user/userProvider";

const Header = ({ onToggle = () => {} }) => {
    const {
        cmsBlockData,
        itemCount,
        miniCartIsOpen,
        setMiniCartIsOpen
    } = useHeader();

    const {user, setView, isSignedIn} = useUserContext();

    const handleLogoPress = useCallback(() => {
        router.replace("/homepage");
    }, []);

    const handleView = () => {
        setView("ACCOUNT");
        router.navigate({ pathname: "/account" });
    }


    return (
        <View style={[styles.container, isSignedIn ? {height: 130} : {height: 100}]}>
            <View style={styles.banner}>
                {cmsBlockData && cmsBlockData.length > 0 && (
                    <HorizontalSlider data={cmsBlockData[0]} />
                )}
            </View>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button} onPress={onToggle}>
                        <Image source={images.menu} style={styles.image} resizeMode="contain" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => {}}>
                        <Image source={images.search} style={styles.image} resizeMode="contain" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => setMiniCartIsOpen(!miniCartIsOpen)}>
                        <Image source={images.cart} style={styles.image} resizeMode="contain" />
                        {itemCount > 0 && <Text style={styles.count}>{itemCount}</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
                        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
                    </TouchableOpacity>

                    <MiniCart isOpen={miniCartIsOpen} setIsOpen={setMiniCartIsOpen} />
                </View>
            {isSignedIn && (
                <TouchableOpacity activeOpacity={1} style={styles.header_user_info} onPress={handleView}>
                    <View style={styles.header_user_info_inner}>
                        <Text style={styles.header_user_info_text}>היי </Text>
                        <Text style={styles.header_user_info_text}>,{user?.firstname}</Text>
                        <Text style={styles.header_user_info_text}>יש לרשותך 0 נקודות</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        zIndex: 1,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Для Android
    },
    banner: {
        backgroundColor: "#000",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    header_wrapper: {
        height: 80
    },
    header_user_info: {
      height: 30,
        backgroundColor: "#1c1c1c",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    header_user_info_inner: {
        flexDirection: "row",
        direction: "rtl",
        gap: 5
    },
    header_user_info_text: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 400
    },
    header: {
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    count: {
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: "red",
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
        position: "absolute",
        top: 6,
        right: 6,
        textAlign: "center",
        lineHeight: 18,
    },
    image: {
        height: 30,
        width: 30,
    },
    logoContainer: {
        flex: 1,
        height: 50,
        alignItems: "flex-end",
        padding: 14,
    },
    logo: {
        height: 26,
        width: 77,
    },
});

export default Header;

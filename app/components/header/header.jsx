import { View, StyleSheet, Image, TouchableOpacity, Text, Animated } from "react-native";
import { images } from "../../../constants";
import { router } from "expo-router";
import HorizontalSlider from "./horizontalSlider/horizontalSlider";
import React, {useCallback} from "react";
import useHeader from "./useHeader";
import MiniCart from "../minicart/miniCart";
import useUserContext from "../../context/user/userProvider";
import BurgerMenu from "../burgerMenu/burgerMenu";
import Svg, {Circle, Path} from "react-native-svg";

const Header = ({ onToggle = () => {}, scrollY, isSidebarOpen = false }) => {
    const {
        cmsBlockData,
        itemCount,
        wishlistItemCount,
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

    const bannerHeight = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [50, 0],
        extrapolate: "clamp"
    });


    return (
        <View style={styles.container}>
            <Animated.View style={[styles.banner, { height: bannerHeight }]}>
                {cmsBlockData && cmsBlockData.length > 0 && (
                    <HorizontalSlider data={cmsBlockData[0]}/>
                )}
            </Animated.View>
            <View style={styles.header}>
                <BurgerMenu onPress={onToggle} isOpen={isSidebarOpen} />

                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Image source={images.favorites} style={styles.image} resizeMode="contain" />
                    {wishlistItemCount > 0 && <Text style={styles.count}>{wishlistItemCount}</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => setMiniCartIsOpen(!miniCartIsOpen)}>
                    <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 26.947 23.818">
                        <Path
                            d="M8.682,15.789H23a.79.79,0,0,0,.759-.573L26.916,4.164a.789.789,0,0,0-.759-1.006H6.861L6.3.618A.79.79,0,0,0,5.526,0H.789a.789.789,0,0,0,0,1.579h4.1l2.85,12.827a2.368,2.368,0,0,0,.941,4.541H23a.789.789,0,1,0,0-1.579H8.684a.789.789,0,0,1,0-1.579ZM25.111,4.737,22.4,14.21H9.317L7.212,4.737Zm0,0"
                            fill="#000303"></Path>
                        <Circle cx="2.112" cy="2.112" r="2.112" transform="translate(8.45 19.594)"
                                fill="#000303"></Circle>
                        <Circle cx="2.112" cy="2.112" r="2.112" transform="translate(17.954 19.594)"
                                fill="#000303"></Circle>
                    </Svg>
                    {itemCount > 0 && <Text style={styles.count}>{itemCount}</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
                    <Image source={images.logo} style={styles.logo} resizeMode="contain"/>
                </TouchableOpacity>

                <MiniCart isOpen={miniCartIsOpen} setIsOpen={setMiniCartIsOpen}/>
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
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    header_wrapper: {
        height: 80,
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
        fontWeight: 400,
        fontFamily: "Heebo",
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

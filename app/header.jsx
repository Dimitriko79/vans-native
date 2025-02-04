import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {images} from '../constants';
import {router} from "expo-router";
import HorizontalSlider from "./components/horizontalSlider";
import React from "react";
const Header = ({onToggle}) => {

    const handleMenuPress = () => {
        console.log("Burger menu pressed");
    };

    const handleSearchPress = () => {
        console.log("Search pressed");
    };

    const handleCartPress = () => {
        router.replace("/cart");
    };

    const handleLogoPress = () => {
        router.replace("/homepage");
    };

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <HorizontalSlider/>
            </View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={onToggle}>
                    <Image
                        source={images.menu}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCartPress}>
                    <Image
                        source={images.search}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCartPress}>
                    <Image
                        source={images.cart}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
                    <Image
                        source={images.logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        flexDirection: 'column',
        zIndex: 1
    },
    banner: {
        backgroundColor: '#000000',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    header: {
        height: 50,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderTopWidth: 0,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",

    },
    image: {
        height: 30,
        width: 30,
    },
    logoContainer: {
        flex: 1,
        height: 50,
        alignItems: "flex-end",
        borderTopWidth: 0,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        padding: 14,
    },
    logo: {
        height: 26,
        width: 77,
    }
})
export default Header;
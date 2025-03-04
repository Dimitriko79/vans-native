import {View, StyleSheet, Image, TouchableOpacity, Text} from "react-native";
import {images} from '../../../constants';
import {router} from "expo-router";
import HorizontalSlider from "./horizontalSlider/horizontalSlider";
import React from "react";
import useHeader from "./useHeader";
import MiniCart from "../minicart/miniCart";

const Header = ({onToggle}) => {

    const {
        cmsBlockData,
        loading,
        error,
        itemCount,
        miniCartIsOpen,
        setMiniCartIsOpen
    } = useHeader();
    //
    // const handleCartPress = () => {
    //     router.replace("/cart");
    // };

    const handleLogoPress = () => {
        router.replace("/homepage");
    };

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                {cmsBlockData && cmsBlockData.length && (
                    <HorizontalSlider data={cmsBlockData[0]}/>
                )}
            </View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={onToggle}>
                    <Image
                        source={images.menu}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Image
                        source={images.search}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => setMiniCartIsOpen(!miniCartIsOpen)}>
                    <Image
                        source={images.cart}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    {itemCount > 0 && (
                        <Text style={styles.count}>{itemCount}</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
                    <Image
                        source={images.logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <MiniCart isOpen={miniCartIsOpen} setIsOpen={setMiniCartIsOpen}/>
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
        alignItems: 'center',
        position: "relative"
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
        position: "relative"

    },
    count: {
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        position: 'absolute',
        top: 4,
        right: 4,
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
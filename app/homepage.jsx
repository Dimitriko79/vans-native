import React from "react";
import {View, StyleSheet, Image, Dimensions, Alert, Linking, Text} from "react-native";
import { Link } from "expo-router";
import { images } from "../constants";
import ShopNowBanner from "./components/shopNowBanner";
import News from "./components/news";
import {shopbyData, shopNowData} from "../mockdata/mockdata";
import ShopBy from "./components/shopBy";

const { width: screenWidth  } = Dimensions.get("window");

const Homepage = () => {

    const openLink = async (url) => {
        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Failed to open URL: ${url}`);
            }
        } catch (error) {
            Alert.alert("Error while trying to open URL", error.message);
        }
    };

    const shopNowItems = shopNowData.map(({image, title, description, text, link}, index) => {
        return (
            <ShopNowBanner
                image={image}
                title={title}
                description={description}
                handlePress={() => openLink(link)}
                text={text}
                index={index}
            />
        )
    })

    const shopByItems = shopbyData.map((item, index) => {
        return (
            <ShopBy
                item={item}
                index={index}
            />
        )
    })
    return (
        <View contentContainerStyle={styles.container}>
            <View style={styles.hero}>
                <Link href="https://www.vans.co.il/alwayspushing.html" target="_blank">
                    <Image
                        style={styles.hero_image}
                        source={images.heroVans}
                        resizeMode="contain"
                    />
                </Link>
            </View>
            {shopNowItems}
            <News/>
            <View style={styles.shopby}>
                <Text style={styles.shopby_title}>SHOP BY</Text>
                {shopByItems}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    hero: {
        marginTop: 20,
        alignItems: "center",
    },
    hero_image: {
        width: screenWidth,
        height: screenWidth * 1.5,
        aspectRatio: 16 / 9
    },
    shopby: {
      flex: 1,
        alignItems: "center",
        marginTop: 50,
        flexDirection: "column",
        gap: 30
    },
    shopby_title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30
    },
});

export default Homepage;
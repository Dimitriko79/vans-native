import {Link} from "expo-router";
import {Image, View, StyleSheet, Dimensions, Text} from "react-native";
import React from "react";
import formatImageUrl from "../../helpers/formatImageUrl";

const { width: screenWidth  } = Dimensions.get("window");

const Hero = ({data}) => {

    if (!data) return null;

    const {link, image} = data;

    return (
        <View style={styles.hero}>
            <Image
                style={styles.hero_image}
                source={{uri: formatImageUrl(image)}}
                resizeMode="cover"
            />
            <Link href={link} style={styles.hero_link}>
                <Text style={styles.hero_link_text}>Shop now</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    hero: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
        position: "relative"
    },
    hero_image: {
        width: screenWidth,
        height: screenWidth * 1.5,
        aspectRatio: 16 / 9,
        alignSelf: "center"
    },
    hero_link: {
        position: "absolute",
        bottom: 100,
        backgroundColor: "#b82f36",
        width: 172,
        paddingTop: 15,
        paddingBottom: 15,
    },
    hero_link_text: {
        color: "#ffffff",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "bold"
    }
})

export default Hero;
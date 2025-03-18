import { Link } from "expo-router";
import { Image, View, StyleSheet, Dimensions, Text } from "react-native";
import React, { useMemo, useState } from "react";
import formatImageUrl from "../../helpers/formatImageUrl";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Hero = ({ data }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!data?.image || !data?.link) return null;

    const imageUri = useMemo(() => formatImageUrl(data.image), [data.image]);

    return (
        <View style={styles.hero}>
            <Image
                style={[styles.hero_image, !imageLoaded && { opacity: 0 }]}
                source={{ uri: imageUri }}
                resizeMode="cover"
                onLoad={() => setImageLoaded(true)}
            />

            <Link href={data.link} style={styles.hero_link}>
                <Text style={styles.hero_link_text}>Shop now</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    hero: {
        flex: 1,
        marginTop: 20,
        alignItems: "center",
        position: "relative",
    },
    hero_image: {
        width: screenWidth,
        height: screenHeight * 0.6,
        alignSelf: "center",
    },
    hero_link: {
        position: "absolute",
        bottom: 40,
        backgroundColor: "#b82f36",
        width: 172,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 0,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    hero_link_text: {
        color: "#ffffff",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: '700',
        fontFamily : 'Helvetica Neue'
    },
    loader: {
        position: "absolute",
        width: screenWidth,
        height: screenHeight * 0.6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});

export default Hero;
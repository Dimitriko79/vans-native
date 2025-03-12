import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, Linking } from "react-native";
import formatImageUrl from "../../helpers/formatImageUrl";
import React, { useMemo, useCallback } from "react";

const { width } = Dimensions.get("window");

const ShopBy = ({ data = [], handlePress = () => {} }) => {
    if (!data.length) return null;

    const handleLinkPress = useCallback((url) => {
        if (url) Linking.openURL(url);
    }, []);

    const items = useMemo(() =>
            data.map((item, index) => {
                const { image, url, title, sub_links } = item;

                return (
                    <View key={index} style={styles.shopby_item}>
                        <ImageBackground style={styles.shopby_img} source={{ uri: formatImageUrl(image) }}>
                            <View style={styles.shopby_overlay} />
                        </ImageBackground>
                        <View style={styles.shopby_content}>
                            <TouchableOpacity onPress={() => handleLinkPress(url)} activeOpacity={0.7}>
                                <Text style={styles.shopby_name}>{title}</Text>
                            </TouchableOpacity>
                            <View style={styles.shopby_links}>
                                {sub_links.map(({ title, url }, ind) => (
                                    <TouchableOpacity key={`${ind}-${title}`} onPress={() => handleLinkPress(url)} activeOpacity={0.7}>
                                        <Text style={styles.shopby_link_name}>{title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                );
            }),
        [data, handleLinkPress]);

    return (
        <View style={styles.shopby}>
            <Text style={styles.shopby_title}>SHOP BY</Text>
            {items}
        </View>
    );
};

const styles = StyleSheet.create({
    shopby: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
        flexDirection: "column",
        gap: 40,
    },
    shopby_title: {
        fontSize: 30,
        fontWeight: "bold",
        letterSpacing: -1.5,
    },
    shopby_item: {
        width: width,
        position: "relative",
    },
    shopby_img: {
        width: "100%",
        height: 250,
    },
    shopby_overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(31,19,19,0.55)",
    },
    shopby_content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    shopby_name: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        textAlign: "center",
        textTransform: "uppercase",
        marginBottom: 5,
    },
    shopby_links: {
        flexDirection: "column",
        gap: 5,
    },
    shopby_link_name: {
        fontSize: 15,
        fontWeight: "800",
        color: "#ffffff",
        textAlign: "center",
        textTransform: "uppercase",
    },
});

export default ShopBy;

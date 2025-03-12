import { Dimensions, Image, Text, View, StyleSheet, Linking } from "react-native";
import CustomButton from "../customButton";
import React, { useMemo, useCallback } from "react";
import formatImageUrl from "../../helpers/formatImageUrl";

const { width } = Dimensions.get("window");

const ShopNowBanner = ({ data = [] }) => {
    if (!data.length) return null;

    const items = useMemo(() =>
            data.map((item, index) => {
                if (!item?.link || !item?.image) return null;

                const cleanText = item.description?.replace(/<br\s*\/?>/gi, "") || "";
                const handlePress = () => Linking.openURL(item.link);

                return (
                    <View style={styles.shopnow} key={`${index}_${item.link}`}>
                        <Image
                            style={styles.shopnow_image}
                            source={{ uri: formatImageUrl(item.image) }}
                            resizeMode="contain"
                        />
                        <Text style={styles.shopnow_title}>{item.title}</Text>
                        {cleanText && (
                            <Text style={styles.shopnow_description}>
                                {cleanText}
                            </Text>
                        )}
                        <CustomButton
                            title={item.text}
                            isLoading={false}
                            containerStyles={styles.shopNow_button}
                            textStyles={styles.shopNow_button_text}
                            handlePress={handlePress}
                        />
                    </View>
                );
            }).filter(Boolean), // Убираем `null`
        [data]);

    return <View style={styles.container}>{items}</View>;
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    shopnow: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        marginTop: 30,
    },
    shopnow_image: {
        width: width - 20,
        height: width,
    },
    shopnow_title: {
        fontSize: 36,
        fontWeight: "bold",
        letterSpacing: -1.5,
        textAlign: "center",
    },
    shopnow_description: {
        textAlign: "center",
        fontSize: 14,
        marginTop: 12,
        paddingHorizontal: 10,
    },
    shopNow_button: {
        width: 140,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        marginTop: 25,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    shopNow_button_text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase",
    }
});

export default ShopNowBanner;

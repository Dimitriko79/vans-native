import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, Pressable, Alert} from "react-native";
import React, { useMemo } from "react";
import useItem from "./useItem";
import Price from "../price/price";
import {images} from "../../../constants";

const { width } = Dimensions.get("window");

const GalleryItem = ({ item = {}, onClick = () => {} }) => {
    const { price, handlePress } = useItem(item);

    const handleLinkPress = () => {
        handlePress(item?.url_key);
    };

    const priceComponent = useMemo(
        () => <Price value={price?.value} currencyCode={price?.currency} />,
        [price]
    );

    return (
        <View style={styles.item}>
            <TouchableOpacity style={styles.item_link} onPress={handleLinkPress}>
                <View style={styles.item_image_wrapper}>
                    <Image
                        style={styles.item_image}
                        source={{ uri: item?.image?.url || "" }}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.item_favorites} onPress={() => Alert.alert('click wishlist')}>
                        <Image source={images.favorites} resizeMode="contain" style={styles.item_favorites_image}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.item_text_wrapper}>
                    {item?.gamechanger && <Text style={styles.item_gamechanger}>{item.gamechanger}</Text>}
                    <Text style={styles.item_text}>{item?.name}</Text>
                </View>
                <View style={styles.item_price_wrapper}>
                    <Text style={styles.item_price}>{priceComponent}</Text>
                </View>
                <Pressable onPress={handleLinkPress} style={styles.item_link_bottom}>
                    <Text style={styles.link_bottom}>לעמוד מוצר</Text>
                </Pressable>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 5,
        marginBottom: 8,
        width: width / 2 - 14,
    },
    item_link: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: width / 2 - 14,
    },
    item_image_wrapper: {
        height: width / 2,
        width: "100%",
        backgroundColor: "#ffffff",
        position: "relative",
    },
    item_image: {
        height: width / 2,
        width: "100%",

    },
    item_favorites: {
        position: "absolute",
        bottom: 16,
        left: 10
    },
    item_favorites_image: {
        width: 22,
        height: 22,
        resizeMode: "contain",
    },
    item_text_wrapper: {
        width: "100%",
    },
    item_gamechanger: {
        color: "#cb1b2c",
        fontSize: 15,
        fontFamily: 'Helvetica Neue',
        fontWeight: "700",
        textAlign: "right",
        marginTop: 5,
        marginBottom: 5,
    },
    item_text: {
        color: "#000",
        fontSize: 15,
        fontFamily: 'Helvetica Neue',
        fontWeight: "400",
        textAlign: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    item_price_wrapper: {
        width: "100%",
    },
    item_price: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: 'Helvetica Neue',
        fontWeight: "400",
    },
    item_link_bottom: {
        width: "100%",
        marginTop: 10
    },
    link_bottom: {
        fontSize: 15,
        fontWeight: "500",
        color: "#006bb4",
        textAlign: "center",
    },
});

export default GalleryItem;

import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, Pressable, Alert} from "react-native";
import React, { useMemo } from "react";
import useItem from "./useItem";
import Price from "../price/price";
import Svg, {G, Path} from "react-native-svg";

const { width } = Dimensions.get("window");

const GalleryItem = ({ item = {}, onClick = () => {}, handleWishlist = () => {} }) => {
    const { price, handlePress } = useItem(item);
    const {product} = item;

    const handleLinkPress = () => {
        handlePress(product?.url_key);
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
                        source={{ uri: product?.image?.url || "" }}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.item_trash} onPress={() => handleWishlist(item.id)}>
                        <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 13.207 14.563">
                            <G transform="translate(-4 -2.5)">
                                <Path
                                    d="M4.5,9H16.707"
                                    transform="translate(0 -3.287)"
                                    fill="none"
                                    stroke='#000000'
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                />
                                <Path
                                    d="M16.994,5.713v9.494a1.356,1.356,0,0,1-1.356,1.356H8.856A1.356,1.356,0,0,1,7.5,15.207V5.713m2.035,0V4.356A1.356,1.356,0,0,1,10.891,3H13.6A1.356,1.356,0,0,1,14.96,4.356V5.713"
                                    transform="translate(-1.644 0)"
                                    fill="none"
                                    stroke='#000000'
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                />
                            </G>
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.item_text_wrapper}>
                    {product?.gamechanger && <Text style={styles.item_gamechanger}>{product.gamechanger}</Text>}
                    <Text style={styles.item_text}>{product?.name}</Text>
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
    item_trash: {
        position: "absolute",
        top: 16,
        left: 10
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

import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity, Pressable} from "react-native";
import React, {useMemo, useState} from "react";
import useItem from "./useItem";
import Price from "../price/price";
import {images} from "../../../constants";

const { width } = Dimensions.get("window");

const GalleryItem = ({ item = {}, onHandleWishlistItem = () => {} }) => {
    const {
        price,
        isSignedIn,
        handlePress,
        isAddedToWishlist
    } = useItem(item);
    const [imageLoaded, setImageLoaded] = useState(false);

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
                        style={[styles.item_image,  !imageLoaded && { opacity: 0 }]}
                        source={{ uri: item?.image?.url || "" }}
                        resizeMode="contain"
                        onLoad={() => setImageLoaded(true)}
                    />
                    {isSignedIn && (
                        <TouchableOpacity style={styles.item_favorites} disabled={isAddedToWishlist} onPress={() => onHandleWishlistItem(item)}>
                            <Image source={isAddedToWishlist ? images.heartBlack : images.favorites} resizeMode="contain" style={styles.item_favorites_image}/>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.item_text_wrapper}>
                    {item?.gamechanger && <Text style={styles.item_gamechanger}>{item.gamechanger}</Text>}
                    <Text style={styles.item_text}>{item?.name}</Text>
                </View>
                <View style={styles.item_price_wrapper}>
                    <Text style={styles.item_price}>{priceComponent}</Text>
                </View>
                <Pressable onPress={handleLinkPress} style={styles.item_link_bottom}>
                    <Text style={styles.link_bottom}>צבעים נוספים</Text>
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
        fontSize: 13,
        fontWeight: "700",
        textAlign: "right",
        marginTop: 5,
        marginBottom: 5,
    },
    item_text: {
        color: "#000",
        fontSize: 13,
        fontWeight: "400",
        textAlign: "right",
        marginTop: 5,
        marginBottom: 5,
    },
    item_price_wrapper: {
        width: "100%",
    },
    item_price: {
        textAlign: "right",
        fontSize: 13,
        fontWeight: "bold",
    },
    item_link_bottom: {
        width: "100%",
        marginTop: 10
    },
    link_bottom: {
        fontSize: 12,
        fontWeight: "normal",
        color: "#006bb4",
        textAlign: "right",
    },
});

export default GalleryItem;

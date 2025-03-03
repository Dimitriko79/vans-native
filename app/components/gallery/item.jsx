import {Dimensions, Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import useItem from "./useItem";
import Price from "../price/price";

const { width } = Dimensions.get("window");

const GalleryItem = ({ item, onClick }) => {
const {price, handlePress} = useItem(item);

const handleLinkPress = () => {
    handlePress(item.url_key);
  };

    return (
        <View style={styles.item}>
            <TouchableOpacity style={styles.item_link} onPress={handleLinkPress} >
                <Image style={styles.item_image} source={{uri: item.image.url}} resizeMode="cover" />
                <View style={styles.item_text_wrapper}>
                    <Text style={styles.item_gamechanger}>{item.gamechanger}</Text>
                    <Text style={styles.item_text}>{item.name}</Text>
                </View>
                <View style={styles.item_price_wrapper}>
                    <Text style={styles.item_price}>
                        <Price value={price.value} currencyCode={price.currency} style={styles} />
                    </Text>
                </View>
                <View handlePress={handlePress} style={styles.item_link_bottom}>
                    <Text style={styles.link_bottom}>צבעים נוספים</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

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
    item_image: {
        height: width / 2,
        width: "100%",
        backgroundColor: "#ffffff",
    },
    item_text_wrapper: {
        width: "100%",
    },
    item_gamechanger: {
        color: '#cb1b2c',
        fontSize: 13,
        fontWeight: 700,
        textAlign: "right",
        marginTop: 5,
        marginBottom: 5,
    },
    item_text: {
        color: "#000",
        fontSize: 13,
        fontWeight: 400,
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
    price: {

    },
    currency: {

    },
    value: {

    },
    item_link_bottom: {
        width: "100%",
    },
    link_bottom: {
        marginTop: 20,
        fontSize: 12,
        fontWeight: "light",
        color: "#006bb4",
        textAlign: "right",
        cursor: "pointer",
    },
});

export default GalleryItem
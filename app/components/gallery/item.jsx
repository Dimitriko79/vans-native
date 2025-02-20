import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {Link} from "expo-router";
import React from "react";
import {useItem} from "./useItem";
import Price from "../price/price";

const { width } = Dimensions.get("window");

const GalleryItem = ({ item, onClick }) => {
    const {price} = useItem(item);
    function getUrl(url) {
        return url.replace("vans-react.fisha.co.il", "vans.co.il");
    }

    return (
        <View style={styles.item}>
            <Link href={item.image} style={styles.item_link} target="_blank">
                <Image style={styles.item_image} source={{uri: getUrl(item.image.url)}} resizeMode="cover" />
                <View style={styles.item_text_wrapper}>
                    <Text style={styles.item_gamechanger}>{item.gamechanger}</Text>
                    <Text style={styles.item_text}>{item.name}</Text>
                </View>
                <View style={styles.item_price_wrapper}>
                    <Text style={styles.item_price}>
                        <Price value={price.value} currencyCode={price.currency} style={styles} />
                    </Text>
                </View>
                <View style={styles.item_link_bottom}>
                    <Text style={styles.link_bottom}>קראו עוד</Text>
                </View>

            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        margin: 5,
        marginBottom: 8,
        width: width / 2,
    },
    item_link: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    item_image: {
        height: width / 2,
        width: width / 2,
    },
    item_text_wrapper: {
        width: width / 2,
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
        width: width / 2
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
        width: width / 2
    },
    link_bottom: {
        marginTop: 20,
        fontSize: 12,
        fontWeight: "light",
        color: "#006bb4",
        textDecorationLine: "underline",
        textAlign: "right",
        cursor: "pointer",
    },
});

export default GalleryItem
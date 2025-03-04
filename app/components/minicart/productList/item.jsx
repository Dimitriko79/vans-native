import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import formatImageUrl from "../../../helpers/formatImageUrl";
import Price from "../../price/price";
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";
import useItem from "./useItem";

const Item = ({item, onPress}) => {

    const { product, configurable_options, prices, quantity } = item;

    const {
        handleRemoveItem,
        loading
    } = useItem();

    return (
        <View style={[styles.item, {opacity: loading ? 0.5 : 1}]}>
            <TouchableOpacity onPress={() => onPress(product.url_key)} style={styles.item_link}>
                <Image style={styles.item_image} resizeMode="cover" source={{ uri: formatImageUrl(product.image.url) }} />
            </TouchableOpacity>
            <View style={styles.item_content}>
                <Text style={styles.item_content_name}>{product.name}</Text>
                <View style={styles.item_content_size}>
                    <Text style={styles.item_content_size_label}>{`${configurable_options[0].option_label}:`}</Text>
                    <Text style={styles.item_content_size_value}>{`${configurable_options[0].value_label} `}</Text>
                </View>
                <Text style={styles.item_content_price}>
                    <Price value={prices.price.value} currencyCode={prices.price.currency} style={styles} />
                </Text>
                <View style={styles.item_content_quantity}>
                    <Text style={styles.item_content_quantity_label}>כמות:</Text>
                    <Text style={styles.item_content_quantity_value}>{quantity} </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                    <Icon name="close" size={16} color="#000"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        direction: "rtl",
        gap: 20,
        height: 128,
        paddingVertical: 10,
        borderBottomColor: 'rgb(220, 221, 218)',
        borderBottomWidth: 1,
    },
    item_link: {
        width: 108,
        height: 108,
    },
    item_image: {
        width: 108,
        height: 108,
    },
    item_content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        direction: "rtl",
        alignItems: "flex-start",
        gap: 3
    },
    item_content_name: {
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: 19,
        color: '#2b2b2b',
        fontSize: 13
    },
    item_content_size: {
        flexDirection: 'row',
        direction: "rtl",
    },
    item_content_size_label: {
        fontSize: 13
    },
    item_content_size_value: {
        fontSize: 13
    },
    item_content_price: {
        textAlign: "left",
    },
    currency: {
        fontSize: 13
    },
    value: {
        fontSize: 13
    },
    item_content_quantity: {
        flexDirection: 'row',
        direction: "rtl",
    },
    item_content_quantity_label: {
        fontSize: 13
    },
    item_content_quantity_value: {
        fontSize: 13
    },
})

export default Item;
import {Image, Text, TouchableOpacity, View, StyleSheet, Modal, Button, Dimensions, Pressable} from "react-native";
import formatImageUrl from "../../../helpers/formatImageUrl";
import Price from "../../price/price";
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";
import useItem from "./useItem";

const { height, width } = Dimensions.get("window");

const Item = ({item, onPress}) => {

    const { product, configurable_options, prices, quantity } = item;

    const {
        setItemForRemoving,
        isOpenModal, setIsOpenModal,
        confirmDeletionOfItem,
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
                <TouchableOpacity onPress={confirmDeletionOfItem}>
                    <Icon name="close" size={16} color="#000"/>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide" // Доступны: 'slide', 'fade', 'none'
                transparent={true}
                visible={isOpenModal}
                onRequestClose={() => setIsOpenModal(false)} // Для Android-кнопки "Назад"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modal_view}>
                        <TouchableOpacity style={styles.modal_view_close} onPress={() => setIsOpenModal(false)}>
                            <Icon name="close" size={20} color="#fff"/>
                        </TouchableOpacity>
                        <Text style={styles.modal_view_title}>האם להסיר פריט זה מעגלת הקניות?</Text>
                        <View style={styles.modal_view_actions}>
                            <Pressable style={styles.modal_view_action_primary} onPress={() => setItemForRemoving(item.id)} ><Text style={{color: "#fff", fontSize: 14, fontWeight: "600"}}>אישור</Text></Pressable>
                            <Pressable style={styles.modal_view_action_secondary} onPress={() => setIsOpenModal(false)}><Text style={{color: "#fff", fontSize: 14, fontWeight: "600"}}>ביטול</Text></Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        top: 0,
        width: width,
    },
    modal_view: {
        marginTop: 120,
        width: 300,
        backgroundColor: "#fff",
        paddingTop: 40,
        padding: 20,
        position: "relative",
    },
    modal_view_close: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        left: 20,
        top: 20,
        width: 30,
        height: 30,
        backgroundColor: "#d41921",
    },
    modal_view_title: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 400,
        textAlign: 'center'
    },
    modal_view_actions: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        gap: 10,
        height: 30,
        marginTop: 55
    },
    modal_view_action_primary: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        backgroundColor: "#d41921",
    },
    modal_view_action_secondary: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        backgroundColor: "#000",
    },
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
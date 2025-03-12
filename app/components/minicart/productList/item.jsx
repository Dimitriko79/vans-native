import { Image, Text, TouchableOpacity, View, StyleSheet, Modal, Pressable } from "react-native";
import formatImageUrl from "../../../helpers/formatImageUrl";
import Price from "../../price/price";
import Icon from "react-native-vector-icons/AntDesign";
import React, { useMemo, useCallback } from "react";
import useItem from "./useItem";

const Item = ({ item = {}, onPress = () => {}, isCheckout = false }) => {
    const {
        product = {},
        configurable_options = [],
        prices = {},
        quantity = 1
    } = item;

    const image = useMemo(() => product.thumbnail || product.image, [product]);

    const {
        setItemForRemoving,
        isOpenModal, setIsOpenModal,
        confirmDeletionOfItem,
        loading
    } = useItem();

    const closeModal = useCallback(() => setIsOpenModal(false), [setIsOpenModal]);

    return (
        <View style={[styles.item, { opacity: loading ? 0.5 : 1 }]}>
            <TouchableOpacity onPress={() => onPress(product.url_key)} style={styles.item_link}>
                {image?.url ? (
                    <Image style={styles.item_image} resizeMode="cover" source={{ uri: formatImageUrl(image.url) }} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>אין תמונה</Text>
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.item_content}>
                <Text style={styles.item_content_name}>{product.name || "מוצר ללא שם"}</Text>

                {configurable_options.length > 0 && (
                    <View style={styles.item_content_size}>
                        <Text style={styles.item_content_size_label}>
                            {`${configurable_options[0]?.option_label || "גודל"}:`}
                        </Text>
                        <Text style={styles.item_content_size_value}>
                            {`${configurable_options[0]?.value_label || "לא זמין"}`}
                        </Text>
                    </View>
                )}

                <Text style={styles.item_content_price}>
                    <Price value={prices?.price?.value || 0} currencyCode={prices?.price?.currency || "ILS"} />
                </Text>

                <View style={styles.item_content_quantity}>
                    <Text style={styles.item_content_quantity_label}>כמות:</Text>
                    <Text style={styles.item_content_quantity_value}>{quantity}</Text>
                </View>
            </View>

            {!isCheckout && (
                <TouchableOpacity style={styles.item_content_remove} onPress={confirmDeletionOfItem}>
                    <Icon name="close" size={16} color="#000" />
                </TouchableOpacity>
            )}

            <Modal animationType="fade" transparent={true} visible={isOpenModal} onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modal_view}>
                        <TouchableOpacity style={styles.modal_view_close} onPress={closeModal}>
                            <Icon name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.modal_view_title}>האם להסיר פריט זה מעגלת הקניות?</Text>
                        <View style={styles.modal_view_actions}>
                            <Pressable style={styles.modal_view_action_primary} onPress={() => setItemForRemoving(item.id)}>
                                <Text style={styles.modal_action_text}>אישור</Text>
                            </Pressable>
                            <Pressable style={styles.modal_view_action_secondary} onPress={closeModal}>
                                <Text style={styles.modal_action_text}>ביטול</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal_view: {
        width: 300,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modal_view_close: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    modal_view_title: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        marginBottom: 20,
    },
    modal_view_actions: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        gap: 10,
        marginTop: 20,
    },
    modal_view_action_primary: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#d41921",
        borderRadius: 5,
    },
    modal_view_action_secondary: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#64686b",
        borderRadius: 5,
    },
    modal_action_text: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    item: {
        flexDirection: "row",
        direction: "rtl",
        gap: 20,
        alignItems: "flex-start",
        paddingVertical: 10,
        borderBottomColor: "#DCDDD6",
        borderBottomWidth: 1,
    },
    item_link: {
        width: 108,
        height: 108,
        backgroundColor: "#ffffff",
    },
    item_image: {
        width: "100%",
        height: "100%",
    },
    imagePlaceholder: {
        width: 108,
        height: 108,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
    },
    imagePlaceholderText: {
        color: "#A0A0A0",
        fontSize: 12,
    },
    item_content: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },
    item_content_name: {
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#2b2b2b",
        fontSize: 13,
        textAlign: "left",
    },
    item_content_size: {
        flexDirection: "row",
    },
    item_content_size_label: {
        fontSize: 13,
    },
    item_content_size_value: {
        fontSize: 13,
    },
    item_content_price: {
        textAlign: "left",
        fontSize: 14,
    },
    item_content_quantity: {
        flexDirection: "row",
    },
    item_content_quantity_label: {
        fontSize: 13,
    },
    item_content_quantity_value: {
        fontSize: 13,
    },
});

export default Item;

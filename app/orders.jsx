import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useUserContext from "./context/user/userProvider";
import React, { useMemo, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

const { height } = Dimensions.get("window");

const Orders = () => {
    const { orders } = useUserContext();
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const maxVisiblePages = 6;

    const sortedOrders = useMemo(() => {
        return [...orders].sort((a, b) => b.order_number.localeCompare(a.order_number, undefined, { numeric: true }));
    }, [orders]);

    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

    const currentOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedOrders.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, sortedOrders]);

    const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    return (
        <View style={styles.container}>
            <View style={styles.orders}>
                <Text style={styles.orders_title}>היסטורית הזמנות שלי</Text>
            </View>

            <View style={styles.orders_content}>
                <FlatList
                    data={currentOrders}
                    keyExtractor={(item) => String(item.id)}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <View style={styles.order_item}>
                            <View style={styles.order_item_field}>
                                <Text style={styles.order_item_field_name}># הזמנה: </Text>
                                <Text style={styles.order_item_field_value}>{item.order_number}</Text>
                            </View>
                            <View style={styles.order_item_field}>
                                <Text style={styles.order_item_field_name}>תאריך: </Text>
                                <Text style={styles.order_item_field_value}>{new Date(item.created_at).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.order_item_field}>
                                <Text style={styles.order_item_field_name}>סה"כ להזמנה: </Text>
                                <Text style={styles.order_item_field_value}>₪ {item.grand_total}</Text>
                            </View>
                            <View style={styles.order_item_field}>
                                <Text style={styles.order_item_field_name}>סטטוס: </Text>
                                <Text style={styles.order_item_field_value}>{item.status}</Text>
                            </View>
                            <View style={styles.order_item_actions}>
                                <TouchableOpacity onPress={() => Alert.alert("Click!")}>
                                    <Text style={styles.order_item_action}>הצג הזמנה</Text>
                                </TouchableOpacity>
                                <Text>|</Text>
                                <TouchableOpacity onPress={() => Alert.alert("Click!")}>
                                    <Text style={styles.order_item_action}>הזמן מחדש</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={styles.orders_item}
                    scrollEnabled={false}
                    nestedScrollEnabled={false}
                />
            </View>

            <View style={styles.pagination}>
                <TouchableOpacity
                    style={[styles.page_button, currentPage === totalPages && styles.disabled_button]}
                    onPress={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                >
                    <Icon name="right" size={20} color={currentPage === totalPages ? "#ccc" : "#000"} />
                </TouchableOpacity>

                <View style={styles.page_numbers}>
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                        <TouchableOpacity
                            key={page}
                            style={[styles.page_number, currentPage === page && styles.active_page]}
                            onPress={() => setCurrentPage(page)}
                        >
                            <Text style={[styles.page_number_text, currentPage === page && { color: "#000" }]}>{page}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.page_button, currentPage === 1 && styles.disabled_button]}
                    onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                >
                    <Icon name="left" size={20} color={currentPage === 1 ? "#ccc" : "#000"} />
                </TouchableOpacity>
            </View>

            <View style={styles.itemsPerPageContainer}>
                <Text style={styles.itemsPerPageText}>הצגה:</Text>
                <View style={styles.itemsPerPageOptions}>
                    {[5, 10, 20, 50].map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={[styles.itemsPerPageButton, itemsPerPage === num && styles.activeItemsPerPage]}
                            onPress={() => {
                                setItemsPerPage(num);
                                setCurrentPage(1);
                            }}
                        >
                            <Text style={styles.itemsPerPageButtonText}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: height,
        backgroundColor: "#f1f2ed",
    },
    orders: {
        padding: 25,
    },
    orders_title: {
        fontSize: 22,
        fontFamily: "Heebo",
        fontWeight: "900",
        textAlign: "right",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c6",
    },
    orders_content: {
        backgroundColor: "#fff",
        marginLeft: 25,
        marginRight: 25,
    },
    order_item: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 14
    },
    order_item_field: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        direction: "rtl",
        gap: 6
    },
    order_item_field_name: {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: "Heebo",
    },
    order_item_field_value: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: "Heebo",
    },
    order_item_actions: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 10
    },
    order_item_action: {
        color: '#589bc6',
        fontFamily: "Heebo",
        fontSize: 16,
        fontWeight: '600',
    },
    pagination: {
        direction: "rtl",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
        paddingHorizontal: 25,
        gap: 10,
    },
    page_button: {
        padding: 10,
    },
    disabled_button: {
        opacity: 0.5,
    },
    page_numbers: {
        flexDirection: "row",
        gap: 8
    },
    page_number: {
        height: 40,
        width: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: '50%',
        backgroundColor: "#eee",
    },
    active_page: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    page_number_text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#858585",
    },
    itemsPerPageContainer: {
        flexDirection: "row",
        direction: "rtl",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 40,
        gap: 16
    },
    itemsPerPageText: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
    },
    itemsPerPageOptions: {
        flexDirection: "row",
        gap: 10,
    },
    itemsPerPageButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    activeItemsPerPage: {
        backgroundColor: "#ddd",
        borderColor: "#000",
    },
    itemsPerPageButtonText: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default Orders;